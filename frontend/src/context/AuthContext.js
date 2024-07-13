// src/context/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data from an API or local storage
    const fetchUser = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    // Perform login logic and set user state
    const userData = await loginUser(credentials);
    setUser(userData);
    router.push('/');
  };

  const logout = () => {
    // Perform logout logic and clear user state
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

const fetchUserData = async () => {
  // Fetch user data logic
  return { role: 'admin' }; // Example user data
};

const loginUser = async (credentials) => {
  // Login logic
  return { role: 'admin' }; // Example user data
};
