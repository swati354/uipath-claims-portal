import React, { useMemo, useEffect, useState } from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { CaseInstances } from '@uipath/uipath-typescript/cases';
import type { CaseGetStageResponse } from '@uipath/uipath-typescript/cases';
import { useAuth } from '@/hooks/useAuth';
interface CaseTimelineTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseTimelineTab({ claim }: CaseTimelineTabProps) {
  const { sdk } = useAuth();
  const caseInstances = useMemo(() => (sdk ? new CaseInstances(sdk) : null), [sdk]);
  const [stages, setStages] = useState<CaseGetStageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!caseInstances) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const stagesData = await caseInstances.getStages(claim.instanceId, claim.folderKey);
        setStages(stagesData || []);
      } catch (err) {
        console.error('Failed to load stages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load timeline');
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
        <p className="text-sm text-gray-600">Loading timeline...</p>
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
  if (stages.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">No stage information available</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Case Progress Timeline</h3>
        <p className="text-sm text-gray-500 mt-0.5">Track the progression through case stages</p>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {stages.map((stage) => {
            const isCompleted = stage.status === 'Completed';
            const isInProgress = stage.status === 'InProgress' || stage.status === 'Running';
            return (
              <div key={stage.id} className="relative flex items-start gap-4">
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600'
                      : isInProgress
                      ? 'bg-white border-blue-600'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-white" />
                  ) : isInProgress ? (
                    <Clock className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className={`text-sm font-semibold ${
                        isCompleted || isInProgress ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {stage.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    {isCompleted
                      ? 'Stage completed successfully'
                      : isInProgress
                      ? 'Currently in progress'
                      : 'Pending'}
                  </p>
                  {stage.tasks && stage.tasks.length > 0 && (
                    <div className="mt-2 text-xs text-gray-500">
                      {stage.tasks.flat().filter((t) => t.status === 'Completed').length} of{' '}
                      {stage.tasks.flat().length} tasks completed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}