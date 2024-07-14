import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const updateUsername = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    } else {
      setUsername('');
    }
  };

  useEffect(() => {
    updateUsername();
  }, []);

  return (
    <AuthContext.Provider value={{ username, updateUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
