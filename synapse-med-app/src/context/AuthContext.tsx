'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  role: 'student' | 'admin';
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for user data in cookie on initial load
    const userCookie = Cookies.get('synapse-med-user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set('synapse-med-auth', 'true', { expires: 7 }); // Expires in 7 days
    Cookies.set('synapse-med-user', JSON.stringify(userData), { expires: 7 });
    router.push('/'); // Redirect to homepage after login
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('synapse-med-auth');
    Cookies.remove('synapse-med-user');
    router.push('/auth'); // Redirect to auth page after logout
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
