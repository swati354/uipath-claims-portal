import React, { useState } from 'react';
import type { CaseInstanceGetResponse } from '@uipath/uipath-typescript/cases';
import { AppLayout } from '@/components/layout/AppLayout';
import { Dashboard } from '@/components/claims/Dashboard';
import { ClaimsList } from '@/components/claims/ClaimsList';
import { CaseDetail } from '@/components/claims/CaseDetail';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
export type View = 'dashboard' | 'claims-list' | 'case-detail';
export function HomePage() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedClaim, setSelectedClaim] = useState<CaseInstanceGetResponse | null>(null);
  const handleViewClaim = (claim: CaseInstanceGetResponse) => {
    setSelectedClaim(claim);
    setCurrentView('case-detail');
  };
  const handleBackToList = () => {
    setCurrentView('claims-list');
    setSelectedClaim(null);
  };
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedClaim(null);
  };
  return (
    <AppLayout container={false} className="bg-gray-50">
      <ThemeToggle className="fixed top-4 right-4 z-50" />
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Claims Portal</h1>
              </div>
              <div className="flex items-center gap-1 ml-4">
                <button
                  onClick={handleBackToDashboard}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'dashboard'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('claims-list')}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentView === 'claims-list' || currentView === 'case-detail'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Claims
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                <span className="font-medium text-gray-900">Claims Officer</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">CO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen">
        {currentView === 'dashboard' && <Dashboard onViewAllClaims={() => setCurrentView('claims-list')} />}
        {currentView === 'claims-list' && <ClaimsList onViewClaim={handleViewClaim} />}
        {currentView === 'case-detail' && selectedClaim && (
          <CaseDetail claim={selectedClaim} onBack={handleBackToList} />
        )}
      </div>
      <Toaster richColors closeButton />
    </AppLayout>
  );
}