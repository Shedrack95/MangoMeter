
import React from 'react';
import { User, ViewType } from '../types';

interface HeaderProps {
  user: User;
  activeView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ user, activeView }) => {
  const getTitle = () => {
    return activeView.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-slate-800">{getTitle()}</h1>
      <div className="flex items-center space-x-6">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <i className="fa-solid fa-bell text-lg"></i>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">{user.fullName}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Facility Admin</p>
          </div>
          <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-600 font-bold">
            {user.fullName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
