
export interface PhaseData {
  phase: number;
  voltage: number;
  current: number;
  power: number;
  energy: number;
  frequency: number;
  pf: number;
}

export interface MeterPayload {
  meter_id: string;
  timestamp: string;
  phases: PhaseData[];
}

export interface Meter {
  id: string;
  name: string;
  location: string;
  description: string;
  status: 'online' | 'offline';
  lastSeen: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export enum ViewType {
  DASHBOARD = 'DASHBOARD',
  MY_METERS = 'MY_METERS',
  LIVE_DATA = 'LIVE_DATA',
  HISTORICAL = 'HISTORICAL',
  REPORTS = 'REPORTS',
  SETTINGS = 'SETTINGS'
}
