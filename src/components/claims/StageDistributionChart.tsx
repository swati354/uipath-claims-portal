import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { stage: 'Initial Review', count: 3 },
  { stage: 'Assessment', count: 4 },
  { stage: 'Investigation', count: 2 },
  { stage: 'Payment', count: 2 },
  { stage: 'Closed', count: 1 },
];
export function StageDistributionChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Claims by Stage</h3>
        <p className="text-sm text-gray-500 mt-0.5">Current stage distribution</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="stage" tick={{ fill: '#6b7280', fontSize: 11 }} angle={-15} textAnchor="end" height={60} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}