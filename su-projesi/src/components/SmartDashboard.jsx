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
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:border-cyan-500/30">
      {/* Arka plan parlama halkası */}
      <div className="absolute -right-16 -top-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* GİRİŞ YAPILMADIYSA */}
      {!user.isLoggedIn ? (
        <div className="flex flex-col items-center text-center py-4">
          <div className="relative mb-4 p-4 bg-cyan-950/40 rounded-full border border-cyan-500/20 text-cyan-400">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Akıllı Tüketim Asistanı</h3>
          <p className="text-sm text-slate-300 max-w-sm mb-6 leading-relaxed">
            Günlük su tüketiminizi takip etmek, bitmeye yakın uyarı almak ve kişiye özel kurye deneyimini aktifleştirmek için asistanınızı başlatın.
          </p>

          <form onSubmit={handleLogin} className="w-full max-w-xs flex flex-col gap-3">
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="İsminiz..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="w-full bg-slate-900/60 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 active:scale-95"
            >
              Asistanı Başlat
            </button>
          </form>
        </div>
      ) : (
        /* GİRİŞ YAPILDIYSA */
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/20 text-cyan-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-slate-400 font-medium">Hoş Geldin,</h4>
                <h3 className="text-base font-bold text-white tracking-wide">{user.name}</h3>
              </div>
            </div>

            <button
              onClick={logout}
              title="Çıkış Yap"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl border border-transparent hover:border-rose-500/20 transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Profil Seçimi */}
          <div className="flex flex-col gap-2">
            <label className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Tüketim Profili</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'haftalik_1', label: '1 Damacana', desc: 'Haftalık' },
                { id: 'haftalik_2', label: '2 Damacana', desc: 'Haftalık' },
                { id: 'gunluk_3', label: '3 Litre (Sporcu)', desc: 'Günlük' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProfile(p.id)}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                    consumptionProfile === p.id
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                      : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">{p.desc}</span>
                  <span className="text-xs font-semibold mt-0.5">{p.id === 'gunluk_3' ? '3 Litre' : p.id === 'haftalik_2' ? '2 Damacana' : '1 Damacana'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar (Su Durumu) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                Evdeki Su Rezervi
              </span>
              <span className={`text-sm font-black px-2 py-0.5 rounded-lg ${
                waterProgress >= 50
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : waterProgress >= 20
                  ? 'text-amber-400 bg-amber-500/10'
                  : 'text-rose-400 bg-rose-500/10 animate-pulse'
              }`}>
                %{waterProgress}
              </span>
            </div>

            {/* İlerleme Çubuğu */}
            <div className="h-3.5 w-full bg-slate-950/80 rounded-full p-[2px] border border-white/5 overflow-hidden shadow-inner">
              <div
                style={{ width: `${waterProgress}%` }}
                className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out ${getProgressColorClass(waterProgress)}`}
              />
            </div>
          </div>

          {/* Düşük Su Uyarısı */}
          {showProgressWarning && (
            <div className="flex items-start gap-2.5 bg-rose-950/40 border border-rose-500/20 text-rose-300 p-3 rounded-2xl animate-pulse">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-[11px] leading-relaxed font-semibold">
                ⚠️ Suyunuz bitmek üzere! Susuz kalmamak için hemen yeni bir koli veya damacana sipariş edin.
              </div>
            </div>
          )}

          {/* Aksiyon Butonları */}
          <div className="grid grid-cols-2 gap-3 mt-1">
            <button
              onClick={drinkWater}
              className="flex items-center justify-center gap-2 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-medium py-3 px-3 rounded-2xl text-xs transition-all active:scale-95 group"
            >
              <GlassWater className="w-4 h-4 text-cyan-400 group-hover:scale-125 transition-transform" />
              1 Birim İçtim
            </button>
            
            <button
              onClick={refillWater}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium py-3 px-3 rounded-2xl text-xs transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-95 group"
            >
              <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              Rezervi Yenile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartDashboard;
