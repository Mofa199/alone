'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  summary: string;
  module: string;
}

const TopicsListPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading topics...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">All Topics</h1>
      {topics.length === 0 ? (
        <p>No topics have been added yet.</p>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold text-secondary">{topic.title}</h2>
              <p className="text-sm text-gray-500 mb-2">Module: {topic.module}</p>
              <p className="text-gray-700">{topic.summary}</p>
               {/* Link to detail page will be added in the next step */}
              <Link href={`/topics/${topic.id}`} className="text-accent hover:underline mt-4 inline-block">
                Read More
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicsListPage;
