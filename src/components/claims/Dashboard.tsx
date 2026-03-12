import React, { useMemo, useEffect, useState } from 'react';
import { TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Cases, CaseInstances } from '@uipath/uipath-typescript/cases';
import type { CaseGetAllResponse, CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { MetricCard } from './MetricCard';
import { ClaimsChart } from './ClaimsChart';
import { StageDistributionChart } from './StageDistributionChart';
import { RecentActivityTable } from './RecentActivityTable';
import { Button } from '@/components/ui/button';
interface DashboardProps {
  onViewAllClaims: () => void;
}
export function Dashboard({ onViewAllClaims }: DashboardProps) {
  const { sdk, isAuthenticated } = useAuth();
  const cases = useMemo(() => (sdk ? new Cases(sdk) : null), [sdk]);
  const caseInstances = useMemo(() => (sdk ? new CaseInstances(sdk) : null), [sdk]);
  const [caseProcess, setCaseProcess] = useState<CaseGetAllResponse | null>(null);
  const [instances, setInstances] = useState<CaseInstanceGetResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!isAuthenticated || !cases || !caseInstances) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const allCases = await cases.getAll();
        const targetCase = allCases.find(
          (c) => c?.name && c.name.toLowerCase().includes('home ho-5')
        );
        if (!targetCase) {
          setError('Case process "Home HO-5 claims" not found');
          setIsLoading(false);
          return;
        }
        setCaseProcess(targetCase);
        const result = await caseInstances.getAll({
          processKey: targetCase.processKey,
          pageSize: 50,
        });
        setInstances(result.items || []);
      } catch (err) {
        console.error('Dashboard load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load cases');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [isAuthenticated, cases, caseInstances]);
  const metrics = useMemo(() => {
    const total = instances.length;
    const inProgress = instances.filter((c) => c.latestRunStatus === 'Running').length;
    const completed = instances.filter(
      (c) => c.latestRunStatus === 'Completed' || c.latestRunStatus === 'Successful'
    ).length;
    const avgDays = 12;
    const slaCompliance = 87;
    return { total, inProgress, completed, avgDays, slaCompliance };
  }, [instances]);
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-sm text-gray-600">Please log in to view the claims dashboard</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading claims data...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Data</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Claims Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of {caseProcess?.name || 'HO-5 home insurance claims'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Active Claims"
          value={metrics.total.toString()}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          trend="up"
          trendValue="+8%"
          trendLabel="from last month"
        />
        <MetricCard
          title="In Progress"
          value={metrics.inProgress.toString()}
          icon={<Clock className="w-5 h-5" />}
          trend="neutral"
          trendValue=""
          trendLabel=""
        />
        <MetricCard
          title="Avg. Processing Time"
          value={`${metrics.avgDays}d`}
          icon={<TrendingDown className="w-5 h-5" />}
          trend="down"
          trendValue="-2d"
          trendLabel="improvement"
        />
        <MetricCard
          title="SLA Compliance"
          value={`${metrics.slaCompliance}%`}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="up"
          trendValue="+3%"
          trendLabel="from last month"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ClaimsChart />
        <StageDistributionChart />
      </div>
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Recent Activity</h3>
            <p className="text-sm text-gray-500 mt-0.5">Latest claim updates</p>
          </div>
          <Button onClick={onViewAllClaims} variant="outline" size="sm">
            View All Claims
          </Button>
        </div>
        <RecentActivityTable instances={instances.slice(0, 5)} />
      </div>
    </div>
  );
}