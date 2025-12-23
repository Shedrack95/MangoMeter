
import React, { useState, useEffect } from 'react';
import { ViewType, User, Meter } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './views/DashboardView';
import LiveDataView from './views/LiveDataView';
import MyMetersView from './views/MyMetersView';
import HistoricalView from './views/HistoricalView';
import ReportsView from './views/ReportsView';
import SettingsView from './views/SettingsView';
import LoginView from './views/LoginView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<ViewType>(ViewType.DASHBOARD);
  const [meters, setMeters] = useState<Meter[]>([
    { id: 'MMeter001', name: 'Factory Main Meter', location: 'Building A', description: 'Main power inlet', status: 'online', lastSeen: new Date().toISOString() },
    { id: 'MMeter002', name: 'Server Room', location: 'Building B', description: 'Critical infrastructure', status: 'online', lastSeen: new Date().toISOString() },
    { id: 'MMeter003', name: 'EV Charging', location: 'Parking Lot', description: 'Public charger cluster', status: 'offline', lastSeen: new Date(Date.now() - 3600000).toISOString() },
  ]);
  const [selectedMeterId, setSelectedMeterId] = useState<string>(meters[0].id);

  // Mock Authentication Check
  useEffect(() => {
    const savedUser = localStorage.getItem('mangometer_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('mangometer_user');
    setUser(null);
  };

  const handleLogin = (u: User) => {
    localStorage.setItem('mangometer_user', JSON.stringify(u));
    setUser(u);
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case ViewType.DASHBOARD:
        return <DashboardView meters={meters} onSelectMeter={(id) => { setSelectedMeterId(id); setActiveView(ViewType.LIVE_DATA); }} />;
      case ViewType.MY_METERS:
        return <MyMetersView meters={meters} setMeters={setMeters} />;
      case ViewType.LIVE_DATA:
        return <LiveDataView meterId={selectedMeterId} meters={meters} onMeterChange={setSelectedMeterId} />;
      case ViewType.HISTORICAL:
        return <HistoricalView meterId={selectedMeterId} meters={meters} onMeterChange={setSelectedMeterId} />;
      case ViewType.REPORTS:
        return <ReportsView meters={meters} />;
      case ViewType.SETTINGS:
        return <SettingsView user={user} />;
      default:
        return <DashboardView meters={meters} onSelectMeter={setSelectedMeterId} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={handleLogout} 
      />
      <div className="flex flex-col flex-1 min-w-0">
        <Header user={user} activeView={activeView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
