import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, ArrowLeft, CheckCircle, CreditCard, User, Mail, Phone, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const initialForm = { 
  ad: '', 
  soyad: '', 
  email: '', 
  telefon: '', 
  adres: '', 
  sehir: '', 
  kartNo: '', 
  kartAd: '', 
  ay: '', 
  yil: '', 
  cvv: '',
  teslimatTercihi: 'zile-bas' // Varsayılan tercih
};

const validate = (form) => {
  const errors = {};
  if (!form.ad.trim()) errors.ad = 'Ad zorunludur.';
  if (!form.soyad.trim()) errors.soyad = 'Soyad zorunludur.';
  if (!form.email.trim()) errors.email = 'Geçerli bir e-posta girin.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'E-posta formatı hatalı.';
  if (!form.telefon.trim()) errors.telefon = 'Telefon zorunludur.';
  if (!form.adres.trim()) errors.adres = 'Adres zorunludur.';
  if (!form.sehir.trim()) errors.sehir = 'Şehir seçin.';
  if (!form.kartNo.trim() || form.kartNo.replace(/\s/g, '').length !== 16) errors.kartNo = '16 haneli kart no girin.';
  if (!form.kartAd.trim()) errors.kartAd = 'Kart üzerindeki isim zorunludur.';
  if (!form.ay || !form.yil) errors.skT = 'Geçerli tarih seçin.';
  if (!form.cvv.trim() || !/^\d{3,4}$/.test(form.cvv)) errors.cvv = '3-4 hane CVV.';
  return errors;
};

