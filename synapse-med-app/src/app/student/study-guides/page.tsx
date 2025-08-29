'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface StudyGuide {
  id: string;
  title: string;
  summary: string;
}

const StudyGuidesPage = () => {
  const [guides, setGuides] = useState<StudyGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('/api/study-guides');
        if (!response.ok) {
          throw new Error('Failed to fetch study guides');
        }
        const data = await response.json();
        setGuides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading study guides...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Study Guides</h1>
      <p className="text-lg mb-8">
        Explore comprehensive study guides covering key topics and learning objectives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.length === 0 ? (
          <p>No study guides have been added yet.</p>
        ) : (
          guides.map((guide) => (
            <Link key={guide.id} href={`/student/study-guides/${guide.id}`} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold text-secondary mb-2">{guide.title}</h2>
              <p className="text-gray-600">{guide.summary}</p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyGuidesPage;
