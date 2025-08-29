'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-primary text-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-accent">
            Synapse Med
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-accent">Home</Link>
            {isAuthenticated && (
              <>
                <Link href="/dashboard" className="hover:text-accent">Dashboard</Link>
                <Link href="/topics" className="hover:text-accent">Topics</Link>
                <Link href="/student/question-bank" className="hover:text-accent">Question Bank</Link>
                <Link href="/student/study-guides" className="hover:text-accent">Study Guides</Link>
                <Link href="/student/quiz-builder" className="hover:text-accent">Quiz Builder</Link>
                {user?.role === 'admin' && (
                  <Link href="/admin" className="px-3 py-1 rounded bg-accent text-primary font-bold">Admin</Link>
                )}
                <button onClick={logout} className="hover:text-accent">Logout</button>
              </>
            )}
            {!isAuthenticated && (
              <Link href="/auth" className="hover:text-accent">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
