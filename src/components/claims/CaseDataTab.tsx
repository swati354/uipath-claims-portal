import React from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
interface CaseDataTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseDataTab({ claim }: CaseDataTabProps) {
  const dataEntries = [
    { key: 'Instance ID', value: claim.instanceId },
    { key: 'Display Name', value: claim.instanceDisplayName || 'N/A' },
    { key: 'Case Title', value: claim.caseTitle || 'N/A' },
    { key: 'Case Type', value: claim.caseType || 'N/A' },
    { key: 'Package Key', value: claim.packageKey },
    { key: 'Package Version', value: claim.packageVersion },
    { key: 'Process Key', value: claim.processKey },
    { key: 'Folder Key', value: claim.folderKey },
    { key: 'Latest Run Status', value: claim.latestRunStatus },
    { key: 'Latest Run ID', value: claim.latestRunId },
    { key: 'Started By', value: claim.startedByUser || 'System' },
    { key: 'Started Time', value: new Date(claim.startedTime).toLocaleString() },
    {
      key: 'Completed Time',
      value: claim.completedTime ? new Date(claim.completedTime).toLocaleString() : 'In Progress',
    },
    { key: 'Source', value: claim.source || 'N/A' },
    { key: 'User ID', value: claim.userId?.toString() || 'N/A' },
    { key: 'Org ID', value: claim.orgId || 'N/A' },
    { key: 'Tenant ID', value: claim.tenantId || 'N/A' },
  ];
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Case Information</h3>
        <p className="text-sm text-gray-500 mt-0.5">Detailed case metadata and properties</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {dataEntries.map(({ key, value }) => (
            <div key={key}>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{key}</dt>
              <dd className="text-sm text-gray-900 break-words">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}