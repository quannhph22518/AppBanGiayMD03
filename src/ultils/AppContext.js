
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCheckGetStarted, setIsCheckGetStarted] = useState(false);

  return (
    <AppContext.Provider value={{ isCheckGetStarted, setIsCheckGetStarted }}>
      {children}
    </AppContext.Provider>
  );
};
