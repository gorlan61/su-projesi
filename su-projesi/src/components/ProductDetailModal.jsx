import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ShoppingCart, Star, Check, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { addItem, cartItems } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = cartItems.find(item => item.id === product.id);

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

  // pH Metre Skalası Renkleri
  const getPHBarColor = (ph) => {
    if (ph < 6.0) return 'from-red-500 to-orange-500';
    if (ph < 7.0) return 'from-orange-400 to-yellow-400';
    if (ph <= 7.5) return 'from-emerald-500 to-teal-500';
    if (ph < 8.5) return 'from-cyan-400 to-blue-500';
    return 'from-blue-600 to-indigo-600';
  };

  const getPHBarPercentage = (ph) => Math.min(Math.max((ph / 10) * 100, 0), 100);

  // Ülke Bayrakları
  const countryFlags = {
    'Türkiye': '🇹🇷',
    'İtalya': '🇮🇹',
    'Norveç': '🇳🇴',
    'Fransa': '🇫🇷',
    'Fiji Adaları': '🇫🇯',
    'Almanya': '🇩🇪',
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-50 bg-white rounded-[32px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-slate-100 bg-white rounded-t-[32px]">
          <div>
            <p className="text-xs font-black text-cyan-500 uppercase tracking-widest mb-1">{product.marka}</p>
            <h2 className="text-2xl font-black text-slate-900">{product.isim}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* İçerik */}
        <div className="p-8 space-y-8">
          {/* Görsel */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={product.image}
              alt={product.isim}
              className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src = `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(product.marka)}`;
              }}
            />
            {product.popular && (
              <div className="absolute top-4 right-4 bg-amber-400 text-amber-900 px-4 py-2 rounded-full text-xs font-black uppercase shadow-lg">
                POPÜLER
              </div>
            )}
          </div>

          {/* Ülke ve Hacim */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Ülke</p>
              <p className="text-2xl mb-1">{countryFlags[product.ulke] || '🌍'}</p>
              <p className="text-sm font-bold text-slate-900">{product.ulke}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Hacim</p>
              <p className="text-2xl font-black text-cyan-600 mb-1">{product.hacim}</p>
              <p className="text-xs text-slate-500">Şişe Kapasitesi</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 text-center">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Menşei</p>
              <p className="text-sm font-black text-slate-900 mb-1">
                {product.mensei === 'ithal' ? '🌐 İthal' : '🏔️ Yerli'}
              </p>
              <p className="text-xs text-slate-500 capitalize">{product.mensei}</p>
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-3">Ürün Açıklaması</h3>
            <p className="text-base text-slate-700 leading-relaxed border-l-4 border-cyan-500 pl-4">
              {product.aciklama}
            </p>
          </div>

          {/* Mineral İçeriği */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-3">Mineral İçeriği</h3>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
              <p className="text-base font-semibold text-slate-800 leading-relaxed">
                {product.mineralIcerigi}
              </p>
            </div>
          </div>

          {/* pH Metre Skalası - Büyük Versiyon */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4">pH Değeri Analizi</h3>
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">pH Skalası</span>
                <span className={`text-2xl font-black ${
                  product.phDegeri < 7.0 ? 'text-amber-600' :
                  product.phDegeri <= 7.5 ? 'text-emerald-600' : 'text-cyan-600'
                }`}>
                  {product.phDegeri}
                </span>
              </div>

              {/* Büyük Bar */}
              <div className="relative h-4 bg-white rounded-full overflow-hidden border-2 border-slate-200">
                <div
                  className={`h-full bg-gradient-to-r ${getPHBarColor(product.phDegeri)} transition-all duration-500 shadow-lg`}
                  style={{ width: `${getPHBarPercentage(product.phDegeri)}%` }}
                />
                {/* 7.0 (Nötr) İşaretçi */}
                <div className="absolute top-0 h-full w-1 bg-slate-400 opacity-50" style={{ left: '70%' }} />
              </div>

              {/* Açıklama */}
              <div className="grid grid-cols-3 gap-3 text-xs font-bold">
                <div className="text-center">
                  <p className="text-red-600">ASIDIK</p>
                  <p className="text-slate-500 text-[10px]">pH &lt; 7.0</p>
                </div>
                <div className="text-center">
                  <p className="text-emerald-600">NÖTR</p>
                  <p className="text-slate-500 text-[10px]">pH 7.0-7.5</p>
                </div>
                <div className="text-center">
                  <p className="text-blue-600">ALKALİ</p>
                  <p className="text-slate-500 text-[10px]">pH &gt; 7.5</p>
                </div>
              </div>

              {/* pH Karakteri */}
              <div className={`p-4 rounded-xl border-2 ${getPHStyles(product.phDegeri)}`}>
                <p className="font-bold">
                  {product.phDegeri < 7.0
                    ? '💧 Asidik Su: Daha yumuşak tat, zarif ve hafif'
                    : product.phDegeri <= 7.5
                    ? '⚖️ Dengeli Su: Doğal denge, kullanıma uygun'
                    : '🌊 Alkali Su: Mineralli, doyurucu ve sağlıklı'}
                </p>
              </div>
            </div>
          </div>

          {/* Puanlama */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-amber-200'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-2xl font-black text-amber-600">{product.rating}</p>
              <p className="text-xs text-amber-600/70 font-bold">({product.reviewCount} değerlendirme)</p>
            </div>

            <div className="bg-cyan-50 rounded-2xl p-6 border border-cyan-100">
              <p className="text-xs text-cyan-600 font-bold uppercase tracking-widest mb-2">FİYAT</p>
              <p className="text-3xl font-black text-cyan-600">₺{product.fiyat.toFixed(2)}</p>
            </div>
          </div>

          {/* Buton */}
          <button
            onClick={handleAdd}
            className={`
              w-full flex items-center justify-center gap-3 h-14 rounded-2xl font-black text-base transition-all duration-300
              ${added
                ? 'bg-emerald-500 text-white scale-95 shadow-lg shadow-emerald-500/25'
                : inCart
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-xl'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 shadow-lg'}
            `}
          >
            {added ? (
              <>
                <Check className="w-5 h-5" /> SEPETE EKLENDİ!
              </>
            ) : inCart ? (
              <>
                <ShoppingCart className="w-5 h-5" /> ZATEN SEPETİNİZDE
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" /> SEPETE EKLE
              </>
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductDetailModal;
