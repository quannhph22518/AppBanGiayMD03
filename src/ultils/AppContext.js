import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isCheckGetStarted, setIsCheckGetStarted] = useState(false);
  const [isCheckLogin, setIsCheckLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadInitialState = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedIsCheckLogin = await AsyncStorage.getItem('isCheckLogin');
        
        if (storedToken && storedUserId && storedIsCheckLogin === 'true') {
          setToken(storedToken);
          setUserId(storedUserId);
          setIsCheckLogin(true);
        }
      } catch (error) {
        console.error('Failed to load initial state', error);
      }
    };

    loadInitialState();
  }, []);

  return (
    <AppContext.Provider value={{ isCheckGetStarted, setIsCheckGetStarted, token, setToken, userId, setUserId, isCheckLogin, setIsCheckLogin }}>
      {children}
    </AppContext.Provider>
  );
};
