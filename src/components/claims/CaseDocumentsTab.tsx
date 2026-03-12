import React from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
interface CaseDocumentsTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseDocumentsTab({ claim }: CaseDocumentsTabProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Case Documents</h3>
        <p className="text-sm text-gray-500 mt-0.5">Uploaded files and supporting documentation</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">Document management will be implemented in the next phase</p>
        <p className="text-xs text-gray-500 mt-2">Case ID: {claim.instanceId}</p>
      </div>
    </div>
  );
}