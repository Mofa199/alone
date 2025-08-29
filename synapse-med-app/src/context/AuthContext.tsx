'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type User = {
  name: string;
  email: string;
  role: 'student' | 'admin';
  points: number;
  level: number;
  badgeIds: string[];
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  addPoints: (points: number) => void;
  awardBadge: (badgeId: string) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const POINTS_PER_LEVEL = 1000;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get('synapse-med-user');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    Cookies.set('synapse-med-auth', 'true', { expires: 7 });
    Cookies.set('synapse-med-user', JSON.stringify(userData), { expires: 7 });
    router.push('/');
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('synapse-med-auth');
    Cookies.remove('synapse-med-user');
    router.push('/auth');
  };

  const updateUser = (updatedUser: User) => {
    // Level up check
    const nextLevelThreshold = updatedUser.level * POINTS_PER_LEVEL;
    if (updatedUser.points >= nextLevelThreshold) {
      updatedUser.level += 1;
      // You could add a notification here
    }

    // Badge unlock check for "Point Scholar"
    if (updatedUser.points >= 1000 && !updatedUser.badgeIds.includes('badge_point_scholar')) {
      updatedUser.badgeIds.push('badge_point_scholar');
    }

    setUser(updatedUser);
    Cookies.set('synapse-med-user', JSON.stringify(updatedUser), { expires: 7 });
  };

  const addPoints = (points: number) => {
    if (user) {
      updateUser({ ...user, points: user.points + points });
    }
  };

  const awardBadge = (badgeId: string) => {
    if (user && !user.badgeIds.includes(badgeId)) {
      updateUser({ ...user, badgeIds: [...user.badgeIds, badgeId] });
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, addPoints, awardBadge, isAuthenticated }}>
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
