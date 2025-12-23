
import React, { useState } from 'react';
import { User } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API delay
    const mockUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email,
      fullName: isLogin ? 'Facility Admin' : fullName
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/50 via-slate-50 to-slate-50">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 text-white rounded-3xl shadow-2xl shadow-emerald-200 mb-6 animate-bounce">
          <i className="fa-solid fa-leaf text-4xl"></i>
        </div>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">MangoMeter</h1>
        <p className="text-slate-500 font-medium mt-2">Precision 3-Phase Energy Analytics</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-600"></div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-slate-400 text-sm font-medium mb-8">
          {isLogin ? 'Enter your credentials to access the dashboard' : 'Join the MangoMeter ecosystem today'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute left-4 top-4 text-slate-300"></i>
                <input 
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-4 text-slate-300"></i>
              <input 
                required
                type="email"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                placeholder="admin@factory.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-4 top-4 text-slate-300"></i>
              <input 
                required
                type="password"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-4 outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-100 transition-all transform active:scale-[0.98] mt-4">
            {isLogin ? 'Sign In to Dashboard' : 'Register Application'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>

      <div className="mt-12 text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center space-x-4">
        <span>Cloud Scale</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span>Secure MQTT</span>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span>ISO 27001 Ready</span>
      </div>
    </div>
  );
};

export default LoginView;
