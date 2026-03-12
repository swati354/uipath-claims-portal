import React, { useMemo, useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { Tasks } from '@uipath/uipath-typescript/tasks';
import type { TaskGetResponse } from '@uipath/uipath-typescript/tasks';
import { useAuth } from '@/hooks/useAuth';
interface CaseTasksTabProps {
  claim: CaseInstanceGetResponse;
}
export function CaseTasksTab({ claim }: CaseTasksTabProps) {
  const { sdk } = useAuth();
  const tasks = useMemo(() => (sdk ? new Tasks(sdk) : null), [sdk]);
  const [taskList, setTaskList] = useState<TaskGetResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!tasks) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await tasks.getAll({
          filter: `CreatorJobKey eq ${claim.instanceId}`,
          pageSize: 50,
        });
        setTaskList(result?.items || []);
      } catch (err) {
        console.error('Failed to load tasks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [tasks, claim.instanceId]);
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-sm text-gray-600">Loading tasks...</p>
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
  if (taskList.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <p className="text-sm text-gray-600">No tasks found for this case</p>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Case Tasks</h3>
        <p className="text-sm text-gray-500 mt-0.5">Action items and workflow tasks</p>
      </div>
      <div className="space-y-3">
        {taskList.map((task) => {
          const isCompleted = task.isCompleted;
          const isPending = task.status === 'Pending';
          return (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 p-1.5 rounded-full ${
                      isCompleted ? 'bg-green-100' : isPending ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : isPending ? (
                      <Clock className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{task.title}</h4>
                    {task.assignedToUser && (
                      <p className="text-sm text-gray-600 mt-0.5">
                        Assigned to: {task.assignedToUser.displayName || task.assignedToUser.userName}
                      </p>
                    )}
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    isCompleted
                      ? 'bg-green-100 text-green-700'
                      : isPending
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                <span>Created: {new Date(task.createdTime).toLocaleDateString()}</span>
                {task.isCompleted && task.completedTime && (
                  <span>Completed: {new Date(task.completedTime).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}