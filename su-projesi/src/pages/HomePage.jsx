import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplets, Globe, Star, Shield, Truck, Award, Zap, ChevronRight } from 'lucide-react';
import { productsData } from '../data/productsData';
import ProductCard from '../components/ProductCard';
import SmartDashboard from '../components/SmartDashboard';

const HeroSection = () => {
  return (
    <section className="bg-hero min-h-screen flex items-center relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400/8 animate-pulse"
            style={{
              width: `${80 + i * 70}px`,
              height: `${80 + i * 70}px`,
              top: `${5 + i * 10}%`,
              left: `${-8 + i * 14}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          />
        ))}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(248,250,252,1)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Droplets className="w-4 h-4 animate-pulse" />
              Dünyanın En Saf Suları — Kapınızda
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Su İçmeyi
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Yeniden Keşfet
              </span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-lg">
              Norveç buzullarından Fiji adalarına, Fransız Alplerinden Anadolu kaynaklarına —
              dünyanın en premium sularını özenle seçip kapınıza getiriyoruz.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link
                to="/urunler"
                id="hero-explore-btn"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-bold text-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-2xl shadow-cyan-500/40 hover:-translate-y-1 group"
              >
                Koleksiyonu Keşfet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link
                to="/urunler"
                id="hero-import-btn"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/25 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <Globe className="w-5 h-5" />
                İthal Koleksiyon
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
              {[
                { value: '50+', label: 'Premium Marka', icon: '🏆' },
                { value: '12+', label: 'Ülkeden İthal', icon: '🌍' },
                { value: '30K+', label: 'Mutlu Müşteri', icon: '💧' },
              ].map(stat => (
                <div key={stat.label} className="group">
                  <p className="text-sm mb-1">{stat.icon}</p>
                  <p className="text-3xl font-black text-white group-hover:text-cyan-300 transition-colors duration-300">{stat.value}</p>
                  <p className="text-slate-400 text-xs mt-1 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-3xl blur-3xl scale-110" />
              <div className="relative grid grid-cols-2 gap-4">
                {productsData.filter(p => p.popular).slice(0, 4).map((product, i) => (
                  <Link
                    key={product.id}
                    to="/urunler"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 hover:bg-white/15 hover:border-white/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block cursor-pointer"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <img
                      src={product.image}
                      alt={product.isim}
                      className="w-full h-28 object-cover rounded-xl mb-2"
                      onError={e => { e.target.src = `https://placehold.co/200x150/0c4a6e/67e8f9?text=${encodeURIComponent(product.marka)}`; }}
                    />
                    <p className="text-white/70 text-xs">{product.marka}</p>
                    <p className="text-white font-semibold text-sm truncate">{product.isim}</p>
                    <p className="text-cyan-300 font-bold text-sm">₺{product.fiyat.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            title: 'Kalite Güvencesi',
            desc: 'Her su kaynağı laboratuvarda analiz edilir. ISO sertifikalı, yüksek standartlı tedarik zinciri.',
            color: 'from-cyan-500 to-cyan-600',
            bg: 'from-cyan-50 to-cyan-100/50',
            border: 'border-cyan-200',
          },
          {
            icon: Truck,
            title: '24 Saatte Teslimat',
            desc: 'Aynı gün kargo seçeneği ile siparişiniz maksimum 24 saatte soğutulmuş olarak kapınızda.',
            color: 'from-blue-500 to-blue-600',
            bg: 'from-blue-50 to-blue-100/50',
            border: 'border-blue-200',
          },
          {
            icon: Award,
            title: 'Premium Seçki',
            desc: "Dünyanın en ünlü ve nadir kaynak suları, uzman sommelierlerimiz tarafından özenle seçiliyor.",
            color: 'from-indigo-500 to-indigo-600',
            bg: 'from-indigo-50 to-indigo-100/50',
            border: 'border-indigo-200',
          },
        ].map(({ icon: Icon, title, desc, color, bg, border }) => (
          <div key={title} className={`bg-gradient-to-br ${bg} border ${border} rounded-2xl p-8 group hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5`}>
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-bold text-slate-800 text-xl mb-3">{title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PHGuideSection = () => (
  <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold mb-4">
          <Zap className="w-4 h-4" /> pH Rehberi
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Su Seçiminde pH Değeri Neden Önemli?</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Her suyun kendine özgü bir pH değeri vardır. Doğru pH, vücudunuzun dengesini korur.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { range: 'pH < 7.0', label: 'Asidik', color: 'from-amber-500 to-orange-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-300', desc: 'San Pellegrino, Perrier gibi gazlı sular. Ferahlatıcı ve serinletici.', icon: '🍋' },
          { range: 'pH 7.0 – 7.4', label: 'Nötr', color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-300', desc: 'Evian, Munzur gibi doğal kaynak suları. Vücut için ideal denge noktası.', icon: '💚' },
          { range: 'pH ≥ 7.5', label: 'Alkali', color: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-300', desc: 'Fiji, Acqua Panna gibi sular. Asit reflü ve sindirim için faydalı.', icon: '✨' },
        ].map(item => (
          <div key={item.label} className={`${item.bg} border ${item.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300`}>
            <div className="text-3xl mb-3">{item.icon}</div>
            <div className={`text-2xl font-black mb-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
              {item.range}
            </div>
            <p className={`font-bold text-lg mb-3 ${item.text}`}>{item.label} Su</p>
            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            <Link to="/urunler" className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold ${item.text} hover:gap-2 transition-all duration-200`}>
              Bu aralığı filtrele <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PopularSection = () => {
  const popular = productsData.filter(p => p.popular).slice(0, 4);
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-4">
            <Star className="w-4 h-4 fill-current" /> En Çok Tercih Edilenler
          </div>
          <h2 className="section-title">Popüler Koleksiyon</h2>
          <p className="section-subtitle">Müşterilerimizin en çok tercih ettiği premium sular</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/urunler" id="popular-view-all-btn" className="btn-primary inline-flex items-center gap-2 group">
            Tüm Ürünleri Gör
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialSection = () => {
  const testimonials = [
    { name: 'Ayşe K.', city: 'İstanbul', rating: 5, text: 'VOSS Sparkling gerçekten harikaydı. Daha önce bu kadar kaliteli su içmemiştim. Kesinlikle tekrar sipariş vereceğim!', product: 'VOSS Sparkling', avatar: 'AK' },
    { name: 'Mehmet T.', city: 'Ankara', rating: 5, text: 'Fiji Natural\'ı denedikten sonra artık başka su içemiyorum. Hafif tadı ve yüksek pH değeri tam benim için.', product: 'Fiji Natural', avatar: 'MT' },
    { name: 'Zeynep Y.', city: 'İzmir', rating: 5, text: 'Hem yerli hem ithal ürünlerin bir arada olması çok pratik. Munzur Premium fiyat-kalite oranıyla mükemmel!', product: 'Munzur Premium', avatar: 'ZY' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-semibold mb-4">
            💬 Müşteri Yorumları
          </div>
          <h2 className="section-title">Müşterilerimiz Ne Diyor?</h2>
          <p className="section-subtitle">30,000+ mutlu müşterimizden bazı yorumlar</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:border-cyan-200 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-sm mb-5 italic">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city}</p>
                  </div>
                </div>
                <span className="text-xs text-cyan-600 bg-cyan-50 px-2 py-1 rounded-lg font-medium">{t.product}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BrandSection = () => {
  const brands = ['VOSS', 'Evian', 'Fiji', 'San Pellegrino', 'Perrier', 'Acqua Panna', 'Gerolsteiner', 'Munzur', 'Uludağ'];
  return (
    <section className="py-14 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">
          Güvendiğimiz Markalar
        </p>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 items-center">
          {brands.map(brand => (
            <span
              key={brand}
              className="text-slate-300 font-black text-base md:text-xl hover:text-cyan-500 transition-colors duration-300 cursor-default select-none tracking-tight"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600 relative overflow-hidden">
    <div className="absolute inset-0 opacity-20">
      <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />
    </div>
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <div className="text-5xl mb-4">💧</div>
      <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
        ₺100 ve Üzeri Alışverişte
        <br />
        <span className="text-cyan-100">Kargo Ücretsiz!</span>
      </h2>
      <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
        Dilediğiniz premium suyu seçin, hızlı ve güvenli teslimatın tadını çıkarın.
      </p>
      <Link
        to="/urunler"
        id="cta-shop-btn"
        className="inline-flex items-center gap-2 px-10 py-4 bg-white text-cyan-600 rounded-2xl font-bold text-lg hover:bg-cyan-50 transition-all duration-300 shadow-2xl hover:-translate-y-1 group"
      >
        Alışverişe Başla
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  </section>
);

const HomePage = () => (
  <main className="bg-slate-50">
    <HeroSection />
    
    {/* Akıllı Tüketim Asistanı - Layered Floating Glassmorphic Container */}
    <div className="max-w-4xl mx-auto px-4 relative z-20 -mt-20 mb-10">
      <SmartDashboard />
    </div>

    <FeaturesSection />
    <PopularSection />
    <PHGuideSection />
    <TestimonialSection />
    <BrandSection />
    <CTASection />
  </main>
);

export default HomePage;
