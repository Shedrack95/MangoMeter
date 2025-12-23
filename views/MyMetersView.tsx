
import React, { useState } from 'react';
import { Meter } from '../types';

interface MyMetersViewProps {
  meters: Meter[];
  setMeters: (meters: Meter[]) => void;
}

const MyMetersView: React.FC<MyMetersViewProps> = ({ meters, setMeters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', id: '', location: '', description: '' });

  const handleAddMeter = (e: React.FormEvent) => {
    e.preventDefault();
    const newMeter: Meter = {
      ...formData,
      status: 'offline',
      lastSeen: new Date().toISOString()
    };
    setMeters([...meters, newMeter]);
    setIsModalOpen(false);
    setFormData({ name: '', id: '', location: '', description: '' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Registered Devices</h2>
          <p className="text-slate-500">Manage your connected ESP32 + PZEM-004T units.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all"
        >
          <i className="fa-solid fa-plus"></i>
          <span>Register New Meter</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meters.map((meter) => (
          <div key={meter.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4`}>
               <span className={`flex items-center space-x-1.5 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                 meter.status === 'online' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
               }`}>
                 <span className={`w-1.5 h-1.5 rounded-full ${meter.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                 {meter.status}
               </span>
            </div>
            
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 mb-4 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
              <i className="fa-solid fa-microchip text-xl"></i>
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">{meter.name}</h3>
            <p className="text-xs font-mono text-slate-400 mb-4">ID: {meter.id}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-slate-600">
                <i className="fa-solid fa-location-dot w-5 text-slate-400"></i>
                <span>{meter.location}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <i className="fa-solid fa-clock w-5 text-slate-400"></i>
                <span>Last Seen: {new Date(meter.lastSeen).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 py-2 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                Configure
              </button>
              <button className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">New Meter Registration</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleAddMeter} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Meter Name</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="e.g. Factory Main"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">MQTT Client ID (Meter ID)</label>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="e.g. MMeter001"
                  value={formData.id}
                  onChange={e => setFormData({...formData, id: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                <input 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="e.g. Main Distribution Board"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
                  Register Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMetersView;
