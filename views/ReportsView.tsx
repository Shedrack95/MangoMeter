
import React from 'react';
import { Meter } from '../types';

interface ReportsViewProps {
  meters: Meter[];
}

const ReportsView: React.FC<ReportsViewProps> = ({ meters }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Reports & Export</h2>
          <p className="text-slate-500 font-medium">Download historical data for compliance and billing.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800 mb-2">Export Configuration</h3>
          <p className="text-sm text-slate-500">Generate high-precision datasets from PostgreSQL archives.</p>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase">Selected Meter</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-semibold text-slate-700">
              {meters.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase">Date Range</label>
            <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-semibold text-slate-700" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase">Format</label>
            <div className="flex space-x-2">
               <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">CSV</button>
               <button className="flex-1 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-all">Excel</button>
            </div>
          </div>
          <div className="flex items-end">
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
              <i className="fa-solid fa-download"></i>
              <span>Generate Report</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Recent Reports</h3>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <i className="fa-solid fa-file-excel"></i>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Monthly_Audit_Building_A_Feb.xlsx</p>
                    <p className="text-xs text-slate-400">Generated on Mar 1, 2024 • 2.4 MB</p>
                  </div>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                  <i className="fa-solid fa-cloud-arrow-down text-lg"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
