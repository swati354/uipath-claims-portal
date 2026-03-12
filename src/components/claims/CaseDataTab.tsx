import { MOCK_CASE_DATA } from './mockData';
interface CaseDataTabProps {
  claimId: string;
}
export function CaseDataTab({ claimId }: CaseDataTabProps) {
  const caseData = MOCK_CASE_DATA[claimId] || MOCK_CASE_DATA['CLM-2024-001'];
  const dataEntries = Object.entries(caseData).map(([key, value]) => ({
    key: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
    value,
  }));
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Claim Information</h3>
        <p className="text-sm text-gray-500 mt-0.5">Detailed claim data and metadata</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {dataEntries.map(({ key, value }) => (
            <div key={key}>
              <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">{key}</dt>
              <dd className="text-sm text-gray-900">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}