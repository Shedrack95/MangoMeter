
import React from 'react';
import { Meter } from '../types';

interface DashboardViewProps {
  meters: Meter[];
  onSelectMeter: (id: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ meters, onSelectMeter }) => {
  const stats = [
    { label: 'Active Meters', value: meters.filter(m => m.status === 'online').length, icon: 'fa-plug-circle-check', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Monthly Consumption', value: '4,285 kWh', icon: 'fa-chart-simple', color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Current Load', value: '18.4 kW', icon: 'fa-bolt', color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Est. Cost', value: '$842.20', icon: 'fa-dollar-sign', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-xl`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Operational Overview</h2>
              <button className="text-emerald-600 text-sm font-medium hover:underline">View Analytics</button>
            </div>
            <div className="h-64 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400">
              <div className="text-center">
                <i className="fa-solid fa-chart-line text-4xl mb-2"></i>
                <p>Interactive Consumption Chart</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Device Status</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider font-semibold border-b border-slate-100">
                    <th className="pb-4">Meter Name</th>
                    <th className="pb-4">Location</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {meters.map((meter) => (
                    <tr key={meter.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="py-4">
                        <p className="font-semibold text-slate-800">{meter.name}</p>
                        <p className="text-xs text-slate-400">{meter.id}</p>
                      </td>
                      <td className="py-4 text-sm text-slate-600">{meter.location}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          meter.status === 'online' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${meter.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          {meter.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => onSelectMeter(meter.id)}
                          className="text-slate-400 hover:text-emerald-600 transition-colors"
                        >
                          <i className="fa-solid fa-arrow-right"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
            <h3 className="text-lg font-bold mb-4">Energy Insights</h3>
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Peak Demand Warning</p>
                <p className="text-sm text-slate-200">Building A exceeded 15kW threshold at 10:45 AM. Optimize HVAC scheduling.</p>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Savings Suggestion</p>
                <p className="text-sm text-slate-200">Lowering server room cooling by 1°C could save approx. $120/month.</p>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-emerald-900/40">
              Run Detailed Analysis
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-slate-800 font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors group">
                <i className="fa-solid fa-plus-circle text-xl text-slate-400 group-hover:text-emerald-600 mb-2"></i>
                <span className="text-xs font-semibold text-slate-600">Add Meter</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-emerald-50 rounded-xl transition-colors group">
                <i className="fa-solid fa-file-export text-xl text-slate-400 group-hover:text-emerald-600 mb-2"></i>
                <span className="text-xs font-semibold text-slate-600">Export All</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
