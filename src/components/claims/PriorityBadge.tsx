interface PriorityBadgeProps {
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}
export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles = {
    Low: 'bg-gray-100 text-gray-700',
    Medium: 'bg-blue-100 text-blue-700',
    High: 'bg-orange-100 text-orange-700',
    Critical: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${styles[priority]}`}>
      {priority}
    </span>
  );
}