import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '' });

  // LocalStorage'dan yükleme
  useEffect(() => {
    const savedCompare = localStorage.getItem('watsuBazaarCompare');
    if (savedCompare) {
      try {
        setCompareList(JSON.parse(savedCompare));
      } catch (e) {
        console.error('Failed to parse compare list from LocalStorage', e);
      }
    }
  }, []);

  // LocalStorage'a kaydetme
  useEffect(() => {
    localStorage.setItem('watsuBazaarCompare', JSON.stringify(compareList));
  }, [compareList]);

  const showToast = (message) => {
    setToast({ visible: true, message });
    const timer = setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 3000);
    return () => clearTimeout(timer);
  };

  const addToCompare = (product) => {
    if (compareList.some(item => item.id === product.id)) {
      // Zaten ekliyse çıkar
      removeFromCompare(product.id);
      return;
    }

    if (compareList.length >= 2) {
      showToast('En fazla 2 premium su markasını karşılaştırabilirsiniz.');
      return;
    }

    setCompareList(prev => [...prev, product]);
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        toast,
      }}
    >
      {children}
      
      {/* Premium Glassmorphic Toast Notification */}
      {toast.visible && (
        <div className="fixed top-24 right-6 z-[9999] bg-slate-900/80 backdrop-blur-md border border-white/10 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce text-xs font-black tracking-wide">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500/20 text-amber-400">⚠️</span>
          <span>{toast.message}</span>
        </div>
      )}
    </CompareContext.Provider>
  );
};
