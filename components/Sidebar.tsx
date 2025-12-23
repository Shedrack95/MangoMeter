
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout }) => {
  const menuItems = [
    { type: ViewType.DASHBOARD, label: 'Dashboard', icon: 'fa-chart-pie' },
    { type: ViewType.MY_METERS, label: 'My Meters', icon: 'fa-microchip' },
    { type: ViewType.LIVE_DATA, label: 'Live Data', icon: 'fa-bolt' },
    { type: ViewType.HISTORICAL, label: 'Historical Data', icon: 'fa-clock-rotate-left' },
    { type: ViewType.REPORTS, label: 'Reports / Export', icon: 'fa-file-lines' },
    { type: ViewType.SETTINGS, label: 'Settings', icon: 'fa-gear' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300">
      <div className="p-6 flex items-center space-x-3">
        <div className="bg-emerald-500 p-2 rounded-lg text-white">
          <i className="fa-solid fa-leaf text-xl"></i>
        </div>
        <span className="text-xl font-bold text-white tracking-tight">MangoMeter</span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.type}
            onClick={() => setActiveView(item.type)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeView === item.type
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-6 text-center`}></i>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <i className="fa-solid fa-right-from-bracket w-6 text-center"></i>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
