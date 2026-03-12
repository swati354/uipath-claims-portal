import { useMemo } from 'react';
import { TrendingDown, Clock, CheckCircle } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ClaimsChart } from './ClaimsChart';
import { StageDistributionChart } from './StageDistributionChart';
import { RecentActivityTable } from './RecentActivityTable';
import { Button } from '@/components/ui/button';
import { MOCK_CLAIMS } from './mockData';
interface DashboardProps {
  onViewAllClaims: () => void;
}
export function Dashboard({ onViewAllClaims }: DashboardProps) {
  const metrics = useMemo(() => {
    const total = MOCK_CLAIMS.length;
    const inProgress = MOCK_CLAIMS.filter(c => c.status === 'In Progress').length;
    const completed = MOCK_CLAIMS.filter(c => c.status === 'Approved' || c.status === 'Closed').length;
    const avgDays = 12;
    const slaCompliance = 87;
    return { total, inProgress, completed, avgDays, slaCompliance };
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Claims Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">Overview of HO-5 home insurance claims</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Total Active Claims"
          value={metrics.total.toString()}
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
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
        <RecentActivityTable />
      </div>
    </div>
  );
}