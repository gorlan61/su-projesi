import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, GitCompare, Award, Sparkles, TrendingUp, Mountain, ShieldCheck } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareModal = ({ isOpen, onClose }) => {
  const { compareList } = useCompare();

  // Scroll kilitleme
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const waterA = compareList[0];
  const waterB = compareList[1];

  if (!waterA || !waterB) return null;

  // Litre başına fiyat hesaplama
  const getLiterPrice = (water) => {
    const ml = parseInt(water.hacim);
    const liters = ml / 1000;
    return water.fiyat / liters;
  };

  const literPriceA = getLiterPrice(waterA);
  const literPriceB = getLiterPrice(waterB);

  // Toplam Mineral
  const totalMineralA = waterA.kalsiyum + waterA.magnezyum + waterA.sodyum;
  const totalMineralB = waterB.kalsiyum + waterB.magnezyum + waterB.sodyum;

  // Kazanan Algoritması
  const phWinner = waterA.phDegeri > waterB.phDegeri ? 'A' : waterB.phDegeri > waterA.phDegeri ? 'B' : null;
  const mineralWinner = totalMineralA > totalMineralB ? 'A' : totalMineralB > totalMineralA ? 'B' : null;
  const econWinner = literPriceA < literPriceB ? 'A' : literPriceB < literPriceA ? 'B' : null;
  const rakimWinner = waterA.rakim > waterB.rakim ? 'A' : waterB.rakim > waterA.rakim ? 'B' : null;

  // pH Bar Renkleri
  const getPHBarColor = (ph) => {
    if (ph < 6.0) return 'from-red-500 to-orange-500';
    if (ph < 7.0) return 'from-orange-400 to-yellow-400';
    if (ph <= 7.5) return 'from-emerald-500 to-teal-500';
    if (ph < 8.5) return 'from-cyan-400 to-blue-500';
    return 'from-blue-600 to-indigo-600';
  };

  // Ülke Bayrakları
  const countryFlags = {
    'Türkiye': '🇹🇷',
    'İtalya': '🇮🇹',
    'Norveç': '🇳🇴',
    'Fransa': '🇫🇷',
    'Fiji Adaları': '🇫🇯',
    'Almanya': '🇩🇪',
  };

  // Mineral Skala Sabitleri (Maksimumlar)
  const maxCalcium = 350;
  const maxMagnesium = 110;
  const maxSodium = 120;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-lg animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-50 bg-white rounded-[32px] shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto animate-scale-up border border-slate-100">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 sm:p-8 border-b border-slate-100 bg-white rounded-t-[32px]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Premium Karşılaştırma Analizi</h2>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">İki Seçkin Markanın Karakteristik Özellikleri</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 text-slate-400 hover:text-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Ürün Görselleri ve Genel Kimlikler */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10">
            {/* Water A */}
            <div className="space-y-4 text-center">
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img src={waterA.image} alt={waterA.isim} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-sm border border-white/20">
                  {countryFlags[waterA.ulke]} {waterA.ulke}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">{waterA.marka}</p>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{waterA.isim}</h3>
              </div>

              {/* Badges A */}
              <div className="flex flex-wrap justify-center gap-1.5 min-h-[32px]">
                {phWinner === 'A' && (
                  <span className="bg-amber-100 text-amber-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏆 En Alkali
                  </span>
                )}
                {mineralWinner === 'A' && (
                  <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    💎 Mineral Deposu
                  </span>
                )}
                {econWinner === 'A' && (
                  <span className="bg-indigo-100 text-indigo-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏷️ En Ekonomik
                  </span>
                )}
                {rakimWinner === 'A' && (
                  <span className="bg-blue-100 text-blue-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏔️ Zirve Kaynak
                  </span>
                )}
              </div>
            </div>

            {/* Water B */}
            <div className="space-y-4 text-center">
              <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img src={waterB.image} alt={waterB.isim} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-black uppercase shadow-sm border border-white/20">
                  {countryFlags[waterB.ulke]} {waterB.ulke}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">{waterB.marka}</p>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">{waterB.isim}</h3>
              </div>

              {/* Badges B */}
              <div className="flex flex-wrap justify-center gap-1.5 min-h-[32px]">
                {phWinner === 'B' && (
                  <span className="bg-amber-100 text-amber-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏆 En Alkali
                  </span>
                )}
                {mineralWinner === 'B' && (
                  <span className="bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    💎 Mineral Deposu
                  </span>
                )}
                {econWinner === 'B' && (
                  <span className="bg-indigo-100 text-indigo-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏷️ En Ekonomik
                  </span>
                )}
                {rakimWinner === 'B' && (
                  <span className="bg-blue-100 text-blue-800 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                    🏔️ Zirve Kaynak
                  </span>
                )}
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Kıyaslama Başlıkları ve Barlar */}
          <div className="space-y-8">
            
            {/* pH Kıyaslaması */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">pH Alkali Derecesi</h4>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:gap-10">
                {/* pH A */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>pH Değeri</span>
                    <span className="font-black text-cyan-600">{waterA.phDegeri}</span>
                  </div>
                  <div className={`relative h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 transition-all ${
                    phWinner === 'A' ? 'ring-2 ring-cyan-400 ring-offset-1 shadow-sm' : ''
                  }`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${getPHBarColor(waterA.phDegeri)}`}
                      style={{ width: `${(waterA.phDegeri / 10) * 100}%` }}
                    />
                  </div>
                </div>

                {/* pH B */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>pH Değeri</span>
                    <span className="font-black text-cyan-600">{waterB.phDegeri}</span>
                  </div>
                  <div className={`relative h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 transition-all ${
                    phWinner === 'B' ? 'ring-2 ring-cyan-400 ring-offset-1 shadow-sm' : ''
                  }`}>
                    <div 
                      className={`h-full bg-gradient-to-r ${getPHBarColor(waterB.phDegeri)}`}
                      style={{ width: `${(waterB.phDegeri / 10) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mineral Kıyaslamaları */}
            <div className="space-y-6 bg-slate-50/50 rounded-3xl p-6 sm:p-8 border border-slate-100">
              <div className="flex items-center gap-1.5 justify-center mb-2">
                <Award className="w-4 h-4 text-emerald-500" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Mineral Sağlık Analizi</h4>
              </div>

              {/* Kalsiyum */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Kalsiyum (Ca)</p>
                <div className="grid grid-cols-2 gap-6 sm:gap-10">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Kalsiyum</span>
                      <span>{waterA.kalsiyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-emerald-400" style={{ width: `${Math.min((waterA.kalsiyum / maxCalcium) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Kalsiyum</span>
                      <span>{waterB.kalsiyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-emerald-400" style={{ width: `${Math.min((waterB.kalsiyum / maxCalcium) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Magnezyum */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Magnezyum (Mg)</p>
                <div className="grid grid-cols-2 gap-6 sm:gap-10">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Magnezyum</span>
                      <span>{waterA.magnezyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-teal-400" style={{ width: `${Math.min((waterA.magnezyum / maxMagnesium) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Magnezyum</span>
                      <span>{waterB.magnezyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-teal-400" style={{ width: `${Math.min((waterB.magnezyum / maxMagnesium) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sodyum */}
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Sodyum (Na)</p>
                <div className="grid grid-cols-2 gap-6 sm:gap-10">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Sodyum</span>
                      <span>{waterA.sodyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-cyan-400" style={{ width: `${Math.min((waterA.sodyum / maxSodium) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-600">
                      <span>Sodyum</span>
                      <span>{waterB.sodyum} mg/L</span>
                    </div>
                    <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                      <div className="h-full bg-cyan-400" style={{ width: `${Math.min((waterB.sodyum / maxSodium) * 100, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toplam Mineral Göstergesi */}
              <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between text-xs font-black text-slate-700">
                <div className="text-center w-full">
                  Toplam Mineral: <span className="text-emerald-600">{totalMineralA.toFixed(1)} mg/L</span>
                </div>
                <div className="text-center w-full border-l border-slate-200">
                  Toplam Mineral: <span className="text-emerald-600">{totalMineralB.toFixed(1)} mg/L</span>
                </div>
              </div>
            </div>

            {/* Fiyat Performans Analizi */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 justify-center">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Fiyat / Litre Ekonomisi</h4>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:gap-10">
                {/* Litre A */}
                <div className={`p-5 rounded-2xl border text-center transition-all ${
                  econWinner === 'A' ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'
                }`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hesaplanan Litre Fiyatı</p>
                  <p className={`text-2xl font-black ${econWinner === 'A' ? 'text-indigo-600' : 'text-slate-800'}`}>
                    ₺{literPriceA.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">({waterA.hacim} · ₺{waterA.fiyat.toFixed(2)})</p>
                </div>

                {/* Litre B */}
                <div className={`p-5 rounded-2xl border text-center transition-all ${
                  econWinner === 'B' ? 'bg-indigo-50/50 border-indigo-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'
                }`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hesaplanan Litre Fiyatı</p>
                  <p className={`text-2xl font-black ${econWinner === 'B' ? 'text-indigo-600' : 'text-slate-800'}`}>
                    ₺{literPriceB.toFixed(2)}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">({waterB.hacim} · ₺{waterB.fiyat.toFixed(2)})</p>
                </div>
              </div>
            </div>

            {/* Kaynak ve Rakım Bilgileri */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 justify-center">
                <Mountain className="w-4 h-4 text-blue-500" />
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Kaynak Yüksekliği (Rakım)</h4>
              </div>
              <div className="grid grid-cols-2 gap-6 sm:gap-10">
                {/* Rakım A */}
                <div className={`p-5 rounded-2xl border text-center transition-all ${
                  rakimWinner === 'A' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'
                }`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kaynağın Rakımı</p>
                  <p className={`text-2xl font-black ${rakimWinner === 'A' ? 'text-blue-600' : 'text-slate-800'}`}>
                    {waterA.rakim} m
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Deniz Seviyesinden</p>
                </div>

                {/* Rakım B */}
                <div className={`p-5 rounded-2xl border text-center transition-all ${
                  rakimWinner === 'B' ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 'bg-slate-50/30 border-slate-100'
                }`}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kaynağın Rakımı</p>
                  <p className={`text-2xl font-black ${rakimWinner === 'B' ? 'text-blue-600' : 'text-slate-800'}`}>
                    {waterB.rakim} m
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold mt-1">Deniz Seviyesinden</p>
                </div>
              </div>
            </div>

          </div>

          {/* Koruma ve Güven Rozeti */}
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-cyan-500" /> WatsuBazaar Laboratuvarlarında Analiz Edilmiştir
          </div>

        </div>

      </div>
    </div>,
    document.body
  );
};

export default CompareModal;
