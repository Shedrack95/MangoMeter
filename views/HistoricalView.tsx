
import React, { useState } from 'react';
import { Meter } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface HistoricalViewProps {
  meterId: string;
  meters: Meter[];
  onMeterChange: (id: string) => void;
}

const HistoricalView: React.FC<HistoricalViewProps> = ({ meterId, meters, onMeterChange }) => {
  const [dateRange, setDateRange] = useState('7d');
  
  // Mock historical data
  const data = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    P1: 4 + Math.random() * 2,
    P2: 3 + Math.random() * 2,
    P3: 5 + Math.random() * 2,
    Total: 12 + Math.random() * 6
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Historical Trends</h2>
          <p className="text-slate-500 font-medium">Analyzing consumption over time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            {['24h', '7d', '30d', '1y'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  dateRange === range ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
          <select 
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
            value={meterId}
            onChange={(e) => onMeterChange(e.target.value)}
          >
            {meters.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Power Consumption (kW)</h3>
              <p className="text-sm text-slate-500">Average demand per hour</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-xs font-bold text-slate-400">
                <span className="w-3 h-3 bg-red-400 rounded-full mr-2"></span> Phase 1
              </span>
              <span className="flex items-center text-xs font-bold text-slate-400">
                <span className="w-3 h-3 bg-amber-400 rounded-full mr-2"></span> Phase 2
              </span>
              <span className="flex items-center text-xs font-bold text-slate-400">
                <span className="w-3 h-3 bg-blue-400 rounded-full mr-2"></span> Phase 3
              </span>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorP1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="P1" stroke="#f87171" strokeWidth={3} fillOpacity={1} fill="url(#colorP1)" />
                <Area type="monotone" dataKey="P2" stroke="#fbbf24" strokeWidth={3} fillOpacity={0} />
                <Area type="monotone" dataKey="P3" stroke="#60a5fa" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Voltage Stability (V)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={[220, 240]} axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Line type="step" dataKey="Total" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Daily Accumulation (kWh)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" hide />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="Total" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalView;
