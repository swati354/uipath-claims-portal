import React, { useState, useMemo, useEffect } from 'react';
import { ArrowLeft, Calendar, User, AlertCircle } from 'lucide-react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { CaseInstances } from '@uipath/uipath-typescript/cases';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimStatusBadge } from './ClaimStatusBadge';
import { CaseDataTab } from './CaseDataTab';
import { CaseTimelineTab } from './CaseTimelineTab';
import { CaseDocumentsTab } from './CaseDocumentsTab';
import { CaseTasksTab } from './CaseTasksTab';
import { CaseAuditTab } from './CaseAuditTab';
interface CaseDetailProps {
  claim: CaseInstanceGetResponse;
  onBack: () => void;
}
export function CaseDetail({ claim, onBack }: CaseDetailProps) {
  const { sdk } = useAuth();
  const caseInstances = useMemo(() => (sdk ? new CaseInstances(sdk) : null), [sdk]);
  const [activeTab, setActiveTab] = useState('data');
  const [fullCaseData, setFullCaseData] = useState<CaseInstanceGetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!caseInstances) return;
    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fullData = await caseInstances.getById(claim.instanceId, claim.folderKey);
        setFullCaseData(fullData);
      } catch (err) {
        console.error('CaseDetail load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load case details');
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [caseInstances, claim.instanceId, claim.folderKey]);
  const displayClaim = fullCaseData || claim;
  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Claims
        </Button>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900">
                {displayClaim.instanceId.slice(0, 12)}
              </h1>
              <ClaimStatusBadge status={displayClaim.latestRunStatus} />
            </div>
            <p className="text-base text-gray-600">
              {displayClaim.caseTitle || displayClaim.instanceDisplayName || 'Case Details'}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <User className="w-4 h-4" />
              <span>Started By</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{displayClaim.startedByUser || 'System'}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <AlertCircle className="w-4 h-4" />
              <span>Status</span>
            </div>
            <p className="text-sm font-medium text-gray-900">{displayClaim.latestRunStatus}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Started Date</span>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {new Date(displayClaim.startedTime).toLocaleDateString()}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
              <Calendar className="w-4 h-4" />
              <span>Completed Date</span>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {displayClaim.completedTime
                ? new Date(displayClaim.completedTime).toLocaleDateString()
                : 'In Progress'}
            </p>
          </div>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
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
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm text-gray-600">Loading case details...</p>
              </div>
            ) : (
              <>
                <TabsContent value="data" className="mt-0">
                  <CaseDataTab claim={displayClaim} />
                </TabsContent>
                <TabsContent value="timeline" className="mt-0">
                  <CaseTimelineTab claim={displayClaim} />
                </TabsContent>
                <TabsContent value="documents" className="mt-0">
                  <CaseDocumentsTab claim={displayClaim} />
                </TabsContent>
                <TabsContent value="tasks" className="mt-0">
                  <CaseTasksTab claim={displayClaim} />
                </TabsContent>
                <TabsContent value="audit" className="mt-0">
                  <CaseAuditTab claim={displayClaim} />
                </TabsContent>
              </>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}