'use client';

import React, { useState, useEffect } from 'react';

interface Question {
  id: string;
  questionText: string;
  topicId: string;
}

const QuestionBankPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading question bank...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Question Bank</h1>
      <p className="text-lg mb-8">
        Browse all available questions. Use the quiz builder to test your knowledge!
      </p>
      <div className="space-y-4">
        {questions.length === 0 ? (
          <p>No questions have been added yet.</p>
        ) : (
          questions.map((question) => (
            <div key={question.id} className="bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">{question.questionText}</p>
              <p className="text-sm text-gray-500 mt-1">Topic ID: {question.topicId || 'General'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionBankPage;
