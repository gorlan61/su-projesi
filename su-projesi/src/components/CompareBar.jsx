import React, { useState } from 'react';
import { GitCompare, X, ChevronRight, Trash2 } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import CompareModal from './CompareModal';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const [showModal, setShowModal] = useState(false);

  if (compareList.length === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-4 bg-slate-950/95 backdrop-blur-md border border-white/10 px-5 py-4 rounded-[28px] shadow-2xl text-white max-w-sm sm:max-w-md animate-fade-in transition-all duration-300">
        {/* Başlık ve İkon */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 shadow-sm border border-cyan-500/10">
            <GitCompare className="w-4 h-4 animate-pulse" />
          </div>
          <div className="hidden sm:block">
            <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest leading-none mb-1">KARŞILAŞTIRMA</p>
            <p className="text-xs font-black text-slate-200 leading-none">
              {compareList.length} / 2 Su Seçildi
            </p>
          </div>
        </div>

        {/* Küçük Görseller */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          {compareList.map(item => (
            <div 
              key={item.id} 
              className="relative w-11 h-11 rounded-xl overflow-hidden border border-white/20 bg-white/15 flex-shrink-0 group"
            >
              <img src={item.image} alt={item.isim} className="w-full h-full object-cover" />
              <button 
                onClick={() => removeFromCompare(item.id)} 
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-md transition-colors"
                title="Çıkar"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
          {compareList.length < 2 && (
            <div 
              className="w-11 h-11 rounded-xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center text-[10px] text-slate-400 font-bold tracking-tight" 
              title="Bir su daha seçin"
            >
              +1 Su
            </div>
          )}
        </div>

        {/* Aksiyon Alanı */}
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          {compareList.length === 2 ? (
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black text-[10px] uppercase tracking-widest px-4.5 py-3 rounded-2xl hover:shadow-lg hover:shadow-cyan-400/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1 cursor-pointer"
            >
              Kıyasla <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest animate-pulse max-w-[80px] leading-tight text-center">
              Bir Su Daha Kıyasla
            </div>
          )}
          
          <button 
            onClick={clearCompare}
            className="p-2.5 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all"
            title="Tümünü Temizle"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CompareModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default CompareBar;
