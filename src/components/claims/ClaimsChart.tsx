import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const data = [
  { month: 'Jul', claims: 24 },
  { month: 'Aug', claims: 31 },
  { month: 'Sep', claims: 28 },
  { month: 'Oct', claims: 35 },
  { month: 'Nov', claims: 42 },
  { month: 'Dec', claims: 38 },
  { month: 'Jan', claims: 45 },
];
export function ClaimsChart() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-900">Claims Trend</h3>
        <p className="text-sm text-gray-500 mt-0.5">Monthly claim submissions</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Line type="monotone" dataKey="claims" stroke="#2563eb" strokeWidth={2} dot={{ fill: '#2563eb', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}