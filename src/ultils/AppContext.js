import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCheckGetStarted, setIsCheckGetStarted] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null); // Thêm biến userId để lưu ID của người dùng

  return (
    <AppContext.Provider value={{ isCheckGetStarted, setIsCheckGetStarted, token, setToken, userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};
