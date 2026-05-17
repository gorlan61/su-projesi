import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, Instagram, Twitter, Facebook, Mail, Phone, MapPin, ShieldCheck, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Marka */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">WatsuBazaar</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Dünyanın en saf buzullarından ve en bereketli topraklarından gelen seçkin su koleksiyonu. Yaşam kalitenizi suyun saflığıyla yükseltin.
            </p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/5 hover:bg-cyan-500 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Menü */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">KEŞFEDİN</h4>
            <ul className="space-y-4">
              {[
                { to: '/', label: 'Ana Sayfa' },
                { to: '/urunler', label: 'Tüm Koleksiyon' },
                { to: '/urunler?filter=ithal', label: 'İthal Sular' },
                { to: '/urunler?filter=yerli', label: 'Yerli Sular' },
                { to: '/sepet', label: 'Sepetim' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bilgi */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">MÜŞTERİ HİZMETLERİ</h4>
            <ul className="space-y-4">
              {[
                'Sıkça Sorulan Sorular',
                'Teslimat Politikası',
                'İade ve İptal Şartları',
                'Gizlilik Sözleşmesi',
                'KVKK Aydınlatma Metni'
              ].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-medium hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-6">İLETİŞİM</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span className="text-sm">Maslak Mah. No:1, Sarıyer, İstanbul</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span className="text-sm">0850 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span className="text-sm">hello@watsubazaar.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold uppercase tracking-tighter">
            © 2026 WATSUBAZAAR PREMIUM WATER. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold">GÜVENLİ ÖDEME</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="text-[10px] font-bold">256-BIT SSL</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
