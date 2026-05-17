import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Droplet, User, RefreshCw, LogOut, Activity, AlertTriangle, Sparkles, GlassWater } from 'lucide-react';

const SmartDashboard = () => {
  const {
    user,
    consumptionProfile,
    waterProgress,
    showProgressWarning,
    login,
    logout,
    setProfile,
    drinkWater,
    refillWater
  } = useUser();

  const [inputName, setInputName] = useState('');

  // Giriş yapma tetikleyicisi
  const handleLogin = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      login(inputName);
      setInputName('');
    }
  };

  // Su seviyesine göre renk belirleme
  const getProgressColorClass = (progress) => {
    if (progress >= 50) {
      return 'from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(56,189,248,0.5)]';
    } else if (progress >= 20) {
      return 'from-amber-400 to-orange-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]';
    } else {
      return 'from-rose-500 to-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse';
    }
  };



  return (
    <div className="relative overflow-hidden bg-white/10 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500">
      {/* Arka plan parlama halkası */}
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-cyan-500/20 rounded-full blur-[64px] pointer-events-none" />

      {/* GİRİŞ YAPILMADIYSA */}
      {!user.isLoggedIn ? (
        <div className="flex flex-col items-center text-center py-8">
          <div className="relative mb-6 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg">
            <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
          
          <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-3">Akıllı Tüketim Asistanı</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mb-8 leading-relaxed">
            Günlük su tüketiminizi takip etmek, bitmeye yakın uyarı almak ve kişiye özel kurye deneyimini aktifleştirmek için asistanınızı başlatın.
          </p>

          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="İsminiz..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/30 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-slate-800 dark:text-white font-medium placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all shadow-inner"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] hover:-translate-y-0.5 active:scale-95"
            >
              Asistanı Başlat
            </button>
          </form>
        </div>
      ) : (
        /* GİRİŞ YAPILDIYSA - BENTO GRID DÜZENİ */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* BENTO BOX 1: Header */}
          <div className="md:col-span-2 bg-white/20 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 rounded-[24px] p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 shadow-sm">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-0.5">Hoş Geldin,</h4>
                <h3 className="text-lg font-black text-slate-800 dark:text-white tracking-tight">{user.name}</h3>
              </div>
            </div>

            <button
              onClick={logout}
              title="Çıkış Yap"
              className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl border border-transparent hover:border-rose-500/20 transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* BENTO BOX 2: Progress Bar */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/60 dark:to-slate-950/60 border border-slate-200 dark:border-white/10 rounded-[24px] p-6 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <Droplet className="w-4 h-4 text-cyan-500" />
                Evdeki Su Rezervi
              </span>
              <span className={`text-lg font-black px-3 py-1 rounded-xl shadow-sm border ${
                waterProgress >= 50
                  ? 'text-cyan-600 bg-cyan-50 border-cyan-200 dark:text-cyan-400 dark:bg-cyan-500/10 dark:border-cyan-500/20'
                  : waterProgress >= 20
                  ? 'text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20'
                  : 'text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20 animate-pulse'
              }`}>
                %{waterProgress}
              </span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="h-6 w-full bg-slate-100 dark:bg-slate-950/80 rounded-2xl p-[3px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-inner mb-2">
              <div
                style={{ width: `${waterProgress}%` }}
                className={`h-full rounded-xl bg-gradient-to-r transition-all duration-700 ease-out ${getProgressColorClass(waterProgress)}`}
              />
            </div>

            {/* Düşük Su Uyarısı */}
            {showProgressWarning && (
              <div className="mt-4 flex items-start gap-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-300 p-4 rounded-2xl animate-pulse shadow-sm">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                <div className="text-xs leading-relaxed font-bold">
                  ⚠️ Suyunuz bitmek üzere! Susuz kalmamak için hemen yeni bir koli veya damacana sipariş edin.
                </div>
              </div>
            )}
          </div>

          {/* BENTO BOX 3: Profil Seçimi */}
          <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 rounded-[24px] p-5 shadow-sm flex flex-col">
            <label className="text-xs text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase mb-3">Tüketim Profili</label>
            <div className="grid grid-rows-3 gap-2 flex-1">
              {[
                { id: 'haftalik_1', label: '1 Damacana', desc: 'Haftalık' },
                { id: 'haftalik_2', label: '2 Damacana', desc: 'Haftalık' },
                { id: 'gunluk_3', label: '3 Litre', desc: 'Günlük' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProfile(p.id)}
                  className={`flex items-center justify-between py-2.5 px-4 rounded-xl border transition-all ${
                    consumptionProfile === p.id
                      ? 'bg-white dark:bg-cyan-500/10 border-cyan-400 dark:border-cyan-500/40 text-cyan-600 dark:text-cyan-300 shadow-sm'
                      : 'bg-white/50 dark:bg-slate-900/40 border-white/40 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-[11px] font-black uppercase tracking-wider opacity-70">{p.desc}</span>
                  <span className="text-sm font-bold">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* BENTO BOX 4: Aksiyonlar */}
          <div className="bg-white/20 dark:bg-slate-800/40 backdrop-blur-md border border-white/20 rounded-[24px] p-5 shadow-sm flex flex-col gap-3 justify-center">
            <button
              onClick={drinkWater}
              className="flex-1 flex flex-col items-center justify-center gap-2 bg-white/60 hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-white/50 dark:border-slate-800 text-slate-700 dark:text-white font-bold py-4 rounded-xl transition-all active:scale-95 shadow-sm group"
            >
              <div className="p-3 rounded-full bg-cyan-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                <GlassWater className="w-6 h-6 text-cyan-500" />
              </div>
              <span>1 Birim İçtim</span>
            </button>
            
            <button
              onClick={refillWater}
              className="flex-1 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(6,182,212,0.39)] hover:shadow-[0_6px_20px_rgba(6,182,212,0.23)] active:scale-95 group"
            >
              <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Rezervi Yenile</span>
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default SmartDashboard;
