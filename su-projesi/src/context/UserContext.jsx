import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // --- 1. Başlangıç Değerlerini Yükleme (LocalStorage) ---
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('watsuUser');
    return saved ? JSON.parse(saved) : { name: 'Misafir Tüketici', isLoggedIn: false };
  });

  const [consumptionProfile, setConsumptionProfile] = useState(() => {
    const saved = localStorage.getItem('watsuConsumptionProfile');
    return saved || 'haftalik_1'; // haftalik_1, haftalik_2, gunluk_3
  });

  const [waterProgress, setWaterProgress] = useState(() => {
    const saved = localStorage.getItem('watsuWaterProgress');
    return saved ? parseInt(saved, 10) : 100;
  });

  const [deliveryPreferences, setDeliveryPreferences] = useState(() => {
    const saved = localStorage.getItem('watsuDeliveryPreferences');
    return saved ? JSON.parse(saved) : { noBell: false, callBefore: false, contactless: false };
  });

  const [showProgressWarning, setShowProgressWarning] = useState(false);

  // --- 2. Durum Değişikliklerini Kaydetme (LocalStorage) ---
  useEffect(() => {
    localStorage.setItem('watsuUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('watsuConsumptionProfile', consumptionProfile);
  }, [consumptionProfile]);

  useEffect(() => {
    localStorage.setItem('watsuWaterProgress', waterProgress.toString());
    // Su %20'nin altına inerse uyarıyı tetikle
    if (waterProgress < 20) {
      setShowProgressWarning(true);
    } else {
      setShowProgressWarning(false);
    }
  }, [waterProgress]);

  useEffect(() => {
    localStorage.setItem('watsuDeliveryPreferences', JSON.stringify(deliveryPreferences));
  }, [deliveryPreferences]);

  // --- 3. Aksiyon Fonksiyonları ---
  const login = (name) => {
    if (!name.trim()) return;
    setUser({ name: name.trim(), isLoggedIn: true });
  };

  const logout = () => {
    setUser({ name: 'Misafir Tüketici', isLoggedIn: false });
    setConsumptionProfile('haftalik_1');
    setWaterProgress(100);
    setDeliveryPreferences({ noBell: false, callBefore: false, contactless: false });
    localStorage.removeItem('watsuUser');
    localStorage.removeItem('watsuConsumptionProfile');
    localStorage.removeItem('watsuWaterProgress');
    localStorage.removeItem('watsuDeliveryPreferences');
  };

  const setProfile = (profileType) => {
    setConsumptionProfile(profileType);
  };

  const drinkWater = () => {
    let depletionAmount = 5; // haftalik_1 varsayılan
    if (consumptionProfile === 'haftalik_2') {
      depletionAmount = 10;
    } else if (consumptionProfile === 'gunluk_3') {
      depletionAmount = 15;
    }

    setWaterProgress((prev) => Math.max(0, prev - depletionAmount));
  };

  const refillWater = () => {
    setWaterProgress(100);
  };

  const updatePreferences = (newPrefs) => {
    setDeliveryPreferences((prev) => ({
      ...prev,
      ...newPrefs
    }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        consumptionProfile,
        waterProgress,
        deliveryPreferences,
        showProgressWarning,
        login,
        logout,
        setProfile,
        drinkWater,
        refillWater,
        updatePreferences
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
