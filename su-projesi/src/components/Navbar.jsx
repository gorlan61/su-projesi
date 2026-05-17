import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Droplets, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navStyles = isHome 
    ? (scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-sm' : 'bg-transparent py-5')
    : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 shadow-sm';

  const textStyles = isHome && !scrolled ? 'text-white' : 'text-slate-900';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${navStyles}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-transform duration-300">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className={`text-xl font-black tracking-tighter ${textStyles}`}>WatsuBazaar</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${isHome && !scrolled ? 'text-cyan-300' : 'text-cyan-500'}`}>Premium</span>
            </div>
          </Link>

          {/* Masaüstü Menü */}
          <div className="hidden md:flex items-center gap-1.5">
            {[
              { to: '/', label: 'Ana Sayfa' },
              { to: '/urunler', label: 'Mağaza' },
              { to: '/sepet', label: 'Siparişlerim' },
            ].map(link => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                end={link.to === '/'}
                className={({ isActive }) => `
                  px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300
                  ${isActive 
                    ? (isHome && !scrolled ? 'bg-white/20 text-white' : 'bg-cyan-50 text-cyan-600')
                    : (isHome && !scrolled ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')
                  }
                `}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Sağ Alan - Sepet ve Menü Butonu */}
          <div className="flex items-center gap-4">
            <Link to="/sepet" className="relative group">
              <div className={`
                flex items-center gap-2.5 px-5 py-2.5 rounded-2xl font-black text-xs transition-all duration-300 border
                ${totalItems === 0 
                  ? (isHome && !scrolled 
                    ? 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white shadow-none' 
                    : 'bg-slate-50 text-slate-400 border-slate-200/50 hover:bg-slate-100 hover:text-slate-600 shadow-none')
                  : (isHome && !scrolled 
                    ? 'bg-white text-slate-900 border-transparent hover:bg-cyan-50 shadow-xl shadow-cyan-950/10 hover:-translate-y-0.5' 
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent hover:from-cyan-600 hover:to-blue-700 shadow-lg shadow-cyan-500/20 hover:-translate-y-0.5')
                }
              `}>
                <ShoppingCart className={`w-4 h-4 transition-all ${totalItems === 0 ? 'opacity-60' : 'animate-pulse'}`} />
                <span className={`hidden sm:inline transition-all`}>
                  {totalItems === 0 ? 'Boş' : 'Sepetim'}
                </span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-white text-cyan-600 text-[10px] font-black rounded-full animate-bounce shadow-md">
                    {totalItems}
                  </span>
                )}
              </div>
              {totalItems === 0 && (
                <div className="absolute top-full right-0 mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none text-[10px] font-black uppercase tracking-wider bg-slate-900 text-white px-3.5 py-2 rounded-xl whitespace-nowrap z-50 shadow-xl">
                  Sepetiniz boş
                </div>
              )}
            </Link>

            <button 
              className={`md:hidden p-2 rounded-xl transition-colors ${textStyles}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-2xl animate-fade-in">
          <div className="p-4 flex flex-col gap-2">
            {[
              { to: '/', label: 'Ana Sayfa' },
              { to: '/urunler', label: 'Tüm Sular' },
              { to: '/sepet', label: 'Sepetim' },
            ].map(link => (
              <NavLink 
                key={link.to} 
                to={link.to} 
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 text-slate-900 font-bold"
              >
                {link.label}
                <ArrowRight className="w-4 h-4 text-cyan-500" />
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
