import { Clock } from 'lucide-react';
import { MOCK_AUDIT_EVENTS } from './mockData';
interface CaseAuditTabProps {
  claimId: string;
}
export function CaseAuditTab({ claimId }: CaseAuditTabProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Audit Trail</h3>
        <p className="text-sm text-gray-500 mt-0.5">Complete history of case activities</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_AUDIT_EVENTS.map(event => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {event.timestamp}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{event.user}</td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{event.action}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{event.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}