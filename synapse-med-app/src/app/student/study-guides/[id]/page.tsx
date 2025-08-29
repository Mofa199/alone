'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface StudyGuide {
  id: string;
  title: string;
  summary: string;
  objectives: string[];
  content: string;
}

const StudyGuideDetailPage = () => {
  const [guide, setGuide] = useState<StudyGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchGuide = async () => {
        try {
          const response = await fetch(`/api/study-guides/${id}`);
          if (!response.ok) {
            throw new Error('Study guide not found');
          }
          const data = await response.json();
          setGuide(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchGuide();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading study guide...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!guide) {
    return <div className="text-center py-10">Study guide not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white p-8 rounded-lg shadow-lg">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-4xl font-bold text-primary">{guide.title}</h1>
          <p className="text-lg text-gray-600 mt-2">{guide.summary}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Learning Objectives</h2>
          <ul className="list-disc list-inside space-y-2">
            {guide.objectives.map((obj, index) => (
              <li key={index}>{obj}</li>
            ))}
          </ul>
        </section>

        <section className="prose max-w-none">
          <h2 className="text-2xl font-bold text-primary mb-4">Content</h2>
          {/* Using dangerouslySetInnerHTML is not ideal, but for this mock version it's okay.
              A real implementation would use a Markdown parser like 'react-markdown'. */}
          <div dangerouslySetInnerHTML={{ __html: guide.content.replace(/\n/g, '<br />') }} />
        </section>
      </article>
    </div>
  );
};

export default StudyGuideDetailPage;
