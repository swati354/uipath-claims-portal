import React from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { ClaimStatusBadge } from './ClaimStatusBadge';
interface RecentActivityTableProps {
  instances: CaseInstanceGetResponse[];
}
export function RecentActivityTable({ instances }: RecentActivityTableProps) {
  if (instances.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">No recent activity</div>
    );
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claim ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Started
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {instances.map((claim) => (
            <tr key={claim.instanceId} className="hover:bg-gray-50">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}