import React from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
interface CaseTimelineTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseTimelineTab({ claim }: CaseTimelineTabProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Case Progress Timeline</h3>
        <p className="text-sm text-gray-500 mt-0.5">Track the progression through case stages</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">Timeline visualization will be implemented in the next phase</p>
        <p className="text-xs text-gray-500 mt-2">Current Status: {claim.latestRunStatus}</p>
      </div>
    </div>
  );
}