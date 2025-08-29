'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Define types
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const POINTS_PER_LEVEL = 1000;

const DashboardPage = () => {
  const { user } = useAuth();
  const [allBadges, setAllBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const response = await fetch('/api/badges');
        const data = await response.json();
        setAllBadges(data);
      } catch (error) {
        console.error('Failed to fetch badges', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBadges();
  }, []);

  if (!user) {
    return <div className="text-center py-10">Loading user data...</div>;
  }

  const userBadges = allBadges.filter(badge => user.badgeIds.includes(badge.id));

  const currentLevelProgress = (user.points % POINTS_PER_LEVEL) / POINTS_PER_LEVEL * 100;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">My Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-secondary mb-4">My Progress</h2>
          <p className="text-lg">Level: <span className="font-bold">{user.level}</span></p>
          <p className="text-lg">Total Points: <span className="font-bold">{user.points}</span></p>

          <div className="mt-4">
            <p className="text-sm text-gray-600">Progress to Next Level</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
              <div
                className="bg-accent h-4 rounded-full"
                style={{ width: `${currentLevelProgress}%` }}
              ></div>
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">{user.points % POINTS_PER_LEVEL} / {POINTS_PER_LEVEL} points</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-secondary mb-4">My Badges</h2>
          {loading ? (
            <p>Loading badges...</p>
          ) : userBadges.length === 0 ? (
            <p>No badges earned yet. Keep learning!</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {userBadges.map(badge => (
                <div key={badge.id} className="text-center" title={`${badge.name}: ${badge.description}`}>
                  {/* Placeholder for badge icon */}
                  <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-xs">ICON</span>
                  </div>
                  <p className="text-sm mt-2 font-semibold">{badge.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
