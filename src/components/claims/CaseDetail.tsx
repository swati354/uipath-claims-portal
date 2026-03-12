import { useState } from 'react';
import { ArrowLeft, Calendar, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimStatusBadge } from './ClaimStatusBadge';
import { PriorityBadge } from './PriorityBadge';
import { CaseDataTab } from './CaseDataTab';
import { CaseTimelineTab } from './CaseTimelineTab';
import { CaseDocumentsTab } from './CaseDocumentsTab';
import { CaseTasksTab } from './CaseTasksTab';
import { CaseAuditTab } from './CaseAuditTab';
import type { Claim } from '@/pages/HomePage';
interface CaseDetailProps {
  claim: Claim;
  onBack: () => void;
}
export function CaseDetail({ claim, onBack }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState('data');
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="-ml-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Claims
        </Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">{claim.id}</h1>
              <ClaimStatusBadge status={claim.status} />
              <PriorityBadge priority={claim.priority} />
            </div>
            <p className="text-base text-gray-600">{claim.claimType}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <User className="w-4 h-4" />
              <span>Policy Holder</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{claim.policyHolder}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span>Current Stage</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{claim.stage}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Created Date</span>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {new Date(claim.createdDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <User className="w-4 h-4" />
              <span>Assigned Officer</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{claim.assignedOfficer}</p>
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg">
          <TabsList className="w-full justify-start rounded-none border-b border-gray-200 bg-transparent p-0">
            <TabsTrigger
              value="data"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Case Data
            </TabsTrigger>
            <TabsTrigger
              value="timeline"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Case Timeline
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Documents
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
            >
              Audit Trail
            </TabsTrigger>
          </TabsList>
          <div className="p-6">
            <TabsContent value="data" className="mt-0">
              <CaseDataTab claimId={claim.id} />
            </TabsContent>
            <TabsContent value="timeline" className="mt-0">
              <CaseTimelineTab claimId={claim.id} stage={claim.stage} />
            </TabsContent>
            <TabsContent value="documents" className="mt-0">
              <CaseDocumentsTab claimId={claim.id} />
            </TabsContent>
            <TabsContent value="tasks" className="mt-0">
              <CaseTasksTab claimId={claim.id} />
            </TabsContent>
            <TabsContent value="audit" className="mt-0">
              <CaseAuditTab claimId={claim.id} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}