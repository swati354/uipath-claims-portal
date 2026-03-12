interface ClaimStatusBadgeProps {
  status: 'Open' | 'In Progress' | 'Pending Review' | 'Approved' | 'Rejected' | 'Closed';
}
export function ClaimStatusBadge({ status }: ClaimStatusBadgeProps) {
  const styles = {
    Open: 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Pending Review': 'bg-purple-100 text-purple-700',
    Approved: 'bg-green-100 text-green-700',
    Rejected: 'bg-red-100 text-red-700',
    Closed: 'bg-gray-100 text-gray-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
}