import { CheckCircle, Circle, Clock } from 'lucide-react';
import { MOCK_STAGES } from './mockData';
interface CaseTimelineTabProps {
  claimId: string;
  stage: string;
}
export function CaseTimelineTab({ claimId, stage }: CaseTimelineTabProps) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-base font-semibold text-gray-900">Case Progress Timeline</h3>
        <p className="text-sm text-gray-500 mt-0.5">Track the progression through claim stages</p>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {MOCK_STAGES.map((s) => {
            const isCompleted = s.status === 'Completed';
            const isInProgress = s.status === 'In Progress';
            return (
              <div key={s.id} className="relative flex items-start gap-4">
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
                      {s.name}
                    </h4>
                    {s.completedDate && (
                      <span className="text-xs text-gray-500">
                        Completed: {new Date(s.completedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {isCompleted
                      ? 'Stage completed successfully'
                      : isInProgress
                      ? 'Currently in progress'
                      : 'Pending'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}