const CartPage = () => {
  const { cartItems, removeItem, increaseQty, decreaseQty, clearCart, totalPrice } = useCart();
  const { deliveryPreferences, updatePreferences } = useUser();
  const [form, setForm] = useState(initialForm);
  const [ordered, setOrdered] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [activeFocus, setActiveFocus] = useState(''); // kartNo, kartAd, skt, cvv
  const [deliveryStatus, setDeliveryStatus] = useState(0); // 0: Alındı, 1: Hazırlanıyor, 2: Yolda, 3: Kapıda
  const [hasEmpty, setHasEmpty] = useState(false);
  const [isDifferentBrand, setIsDifferentBrand] = useState(false);

  // Sipariş verildikten sonra adım adım canlı takip simülasyonu
  useEffect(() => {
    if (ordered) {
      const timer1 = setTimeout(() => setDeliveryStatus(1), 3500);  // 3.5 sn sonra hazırlık
      const timer2 = setTimeout(() => setDeliveryStatus(2), 7500);  // 7.5 sn sonra yolda
      const timer3 = setTimeout(() => setDeliveryStatus(3), 12500); // 12.5 sn sonra ulaştı
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setDeliveryStatus(0);
    }
  }, [ordered]);

  const errors = validate(form);
  const isFormValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'kartNo') value = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    if (name === 'cvv') value = value.replace(/\D/g, '').slice(0, 4);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setShowErrors(true);
      return;
    }
    setOrdered(true);
    // Sepeti temizleme işlemini yapıyoruz ama form bilgilerinin bir kopyasını başarı ekranında teslimat tercihi için tutabiliriz
    clearCart();
    window.scrollTo(0, 0);
  };

  const shipping = totalPrice > 150 ? 0 : 29.90;
  const depositCharge = (hasEmpty && isDifferentBrand) ? 50 : 0;
  const grandTotal = totalPrice + shipping + depositCharge;



  if (ordered) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-20 flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-center animate-fade-in my-8">
          
          {/* Başarı İkonu */}
          <div className="w-24 h-24 bg-emerald-100 rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/10">
            <CheckCircle className="w-12 h-12 text-emerald-500 animate-pulse" />
          </div>
          
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4 tracking-tight">Sipariş Tamamlandı!</h2>
          <p className="text-slate-500 mb-8 leading-relaxed text-sm">
            Harika seçim! Sularınız en taze halleriyle hazırlanıyor ve yakında kapınızda olacak. Detayları e-postanıza gönderdik.
          </p>

          {/* Canlı Kurye Teslimat Takip Widget'ı */}
          <div className="bg-slate-900 text-white rounded-[32px] p-6 sm:p-8 mb-8 border border-slate-800 relative overflow-hidden text-left shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
            
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div>
                <p className="text-[9px] font-black text-cyan-400 uppercase tracking-widest leading-none mb-1">CANLI TESLİMAT TAKİBİ</p>
                <p className="text-xs text-slate-400 font-bold leading-none">VIP Kurye Simülasyonu</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-black uppercase tracking-wider border border-cyan-500/20">
                <Truck className="w-3.5 h-3.5 animate-bounce" /> Aktif
              </div>
            </div>

            {/* Adım Çizgisi */}
            <div className="relative flex items-center justify-between mb-8 px-2">
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-slate-800 z-0"></div>
              <div 
                className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-0 transition-all duration-1000"
                style={{ width: `${(deliveryStatus / 3) * 88}%` }}
              ></div>
              
              {[
                { label: 'Alındı', icon: '📝' },
                { label: 'Hazırlanıyor', icon: '📦' },
                { label: 'Yolda', icon: '🚚' },
                { label: 'Kapıda', icon: '🚪' }
              ].map((step, idx) => {
                const isActive = deliveryStatus >= idx;
                const isCurrent = deliveryStatus === idx;
                return (
                  <div key={idx} className="relative z-10 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-base transition-all duration-500 shadow-md ${
                      isCurrent 
                        ? 'bg-gradient-to-br from-cyan-400 to-blue-500 text-white scale-125 shadow-lg shadow-cyan-400/30 border border-cyan-300 ring-4 ring-cyan-500/10' 
                        : isActive 
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' 
                          : 'bg-slate-850 text-slate-600 border border-slate-800'
                    }`}>
                      {step.icon}
                    </div>
                    <span className={`text-[9px] font-black uppercase tracking-widest mt-3.5 transition-all ${
                      isCurrent ? 'text-cyan-400 font-black' : isActive ? 'text-slate-300' : 'text-slate-600'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dinamik Durum Mesajı */}
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 text-xs font-semibold leading-relaxed text-slate-300 flex items-start gap-4">
              <span className="text-2xl mt-0.5 animate-bounce">
                {deliveryStatus === 0 && '📝'}
                {deliveryStatus === 1 && '📦'}
                {deliveryStatus === 2 && '🚚'}
                {deliveryStatus === 3 && '🚪'}
              </span>
              <div>
                <p className="text-[10px] font-black text-cyan-400 uppercase tracking-wider mb-0.5">Mevcut Durum</p>
                <p className="font-bold text-slate-200">
                  {deliveryStatus === 0 && 'Siparişiniz ulaştı! Ekiplerimiz premium sularınızı kalite kontrol testine tabi tutuyor.'}
                  {deliveryStatus === 1 && 'Sularınız buzul kasalarına yerleştiriliyor ve soğutuculu kurye aracımıza yükleniyor.'}
                  {deliveryStatus === 2 && 'Siparişiniz yolda! VIP Kuryemiz adresinize doğru yola çıktı, çok yakında kapınızda olacak.'}
                  {deliveryStatus === 3 && 'Kuryemiz ulaştı! Siparişiniz tercihiniz doğrultusunda temassız teslimat ile kapınıza bırakıldı.'}
                </p>
              </div>
            </div>
          </div>

          {/* Sipariş Detayları Kartı */}
          <div className="bg-white dark:bg-slate-900/60 rounded-[32px] p-8 mb-8 border border-slate-100 dark:border-slate-800 shadow-sm text-left space-y-4 transition-colors duration-300">
            <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 pb-3">
              <span className="text-slate-400">Sipariş No:</span>
              <span className="text-slate-900 font-bold">#WB-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            
            {/* AKILLI KURYE TERCİHLERİ */}
            <div className="border-b border-slate-50 pb-3">
              <span className="text-xs text-slate-400 font-bold block mb-2 uppercase tracking-wider">Kurye Teslimat Tercihleri:</span>
              <div className="flex flex-wrap gap-2">
                {deliveryPreferences.noBell && (
                  <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    🤫 Zile Basma (Kapıya Bırak)
                  </span>
                )}
                {deliveryPreferences.callBefore && (
                  <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    📞 Gelmeden 10 Dk. Önce Ara
                  </span>
                )}
                {deliveryPreferences.contactless && (
                  <span className="text-[10px] font-black text-cyan-600 bg-cyan-50 border border-cyan-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    🛡️ Temassız Teslimat
                  </span>
                )}
                {!deliveryPreferences.noBell && !deliveryPreferences.callBefore && !deliveryPreferences.contactless && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Standart Teslimat
                  </span>
                )}
              </div>
            </div>

            {/* DEPOZİTO BİLGİSİ */}
            <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 pb-3">
              <span className="text-slate-400">Boş Damacana Değişimi:</span>
              <span className="text-slate-800 font-bold">
                {hasEmpty ? (isDifferentBrand ? 'Farklı Marka (+50 TL)' : 'Evet, WatsuBazaar') : 'Hayır, Yok'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm font-medium">
              <span className="text-slate-400">Tahmini Teslimat:</span>
              <span className="text-emerald-600 font-bold">Bugün 18:00'e kadar</span>
            </div>
          </div>

          <Link to="/" className="btn-primary w-full block text-center py-4 rounded-2xl font-black text-sm uppercase tracking-widest">
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-20 flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-slate-200/50">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-3">Sepetiniz Boş</h2>
          <p className="text-slate-500 mb-10 max-w-xs mx-auto">Premium su koleksiyonumuza göz atmak ister misiniz?</p>
          <Link to="/urunler" className="btn-primary inline-flex items-center gap-3">
            <ArrowLeft className="w-5 h-5" /> Alışverişe Başla
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/urunler" className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-cyan-500 hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Ödeme Paneli</h1>
            <p className="text-slate-400 text-sm font-medium">{cartItems.length} Ürün Çeşidi · Güvenli Ödeme</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Sol Kolon - Sepet ve Form */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Ürün Listesi */}
            <div className="bg-white dark:bg-slate-900/60 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="font-black text-slate-800 text-lg flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-500" /> Sepetim
                </h2>
                <button onClick={clearCart} className="text-xs font-bold text-red-400 hover:text-red-500 transition-colors uppercase tracking-widest">Tümünü Temizle</button>
              </div>
              <div className="divide-y divide-slate-50">
                {cartItems.map(item => (
                  <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-slate-50/50 transition-colors">
                    <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.isim} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-1">{item.marka}</p>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base mb-1">{item.isim}</h3>
                      <p className="text-xs text-slate-400 dark:text-slate-300 font-medium">{item.hacim} · pH {item.phDegeri}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-1.5">
                      <button onClick={() => decreaseQty(item.id)} className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:hover:bg-cyan-500 shadow-sm transition-all">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-black text-slate-800 dark:text-slate-100">{item.quantity}</span>
                      <button onClick={() => increaseQty(item.id)} className="w-8 h-8 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white dark:hover:bg-cyan-500 shadow-sm transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right min-w-[100px]">
                      <p className="text-lg font-black text-slate-800 dark:text-slate-100">₺{(item.fiyat * item.quantity).toFixed(2)}</p>
                      <button onClick={() => removeItem(item.id)} className="text-[10px] font-bold text-red-400 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors uppercase tracking-tighter">Kaldır</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Teslimat Bilgileri */}
              <div className="bg-white dark:bg-slate-900/60 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 p-8 transition-colors duration-300">
                <h2 className="font-black text-slate-800 text-lg mb-8 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-500" /> Teslimat Bilgileri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">AD</label>
                    <input type="text" name="ad" value={form.ad} onChange={handleChange} placeholder="Örn: Deniz" className={`w-full px-5 py-3.5 bg-slate-50 border-2 ${showErrors && errors.ad ? 'border-red-100 focus:border-red-200' : 'border-transparent focus:border-cyan-100'} rounded-2xl outline-none font-medium text-sm transition-all`} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">SOYAD</label>
                    <input type="text" name="soyad" value={form.soyad} onChange={handleChange} placeholder="Örn: Yılmaz" className="w-full px-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-medium text-sm transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">E-POSTA</label>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="deniz@mail.com" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-medium text-sm transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">TELEFON</label>
                    <div className="relative">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input type="tel" name="telefon" value={form.telefon} onChange={handleChange} placeholder="05XX XXX XX XX" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-medium text-sm transition-all" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ADRES</label>
                    <div className="relative">
                      <MapPin className="absolute left-5 top-4 w-4 h-4 text-slate-300" />
                      <textarea name="adres" value={form.adres} onChange={handleChange} placeholder="Açık adresiniz..." rows="1" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-medium text-sm transition-all resize-none"></textarea>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ŞEHİR</label>
                    <select name="sehir" value={form.sehir} onChange={handleChange} className="w-full px-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-medium text-sm transition-all appearance-none">
                      <option value="">Şehir Seçin</option>
                      {['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                {/* AKILLI KURYE TESLİMAT TERCİHLERİ */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-cyan-500" /> AKILLI KURYE TESLİMAT TERCİHLERİ
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { key: 'noBell', label: 'Zile Basma (Kapıya Bırak)', desc: 'Siparişi kapıya bırakıp SMS göndeririz.', icon: '🤫' },
                      { key: 'callBefore', label: 'Gelmeden 10 Dk. Ara', desc: 'Adrese gelmeden 10 dakika önce ararız.', icon: '📞' },
                      { key: 'contactless', label: 'Temassız Teslimat', desc: 'Kuryemiz kapınıza asıp zil çalmaz.', icon: '🛡️' }
                    ].map(pref => {
                      const isActive = deliveryPreferences[pref.key];
                      return (
                        <button
                          type="button"
                          key={pref.key}
                          onClick={() => updatePreferences({ [pref.key]: !isActive })}
                          className={`flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300 ${
                            isActive
                              ? 'bg-cyan-500/5 border-cyan-400 shadow-sm ring-1 ring-cyan-400 text-slate-900'
                              : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 text-slate-700'
                          }`}
                        >
                          <span className="text-xl mt-0.5">{pref.icon}</span>
                          <div>
                            <p className="text-xs font-black tracking-tight mb-1">{pref.label}</p>
                            <p className="text-[10px] text-slate-400 font-bold leading-normal">{pref.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Ödeme Bilgileri */}
              <div className="bg-white dark:bg-slate-900/60 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 p-8 transition-colors duration-300">
                <h2 className="font-black text-slate-800 text-lg mb-8 flex items-center justify-between">
                  <span className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-cyan-500" /> Ödeme Bilgileri</span>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-slate-100 rounded"></div>
                    <div className="w-8 h-5 bg-slate-100 rounded"></div>
                    <div className="w-8 h-5 bg-slate-100 rounded"></div>
                  </div>
                </h2>

                {/* İnteraktif Kredi Kartı Görseli */}
                <div className="mb-8 flex justify-center" style={{ perspective: '1000px' }}>
                  <div 
                    className="relative w-full max-w-sm h-52 text-white shadow-2xl rounded-[24px]"
                    style={{
                      transform: activeFocus === 'cvv' ? 'rotateY(180deg)' : 'none',
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.6s ease'
                    }}
                  >
                    {/* Ön Yüz */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[24px] p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border border-white/10 flex flex-col justify-between shadow-lg"
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
                      
                      <div className="flex justify-between items-start">
                        <div className="w-11 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg shadow-sm flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-0.5 w-7 h-5 opacity-30">
                            {[...Array(6)].map((_, i) => <div key={i} className="bg-slate-900 rounded-[1px]"></div>)}
                          </div>
                        </div>
                        <span className="text-[10px] font-black tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg uppercase shadow-sm">
                          {form.kartNo.startsWith('4') ? 'Visa' : form.kartNo.startsWith('5') ? 'Mastercard' : 'WatsuPay'}
                        </span>
                      </div>

                      <div className={`text-lg font-bold tracking-[0.2em] transition-all duration-300 p-2 rounded-xl text-center border ${
                        activeFocus === 'kartNo' ? 'border-cyan-400 bg-cyan-450/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-transparent'
                      }`}>
                        {form.kartNo || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex justify-between items-end">
                        <div className={`transition-all duration-300 px-2.5 py-1 rounded-xl text-left border ${
                          activeFocus === 'kartAd' ? 'border-cyan-400 bg-cyan-450/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-transparent'
                        }`}>
                          <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-0.5">KART SAHİBİ</p>
                          <p className="text-[10px] font-black uppercase tracking-wider leading-none">
                            {form.kartAd || 'AD SOYAD'}
                          </p>
                        </div>

                        <div className={`transition-all duration-300 px-2.5 py-1 rounded-xl text-right border ${
                          activeFocus === 'skt' ? 'border-cyan-400 bg-cyan-450/5 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-transparent'
                        }`}>
                          <p className="text-[6px] font-black text-slate-400 uppercase tracking-widest mb-0.5">SKT</p>
                          <p className="text-[10px] font-black tracking-widest leading-none">
                            {form.ay && form.yil ? `${form.ay}/${form.yil.slice(-2)}` : 'AA/YY'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Arka Yüz */}
                    <div 
                      className="absolute inset-0 w-full h-full rounded-[24px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 border border-white/10 flex flex-col justify-between py-6 shadow-lg"
                      style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                    >
                      <div className="w-full h-11 bg-slate-950 mt-1"></div>
                      
                      <div className="px-6 space-y-1 text-right">
                        <p className="text-[6px] font-black text-slate-400 tracking-widest mr-2">CVV KODU</p>
                        <div className="flex items-center">
                          <div className="flex-1 h-9 bg-slate-100/10 rounded-l-md"></div>
                          <div className="w-16 h-9 bg-amber-500 text-slate-950 font-black flex items-center justify-center rounded-r-md text-sm tracking-wider shadow-inner">
                            {form.cvv || '***'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="px-6 text-[8px] text-slate-500 font-bold uppercase tracking-wider text-center">
                        🔐 256-bit Güvenli SSL Şifreleme Teknolojisi
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">KART NUMARASI</label>
                  <input 
                    type="text" 
                    name="kartNo" 
                    value={form.kartNo} 
                    onChange={handleChange} 
                    onFocus={() => setActiveFocus('kartNo')}
                    onBlur={() => setActiveFocus('')}
                    placeholder="0000 0000 0000 0000" 
                    className="w-full px-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-bold text-sm tracking-widest transition-all" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">KART ÜZERİNDEKİ AD</label>
                    <input 
                      type="text" 
                      name="kartAd" 
                      value={form.kartAd} 
                      onChange={handleChange} 
                      onFocus={() => setActiveFocus('kartAd')}
                      onBlur={() => setActiveFocus('')}
                      placeholder="AD SOYAD" 
                      className="w-full px-5 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-2xl outline-none font-bold text-sm uppercase transition-all" 
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">SKT</label>
                      <div className="flex gap-2">
                        <select 
                          name="ay" 
                          value={form.ay} 
                          onChange={handleChange} 
                          onFocus={() => setActiveFocus('skt')}
                          onBlur={() => setActiveFocus('')}
                          className="w-full px-3 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-xl outline-none font-bold text-sm transition-all"
                        >
                          <option value="">Ay</option>
                          {Array.from({length: 12}, (_, i) => String(i+1).padStart(2, '0')).map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                        
                        <select 
                          name="yil" 
                          value={form.yil} 
                          onChange={handleChange} 
                          onFocus={() => setActiveFocus('skt')}
                          onBlur={() => setActiveFocus('')}
                          className="w-full px-3 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-xl outline-none font-bold text-sm transition-all"
                        >
                          <option value="">Yıl</option>
                          {[2025, 2026, 2027, 2028, 2029].map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">CVV</label>
                      <input 
                        type="password" 
                        name="cvv" 
                        value={form.cvv} 
                        onChange={handleChange} 
                        onFocus={() => setActiveFocus('cvv')}
                        onBlur={() => setActiveFocus('')}
                        placeholder="***" 
                        maxLength="4" 
                        className="w-full px-3 py-3.5 bg-slate-50 border-transparent focus:border-cyan-100 border-2 rounded-xl outline-none font-bold text-sm text-center transition-all" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sağ Kolon - Özet */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              
              {/* DEPOZİTO DEĞİŞİM SİHİRBAZI */}
              <div className="bg-white dark:bg-slate-900/80 backdrop-blur-md rounded-[32px] p-6 border border-slate-100 dark:border-slate-800/60 shadow-sm text-slate-800 dark:text-slate-100 relative overflow-hidden transition-colors duration-300">
                <div className="absolute -right-8 -top-8 w-20 h-20 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                
                <h3 className="text-xs font-black text-slate-700 dark:text-slate-200 mb-2.5 flex items-center gap-1.5 uppercase tracking-wider">
                  ♻️ Depozito Değişim Sihirbazı
                </h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-300 font-bold leading-relaxed mb-4">
                  Elindeki boş damacanayı teslim ederek tasarruf edebilirsin. Farklı marka damacana geçişlerinde tek seferlik fark ücreti yansıtılır.
                </p>
                
                <div className="space-y-4">
                  {/* Soru 1 */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Elinizde boş damacana var mı?</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHasEmpty(true)}
                        className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all active:scale-95 ${
                          hasEmpty
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 shadow-sm'
                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100/50'
                        }`}
                      >
                        Evet, Var
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setHasEmpty(false);
                          setIsDifferentBrand(false);
                        }}
                        className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all active:scale-95 ${
                          !hasEmpty
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 shadow-sm'
                            : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100/50'
                        }`}
                      >
                        Hayır, Yok
                      </button>
                    </div>
                  </div>

                  {/* Soru 2 */}
                  {hasEmpty && (
                    <div className="flex flex-col gap-1.5 animate-fade-in">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verilecek şişe farklı marka mı?</span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setIsDifferentBrand(true)}
                          className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all active:scale-95 ${
                            isDifferentBrand
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 shadow-sm'
                              : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100/50'
                          }`}
                        >
                          Evet, Farklı (+50 ₺)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsDifferentBrand(false)}
                          className={`py-2 px-3 rounded-xl border font-bold text-xs transition-all active:scale-95 ${
                            !isDifferentBrand
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 shadow-sm'
                              : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100/50'
                          }`}
                        >
                          Hayır, WatsuBazaar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sipariş Özeti */}
              <div className="bg-slate-900 dark:bg-slate-900/80 backdrop-blur-md border border-transparent dark:border-slate-800/60 rounded-[32px] p-8 shadow-2xl shadow-slate-900/20 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
                <h2 className="text-xl font-black mb-8 relative z-10 tracking-tight">Sipariş Özeti</h2>
                
                <div className="space-y-4 mb-8 relative z-10">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-400">Ara Toplam</span>
                    <span className="text-white">₺{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-400">Kargo</span>
                    <span className={shipping === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                      {shipping === 0 ? 'ÜCRETSİZ' : `₺${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {depositCharge > 0 && (
                    <div className="flex justify-between text-sm font-medium text-amber-450 animate-pulse">
                      <span>Farklı Marka Depozito</span>
                      <span>+₺{depositCharge.toFixed(2)}</span>
                    </div>
                  )}
                  {shipping > 0 && (
                    <div className="bg-white/5 rounded-2xl p-4 text-[11px] font-bold text-cyan-300 border border-white/5">
                      💡 ₺{(150 - totalPrice).toFixed(2)} daha ekle, kargo bizden olsun!
                    </div>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">TOPLAM TUTAR</span>
                    <span className="text-3xl font-extrabold text-white dark:text-white tracking-tight">₺{grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={!isFormValid && showErrors}
                  className={`w-full py-5 rounded-2xl font-black text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl cursor-pointer ${
                    isFormValid 
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:shadow-cyan-400/20 hover:-translate-y-1 active:translate-y-0' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isFormValid ? <ShieldCheck className="w-6 h-6" /> : <CreditCard className="w-5 h-5" />}
                  {isFormValid ? 'ÖDEMEYİ TAMAMLA' : 'FORMU DOLDURUN'}
                </button>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <Truck className="w-4 h-4 text-cyan-500" /> Tahmini Teslimat: 24 Saat
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-cyan-500" /> 256-bit SSL Koruma
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
