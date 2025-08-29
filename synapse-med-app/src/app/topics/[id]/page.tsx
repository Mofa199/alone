'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Topic {
  id: string;
  title: string;
  summary: string;
  content: string;
  module: string;
  curriculum: string;
  imageUrls: string[];
  videoUrl: string;
  pdfUrl: string;
  keyTerms: string[];
  mnemonic: string;
}

const TopicDetailPage = () => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      const fetchTopic = async () => {
        try {
          const response = await fetch(`/api/topics/${id}`);
          if (!response.ok) {
            throw new Error('Topic not found');
          }
          const data = await response.json();
          setTopic(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      };
      fetchTopic();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading topic...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (!topic) {
    return <div className="text-center py-10">Topic not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="bg-white p-8 rounded-lg shadow-lg">
        <header className="mb-8 border-b pb-4">
            <p className="text-sm text-gray-500">{topic.curriculum} &gt; {topic.module}</p>
            <h1 className="text-4xl font-bold text-primary mt-2">{topic.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{topic.summary}</p>
        </header>

        <section className="prose max-w-none">
          <p>{topic.content}</p>
        </section>

        {topic.imageUrls && topic.imageUrls.length > 0 && (
            <section className="mt-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Illustrations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topic.imageUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Illustration ${index + 1}`} className="rounded-lg shadow-md" />
                    ))}
                </div>
            </section>
        )}

        {topic.videoUrl && (
            <section className="mt-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Related Video</h3>
                <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${topic.videoUrl.split('v=')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                ></iframe>
            </section>
        )}

        {topic.mnemonic && (
            <section className="mt-8 p-4 bg-accent bg-opacity-20 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Mnemonic</h3>
                <p>{topic.mnemonic}</p>
            </section>
        )}

        <footer className="mt-8 border-t pt-4 flex justify-between items-center">
            {topic.pdfUrl && <a href={topic.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline">Download PDF</a>}
            <div>
                <p className="text-sm text-gray-500">Key Terms: {topic.keyTerms.join(', ')}</p>
            </div>
        </footer>
      </article>
    </div>
  );
};

export default TopicDetailPage;
