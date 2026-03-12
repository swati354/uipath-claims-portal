import * as React from 'react';
import { Button } from '@/components/ui/button';
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}
export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const isDevelopment = import.meta.env.DEV;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-6 h-6 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        {isDevelopment && (
          <div className="mb-6 p-4 bg-gray-50 rounded-md border border-gray-200">
            <p className="text-xs font-mono text-red-600 break-words">
              {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-gray-600 cursor-pointer hover:text-gray-900">
                  Stack trace
                </summary>
                <pre className="mt-2 text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}
        <div className="flex gap-3">
          <Button
            onClick={resetErrorBoundary}
            className="flex-1"
            variant="default"
          >
            Try again
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="flex-1"
            variant="outline"
          >
            Reload page
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          If the problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}