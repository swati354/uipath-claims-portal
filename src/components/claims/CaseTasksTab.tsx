import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { MOCK_TASKS } from './mockData';
interface CaseTasksTabProps {
  claimId: string;
}
export function CaseTasksTab({ claimId }: CaseTasksTabProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Case Tasks</h3>
        <p className="text-sm text-gray-500 mt-0.5">Action items and workflow tasks</p>
      </div>
      <div className="space-y-3">
        {MOCK_TASKS.map(task => {
          const isCompleted = task.status === 'Completed';
          const isInProgress = task.status === 'In Progress';
          return (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 p-1.5 rounded-full ${
                      isCompleted
                        ? 'bg-green-100'
                        : isInProgress
                        ? 'bg-yellow-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : isInProgress ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">Assigned to: {task.assignee}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    isCompleted
                      ? 'bg-green-100 text-green-700'
                      : isInProgress
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <span>
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                {task.completedDate && (
                  <span>
                    Completed: {new Date(task.completedDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}