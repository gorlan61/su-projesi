import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Globe, MapPin, X, Sparkles, Filter } from 'lucide-react';
import { productsData } from '../data/productsData';
import ProductCard from '../components/ProductCard';

const initialFilters = {
  mensei: 'tumu',
  phMin: '',
  phMax: '',
  fiyatMin: '',
  fiyatMax: '',
  arama: '',
};

const ProductsPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState(initialFilters);
  const [sortBy, setSortBy] = useState('varsayilan');

  // URL'den başlangıç filtresi kontrolü (Footer'daki linkler için)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filterType = params.get('filter');
    if (filterType === 'ithal' || filterType === 'yerli') {
      setFilters(prev => ({ ...prev, mensei: filterType }));
    }
  }, [location]);

  const setFilter = (key, value) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const resetFilters = () => setFilters(initialFilters);

  const activeFilterCount = [
    filters.mensei !== 'tumu',
    filters.phMin !== '',
    filters.phMax !== '',
    filters.fiyatMin !== '',
    filters.fiyatMax !== '',
    filters.arama !== '',
  ].filter(Boolean).length;

  const filtered = useMemo(() => {
    let result = [...productsData];

    if (filters.arama)
      result = result.filter(p =>
        p.isim.toLowerCase().includes(filters.arama.toLowerCase()) ||
        p.marka.toLowerCase().includes(filters.arama.toLowerCase())
      );

    if (filters.mensei !== 'tumu')
      result = result.filter(p => p.mensei === filters.mensei);

    if (filters.phMin !== '')
      result = result.filter(p => p.phDegeri >= parseFloat(filters.phMin));

    if (filters.phMax !== '')
      result = result.filter(p => p.phDegeri <= parseFloat(filters.phMax));

    if (filters.fiyatMin !== '')
      result = result.filter(p => p.fiyat >= parseFloat(filters.fiyatMin));

    if (filters.fiyatMax !== '')
      result = result.filter(p => p.fiyat <= parseFloat(filters.fiyatMax));

    switch (sortBy) {
      case 'fiyat-artan': result.sort((a, b) => a.fiyat - b.fiyat); break;
      case 'fiyat-azalan': result.sort((a, b) => b.fiyat - a.fiyat); break;
      case 'ph-artan': result.sort((a, b) => a.phDegeri - b.phDegeri); break;
      case 'ph-azalan': result.sort((a, b) => b.phDegeri - a.phDegeri); break;
      case 'puan': result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      {/* Üst Başlık Alanı */}
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-4 h-4" /> Seçkin Koleksiyon
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight">
                Tüm Ürünler
              </h1>
              <p className="text-slate-400 text-lg max-w-xl">
                Dünya'nın dört bir yanından ve Anadolu'nun kalbinden gelen eşsiz suları keşfedin.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-black text-white">{productsData.length}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Toplam Ürün</span>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 flex flex-col items-center min-w-[120px]">
                <span className="text-2xl font-black text-cyan-400">{[...new Set(productsData.map(p => p.marka))].length}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Premium Marka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
          
          {/* Sol Kolon - Sıralama ve Filtreler */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-5">
              
              {/* Sıralama Kartı */}
              <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sıralama</span>
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all cursor-pointer"
                >
                  <option value="varsayilan">Akıllı Sıralama</option>
                  <option value="fiyat-artan">Fiyat (Düşükten Yükseğe)</option>
                  <option value="fiyat-azalan">Fiyat (Yüksekten Düşüğe)</option>
                  <option value="ph-azalan">pH Değeri (Alkali-Yüksek)</option>
                  <option value="ph-artan">pH Değeri (Asidik-Düşük)</option>
                  <option value="puan">Popülerlik</option>
                </select>
              </div>

              {/* Filtreleme Kartı */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-slate-50/50">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <Filter className="w-5 h-5 text-cyan-500" />
                    Filtreleme
                    {activeFilterCount > 0 && (
                      <span className="ml-1 w-5 h-5 bg-cyan-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </div>
                  {activeFilterCount > 0 && (
                    <button 
                      onClick={resetFilters} 
                      className="text-xs text-red-500 hover:text-red-600 font-bold transition-colors flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> TEMİZLE
                    </button>
                  )}
                </div>

                <div className="p-6 space-y-8 max-h-[calc(100vh-380px)] overflow-y-auto scrollbar-hide">
                  {/* Arama */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">ARAMA</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Marka veya ürün..."
                        value={filters.arama}
                        onChange={e => setFilter('arama', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent focus:bg-white focus:border-cyan-200 rounded-2xl outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Menşei */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">MENŞEİ</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { value: 'tumu', label: 'Tüm Sular', icon: Sparkles },
                        { value: 'ithal', label: 'İthal Sular', icon: Globe },
                        { value: 'yerli', label: 'Yerli Kaynaklar', icon: MapPin },
                      ].map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          onClick={() => setFilter('mensei', value)}
                          className={`flex items-center gap-3 w-full p-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                            filters.mensei === value
                              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                              : 'bg-white border border-slate-100 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${filters.mensei === value ? 'bg-white/20' : 'bg-slate-100'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* pH Değeri */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">pH ARALIĞI</label>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <input 
                        type="number" step="0.1" placeholder="Min"
                        value={filters.phMin}
                        onChange={e => setFilter('phMin', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl outline-none text-sm text-center border border-transparent focus:border-cyan-200"
                      />
                      <input 
                        type="number" step="0.1" placeholder="Max"
                        value={filters.phMax}
                        onChange={e => setFilter('phMax', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl outline-none text-sm text-center border border-transparent focus:border-cyan-200"
                      />
                    </div>
                    <div className="space-y-2">
                      {[
                        { label: 'Yumuşak (pH < 7.0)', min: '', max: '6.9' },
                        { label: 'Dengeli (7.0 - 7.5)', min: '7.0', max: '7.5' },
                        { label: 'Alkali (pH > 7.5)', min: '7.6', max: '' },
                      ].map(({ label, min, max }) => (
                        <button
                          key={label}
                          onClick={() => { setFilter('phMin', min); setFilter('phMax', max); }}
                          className={`w-full text-left text-xs px-4 py-2.5 rounded-xl transition-all ${
                            filters.phMin === min && filters.phMax === max
                              ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-100'
                              : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fiyat */}
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">FİYAT (₺)</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input 
                        type="number" placeholder="0"
                        value={filters.fiyatMin}
                        onChange={e => setFilter('fiyatMin', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl outline-none text-sm text-center border border-transparent focus:border-cyan-200"
                      />
                      <input 
                        type="number" placeholder="500"
                        value={filters.fiyatMax}
                        onChange={e => setFilter('fiyatMax', e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl outline-none text-sm text-center border border-transparent focus:border-cyan-200"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </aside>

          {/* Sağ Kolon - Ürün Listesi */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full text-sm font-bold">
                  {filtered.length} Ürün Bulundu
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="bg-white rounded-[40px] p-20 flex flex-col items-center justify-center text-center shadow-sm border border-slate-100">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-slate-200" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 mb-2">Aradığınız su buralarda yok gibi...</h3>
                <p className="text-slate-400 mb-8 max-w-sm">Filtrelerinizi biraz yumuşatmayı deneyin ya da tüm ürünlere geri dönün.</p>
                <button 
                  onClick={resetFilters} 
                  className="btn-primary flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Tüm Ürünleri Göster
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
