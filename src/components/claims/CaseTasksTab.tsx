import React from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
interface CaseTasksTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseTasksTab({ claim }: CaseTasksTabProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Case Tasks</h3>
        <p className="text-sm text-gray-500 mt-0.5">Action items and workflow tasks</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">Task management will be implemented in the next phase</p>
        <p className="text-xs text-gray-500 mt-2">Case ID: {claim.instanceId}</p>
      </div>
    </div>
  );
}