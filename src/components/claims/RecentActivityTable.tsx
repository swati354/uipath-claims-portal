import { MOCK_CLAIMS } from './mockData';
import { ClaimStatusBadge } from './ClaimStatusBadge';
export function RecentActivityTable() {
  const recentClaims = MOCK_CLAIMS.slice(0, 5).sort(
    (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Claim ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Policy Holder
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stage
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {recentClaims.map(claim => (
            <tr key={claim.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm font-medium text-blue-600 whitespace-nowrap">{claim.id}</td>
              <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{claim.policyHolder}</td>
              <td className="px-4 py-3 text-sm whitespace-nowrap">
                <ClaimStatusBadge status={claim.status} />
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{claim.stage}</td>
              <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                {new Date(claim.lastUpdated).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}