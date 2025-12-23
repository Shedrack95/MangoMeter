
import React from 'react';
import { User } from '../types';

interface SettingsViewProps {
  user: User;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  return (
    <div className="max-w-4xl space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Account Settings</h2>
        <p className="text-slate-500 font-medium">Manage your profile and platform preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input 
                defaultValue={user.fullName}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input 
                defaultValue={user.email}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 cursor-not-allowed text-slate-500"
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Notification Preferences</h3>
          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-4">
                <i className="fa-solid fa-bell-on text-emerald-600 bg-white p-2.5 rounded-xl shadow-sm"></i>
                <div>
                  <p className="font-bold text-slate-800">Critical Alerts</p>
                  <p className="text-xs text-slate-500">Email & Push alerts when demand exceeds threshold</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600" />
            </label>
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center space-x-4">
                <i className="fa-solid fa-envelope text-blue-600 bg-white p-2.5 rounded-xl shadow-sm"></i>
                <div>
                  <p className="font-bold text-slate-800">Weekly Summaries</p>
                  <p className="text-xs text-slate-500">Receive usage reports every Monday morning</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5 accent-emerald-600" />
            </label>
          </div>
        </div>

        <div className="p-8 flex justify-end bg-slate-50/50">
          <button className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-all">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-red-50 rounded-3xl border border-red-100 p-8 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-red-800 mb-1">Danger Zone</h3>
          <p className="text-sm text-red-600 font-medium">Delete account and wipe all historical energy data.</p>
        </div>
        <button className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
