import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Cases, CaseInstances } from '@uipath/uipath-typescript/cases';
import type { CaseGetAllResponse, CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { Input } from '@/components/ui/input';
import { ClaimStatusBadge } from './ClaimStatusBadge';
interface ClaimsListProps {
  onViewClaim: (instance: CaseInstanceGetResponse) => void;
}
type SortField = 'instanceId' | 'instanceDisplayName' | 'latestRunStatus' | 'startedTime';
type SortDirection = 'asc' | 'desc';
export function ClaimsList({ onViewClaim }: ClaimsListProps) {
  const { sdk, isAuthenticated } = useAuth();
  const cases = useMemo(() => (sdk ? new Cases(sdk) : null), [sdk]);
  const caseInstances = useMemo(() => (sdk ? new CaseInstances(sdk) : null), [sdk]);
  const [caseProcess, setCaseProcess] = useState<CaseGetAllResponse | null>(null);
  const [instances, setInstances] = useState<CaseInstanceGetResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('startedTime');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
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
          pageSize: 100,
        });
        setInstances(result.items || []);
      } catch (err) {
        console.error('ClaimsList load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load claims');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [isAuthenticated, cases, caseInstances]);
  const filteredAndSortedClaims = useMemo(() => {
    let result = [...instances];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.instanceId.toLowerCase().includes(query) ||
          c.instanceDisplayName?.toLowerCase().includes(query) ||
          c.caseTitle?.toLowerCase().includes(query)
      );
    }
    if (statusFilter !== 'all') {
      result = result.filter((c) => c.latestRunStatus === statusFilter);
    }
    result.sort((a, b) => {
      let aVal: string | number = a[sortField] || '';
      let bVal: string | number = b[sortField] || '';
      if (sortField === 'startedTime') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [instances, searchQuery, statusFilter, sortField, sortDirection]);
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return <span className="ml-1 text-blue-600">{sortDirection === 'asc' ? '↑' : '↓'}</span>;
  };
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-sm text-gray-600">Please log in to view claims</p>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-sm text-gray-600">Loading claims...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Claims</h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Active Claims</h2>
        <p className="text-sm text-gray-500 mt-1">
          View and manage {caseProcess?.name || 'all insurance claims'}
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by Claim ID or Title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Running">Running</option>
              <option value="Completed">Completed</option>
              <option value="Successful">Successful</option>
              <option value="Faulted">Faulted</option>
              <option value="Stopped">Stopped</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-500">
          Showing {filteredAndSortedClaims.length} of {instances.length} claims
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  onClick={() => handleSort('instanceId')}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Claim ID <SortIcon field="instanceId" />
                </th>
                <th
                  onClick={() => handleSort('instanceDisplayName')}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Title <SortIcon field="instanceDisplayName" />
                </th>
                <th
                  onClick={() => handleSort('latestRunStatus')}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Status <SortIcon field="latestRunStatus" />
                </th>
                <th
                  onClick={() => handleSort('startedTime')}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Started <SortIcon field="startedTime" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Folder
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedClaims.map((claim) => (
                <tr
                  key={claim.instanceId}
                  onClick={() => onViewClaim(claim)}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-blue-600 whitespace-nowrap">
                    {claim.instanceId.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {claim.caseTitle || claim.instanceDisplayName || 'Untitled'}
                  </td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    <ClaimStatusBadge status={claim.latestRunStatus} />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(claim.startedTime).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {claim.folderKey?.slice(0, 8) || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}