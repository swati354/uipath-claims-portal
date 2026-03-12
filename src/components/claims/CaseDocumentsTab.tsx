import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_DOCUMENTS } from './mockData';
interface CaseDocumentsTabProps {
  claimId: string;
}
export function CaseDocumentsTab({ claimId }: CaseDocumentsTabProps) {
  return (
    <div>
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Claim Documents</h3>
        <p className="text-sm text-gray-500 mt-0.5">Uploaded files and supporting documentation</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {MOCK_DOCUMENTS.map(doc => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{doc.type}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">{doc.size}</td>
                  <td className="px-4 py-3 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(doc.uploadedDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">{doc.uploadedBy}</td>
                  <td className="px-4 py-3 text-sm text-right whitespace-nowrap">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}