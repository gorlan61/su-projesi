import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative z-50 p-2.5 rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 border shadow-sm group
        ${theme === 'dark' 
          ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(252,211,77,0.3)]' 
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:text-cyan-600'
        }
      `}
      title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon */}
        <Sun 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            theme === 'dark' 
              ? 'scale-100 rotate-0 opacity-100' 
              : 'scale-50 rotate-90 opacity-0'
          }`} 
        />
        {/* Moon Icon */}
        <Moon 
          className={`absolute inset-0 w-full h-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            theme === 'dark' 
              ? 'scale-50 -rotate-90 opacity-0' 
              : 'scale-100 rotate-0 opacity-100'
          }`} 
        />
      </div>
      
      {/* Etkileşim Efekti */}
      <span className="absolute inset-0 rounded-2xl bg-white/0 group-active:bg-white/10 transition-colors"></span>
    </button>
  );
};

export default ThemeToggle;
