import React from 'react';
import { FileText } from 'lucide-react';
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
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-gray-100 rounded-full">
            <FileText className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Document Storage Not Configured</p>
            <p className="text-xs text-gray-500">
              This case process does not have document storage integration enabled.
            </p>
            <p className="text-xs text-gray-500 mt-1">Case ID: {claim.instanceId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}