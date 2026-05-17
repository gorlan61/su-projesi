import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Droplet, Bell } from 'lucide-react';

const FloatingTracker = () => {
  const { user, waterProgress } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!user?.isLoggedIn || !isVisible) return null;

  const isWarning = waterProgress < 20;

  const handleClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('smart-dashboard');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      const el = document.getElementById('smart-dashboard');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-3 py-2.5 rounded-[2rem] backdrop-blur-xl border shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 group overflow-hidden ${
        isWarning
          ? 'bg-rose-950/90 border-rose-500/50 shadow-[0_0_30px_rgba(225,29,72,0.5)] animate-pulse'
          : 'bg-slate-900/90 border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:border-cyan-500/40'
      }`}
    >
      {/* Background Water Wave Effect */}
      {!isWarning && (
        <div 
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-cyan-500/30 to-cyan-400/5 transition-all duration-1000 ease-in-out z-0"
          style={{ height: `${waterProgress}%` }}
        />
      )}

      <div className={`relative z-10 p-2.5 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isWarning ? 'bg-rose-500/20 text-rose-400' : 'bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-slate-900'
      }`}>
        {isWarning ? <Bell className="w-4 h-4" /> : <Droplet className="w-4 h-4" />}
      </div>
      
      <div className="relative z-10 flex flex-col items-start pr-3">
        <span className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1 ${isWarning ? 'text-rose-400' : 'text-slate-400'}`}>
          {isWarning ? 'Kritik Seviye' : 'Su Rezervi'}
        </span>
        <span className={`text-base leading-none font-black tracking-tight ${isWarning ? 'text-rose-300' : 'text-white'}`}>
          %{waterProgress}
        </span>
      </div>
    </button>
  );
};

export default FloatingTracker;
