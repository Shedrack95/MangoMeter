
import React, { useState, useEffect, useCallback } from 'react';
import { Meter, PhaseData, MeterPayload } from '../types';

interface LiveDataViewProps {
  meterId: string;
  meters: Meter[];
  onMeterChange: (id: string) => void;
}

const LiveDataView: React.FC<LiveDataViewProps> = ({ meterId, meters, onMeterChange }) => {
  const [liveData, setLiveData] = useState<MeterPayload | null>(null);

  const generateMockData = useCallback((): MeterPayload => {
    const phases: PhaseData[] = [1, 2, 3].map(p => ({
      phase: p,
      voltage: 230 + Math.random() * 5,
      current: 4 + Math.random() * 8,
      power: 0, // calculated below
      energy: 12.45 + (Date.now() / 10000000000),
      frequency: 50.0 + (Math.random() * 0.1 - 0.05),
      pf: 0.92 + Math.random() * 0.06
    }));

    phases.forEach(p => p.power = p.voltage * p.current * p.pf);

    return {
      meter_id: meterId,
      timestamp: new Date().toISOString(),
      phases
    };
  }, [meterId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(generateMockData());
    }, 1000);
    return () => clearInterval(interval);
  }, [generateMockData]);

  if (!liveData) return <div className="p-8 text-center text-slate-400">Connecting to MQTT Broker...</div>;

  const totalPower = liveData.phases.reduce((acc, p) => acc + p.power, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {meters.find(m => m.id === meterId)?.name || 'Meter Details'}
          </h2>
          <p className="text-slate-500 font-medium">Real-time Phase Monitoring • {meterId}</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-semibold text-slate-500 mr-2">Select Meter:</label>
          <select 
            className="bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={meterId}
            onChange={(e) => onMeterChange(e.target.value)}
          >
            {meters.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-600 p-8 rounded-3xl text-white shadow-xl shadow-emerald-100 flex flex-col justify-between">
          <div>
            <p className="text-emerald-100 text-sm font-bold uppercase tracking-wider mb-1">Combined Total Power</p>
            <p className="text-5xl font-black">{(totalPower / 1000).toFixed(2)} <span className="text-2xl font-light">kW</span></p>
          </div>
          <div className="mt-8 flex items-end justify-between">
            <div className="w-full h-2 bg-emerald-500/30 rounded-full overflow-hidden">
              <div className="h-full bg-white" style={{ width: '65%' }}></div>
            </div>
            <span className="ml-4 text-xs font-bold">65% Load</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Total Accumulated Energy</p>
            <p className="text-5xl font-black text-slate-800">{liveData.phases[0].energy.toFixed(2)} <span className="text-2xl font-light text-slate-400">kWh</span></p>
          </div>
          <p className="mt-8 text-xs text-slate-400">Since billing cycle started: Jan 1, 2024</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-1">Frequency / Power Factor</p>
            <div className="flex items-baseline space-x-4">
              <p className="text-4xl font-black text-slate-800">{liveData.phases[0].frequency.toFixed(1)} <span className="text-lg font-light text-slate-400">Hz</span></p>
              <p className="text-4xl font-black text-slate-800">{liveData.phases[0].pf.toFixed(2)} <span className="text-lg font-light text-slate-400">PF</span></p>
            </div>
          </div>
          <div className="mt-8 flex items-center space-x-2 text-emerald-500">
            <i className="fa-solid fa-circle-check"></i>
            <span className="text-xs font-bold uppercase">Grid Stable</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {liveData.phases.map((phase) => (
          <div key={phase.phase} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className={`py-3 px-6 text-white font-bold flex justify-between items-center ${
              phase.phase === 1 ? 'bg-red-500' : phase.phase === 2 ? 'bg-amber-500' : 'bg-blue-500'
            }`}>
              <span>PHASE {phase.phase}</span>
              <i className="fa-solid fa-bolt-lightning"></i>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-end border-b border-slate-50 pb-3">
                <span className="text-slate-500 text-sm font-medium">Voltage</span>
                <span className="text-xl font-bold text-slate-800">{phase.voltage.toFixed(1)} <span className="text-sm font-normal text-slate-400">V</span></span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-50 pb-3">
                <span className="text-slate-500 text-sm font-medium">Current</span>
                <span className="text-xl font-bold text-slate-800">{phase.current.toFixed(2)} <span className="text-sm font-normal text-slate-400">A</span></span>
              </div>
              <div className="flex justify-between items-end border-b border-slate-50 pb-3">
                <span className="text-slate-500 text-sm font-medium">Power</span>
                <span className="text-xl font-bold text-slate-800">{(phase.power / 1000).toFixed(2)} <span className="text-sm font-normal text-slate-400">kW</span></span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-slate-500 text-sm font-medium">Power Factor</span>
                <span className="text-xl font-bold text-slate-800">{phase.pf.toFixed(3)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDataView;
