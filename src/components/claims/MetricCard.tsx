import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  trendLabel: string;
}
export function MetricCard({ title, value, icon, trend, trendValue, trendLabel }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-500',
  };
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-gray-50 rounded-lg text-gray-600">{icon}</div>
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {trendValue && (
          <div className={`flex items-center gap-1 text-sm ${trendColors[trend]}`}>
            <TrendIcon className="w-4 h-4" />
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      {trendLabel && <p className="text-xs text-gray-500 mt-1">{trendLabel}</p>}
    </div>
  );
}