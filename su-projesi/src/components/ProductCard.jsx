import React, { useState } from 'react';
import { ShoppingCart, Star, Globe, MapPin, Check, Plus, Eye, GitCompare } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCompare } from '../context/CompareContext';
import ProductDetailModal from './ProductDetailModal';

const ProductCard = ({ product }) => {
  const { addItem, cartItems } = useCart();
  const { addToCompare, isInCompare } = useCompare();
  const [added, setAdded] = useState(false);
  const inCart = cartItems.find(item => item.id === product.id);
  const [showDetails, setShowDetails] = useState(false);
  const selectedCompare = isInCompare(product.id);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // pH değerine göre dinamik renkler
  const getPHStyles = (ph) => {
    if (ph < 7.0) return 'bg-amber-50 text-amber-600 border-amber-100';
    if (ph <= 7.5) return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    return 'bg-cyan-50 text-cyan-600 border-cyan-100';
  };

  // pH Metre Skalası Renkleri (0-10 aralığında)
  const getPHBarColor = (ph) => {
    if (ph < 6.0) return 'from-red-500 to-orange-500';
    if (ph < 7.0) return 'from-orange-400 to-yellow-400';
    if (ph <= 7.5) return 'from-emerald-500 to-teal-500';
    if (ph < 8.5) return 'from-cyan-400 to-blue-500';
    return 'from-blue-600 to-indigo-600';
  };

  const getPHBarPercentage = (ph) => Math.min(Math.max((ph / 10) * 100, 0), 100);

  // Ülke Bayrakları (Emoji)
  const countryFlags = {
    'Türkiye': '🇹🇷',
    'İtalya': '🇮🇹',
    'Norveç': '🇳🇴',
    'Fransa': '🇫🇷',
    'Fiji Adaları': '🇫🇯',
    'Almanya': '🇩🇪',
  };

  return (
    <div className="group bg-white rounded-[32px] border border-slate-100 p-3 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-500">
      {/* Görsel Alanı */}
      <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-50 mb-4 cursor-pointer" onClick={() => setShowDetails(true)}>
        <img
          src={product.image}
          alt={product.isim}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.src = `https://placehold.co/400x500/e2e8f0/64748b?text=${encodeURIComponent(product.marka)}`; }}
        />
        
        {/* Glassmorphic Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
          <div className="flex items-center gap-2 bg-white/95 text-slate-900 px-5 py-2.5 rounded-2xl font-black text-xs shadow-2xl translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <Eye className="w-4 h-4 text-cyan-500" />
            İNCELE
          </div>
        </div>
        
        {/* Badge'ler */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${product.mensei === 'ithal' ? 'bg-white/80 text-blue-600 border-blue-100' : 'bg-emerald-500/90 text-white border-transparent'}`}>
            {product.mensei === 'ithal' ? <Globe className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
            {product.mensei}
          </div>
          {product.popular && (
            <div className="bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-400/20">
              POPÜLER
            </div>
          )}
        </div>

        {/* Ülke Bayrağı - Sağ Üst */}
        <div className="absolute top-4 right-4 text-2xl backdrop-blur-sm bg-white/70 rounded-lg p-1.5 shadow-md">
          {countryFlags[product.ulke] || '🌍'}
        </div>

        {/* pH Badge - Sol Alt */}
        <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-xl text-[10px] font-black border backdrop-blur-md ${getPHStyles(product.phDegeri)}`}>
          pH {product.phDegeri}
        </div>
      </div>

      {/* İçerik Alanı */}
      <div className="px-3 pb-3">
        <div className="mb-4">
          <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">{product.marka}</p>
          <h3 className="text-lg font-black text-slate-800 leading-tight mb-1 group-hover:text-cyan-600 transition-colors">{product.isim}</h3>
          <p className="text-xs text-slate-400 font-medium">{product.hacim} · {product.ulke}</p>
        </div>

        {/* pH Metre Skalası */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">pH Skalası</span>
            <span className="text-xs font-black text-slate-700">{product.phDegeri}</span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${getPHBarColor(product.phDegeri)} transition-all duration-500 shadow-sm`}
              style={{ width: `${getPHBarPercentage(product.phDegeri)}%` }}
            />
            {/* 7.0 (Nötr) İşaretçi */}
            <div className="absolute top-1/2 h-4 w-0.5 bg-slate-300 -translate-y-1/2" style={{ left: '70%' }} title="Nötr (7.0)" />
          </div>
          <div className="flex justify-between mt-1 px-0.5">
            <span className="text-[8px] text-red-500 font-bold">Asidik</span>
            <span className="text-[8px] text-emerald-600 font-bold">Nötr</span>
            <span className="text-[8px] text-blue-600 font-bold">Alkali</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mb-5">
          <div className="flex items-center gap-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-300">({product.reviewCount})</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all border ${
              selectedCompare
                ? 'bg-cyan-50 text-cyan-600 border-cyan-150 shadow-sm shadow-cyan-500/5'
                : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100 hover:text-slate-600'
            }`}
            title={selectedCompare ? 'Karşılaştırma listesinden çıkar' : 'Karşılaştırma listesine ekle'}
          >
            <GitCompare className={`w-3.5 h-3.5 ${selectedCompare ? 'animate-pulse' : ''}`} />
            {selectedCompare ? 'Çıkar' : 'Kıyasla'}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-slate-400 block -mb-1 tracking-tighter">FİYAT</span>
            <span className="text-xl font-black text-slate-900">₺{product.fiyat.toFixed(2)}</span>
          </div>
          
          <button
            onClick={handleAdd}
            className={`
              flex items-center justify-center gap-2 h-12 px-5 rounded-2xl font-black text-xs transition-all duration-300
              ${added 
                ? 'bg-emerald-500 text-white scale-95 shadow-lg shadow-emerald-500/25' 
                : inCart 
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl' 
                  : 'bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/20 hover:-translate-y-1'
              }
            `}
          >
            {added ? (
              <><Check className="w-4 h-4" /> EKLENDİ</>
            ) : inCart ? (
              <><ShoppingCart className="w-4 h-4" /> SEPETTE</>
            ) : (
              <><Plus className="w-4 h-4" /> EKLE</>
            )}
          </button>
        </div>
      </div>

      {/* Modal */}
      <ProductDetailModal product={product} isOpen={showDetails} onClose={() => setShowDetails(false)} />
    </div>
  );
};

export default ProductCard;
