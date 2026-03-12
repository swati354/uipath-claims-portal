import React, { useMemo, useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { CaseInstances } from '@uipath/uipath-typescript/cases';
import type { CaseInstanceExecutionHistoryResponse } from '@uipath/uipath-typescript/cases';
import { useAuth } from '@/hooks/useAuth';
interface CaseAuditTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseAuditTab({ claim }: CaseAuditTabProps) {
  const { sdk } = useAuth();
  const caseInstances = useMemo(() => (sdk ? new CaseInstances(sdk) : null), [sdk]);
  const [history, setHistory] = useState<CaseInstanceExecutionHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!caseInstances) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const historyData = await caseInstances.getExecutionHistory(claim.instanceId, claim.folderKey);
        setHistory(historyData);
      } catch (err) {
        console.error('Failed to load execution history:', err);
        setError(err instanceof Error ? err.message : 'Failed to load audit trail');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [caseInstances, claim.instanceId, claim.folderKey]);
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Loading audit trail...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }
  if (!history || !history.elementExecutions || history.elementExecutions.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">No audit trail available</p>
      </div>
    );
  }
  const sortedExecutions = [...history.elementExecutions].sort(
    (a, b) => new Date(b.startedTime).getTime() - new Date(a.startedTime).getTime()
  );
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Audit Trail</h3>
        <p className="text-sm text-gray-500 mt-0.5">Complete history of case activities</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedExecutions.map((execution) => {
                const duration = execution.completedTime
                  ? Math.round(
                      (new Date(execution.completedTime).getTime() -
                        new Date(execution.startedTime).getTime()) /
                        1000
                    )
                  : null;
                return (
                  <tr key={execution.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {new Date(execution.startedTime).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{execution.name}</td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          execution.status === 'Completed' || execution.status === 'Successful'
                            ? 'bg-green-100 text-green-700'
                            : execution.status === 'Faulted'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {execution.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {duration !== null ? `${duration}s` : 'In progress'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}