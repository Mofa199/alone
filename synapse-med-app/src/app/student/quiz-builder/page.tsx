'use client';

import React, { useState, useEffect } from 'react';
import QuizInterface from '@/components/quiz/QuizInterface';
import QuizResults from '@/components/quiz/QuizResults';
import { useAuth } from '@/context/AuthContext';

// Define types
interface Topic {
  id: string;
  title: string;
}
interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  rationale: string;
  topicId: string;
}

const QuizBuilderPage = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [loading, setLoading] = useState(true);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);

  const [quizState, setQuizState] = useState<'configuring' | 'in_progress' | 'complete'>('configuring');
  const { addPoints, awardBadge } = useAuth();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/topics');
        const data = await response.json();
        setTopics(data);
        if (data.length > 0) {
          setSelectedTopic(data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch topics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  const handleStartQuiz = async () => {
    try {
      const response = await fetch('/api/questions');
      const allQuestions: Question[] = await response.json();
      const filteredQuestions = allQuestions.filter(q => q.topicId === selectedTopic);
      const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, numQuestions);

      if (selected.length === 0) {
        alert('No questions found for this topic. Please select another.');
        return;
      }

      setQuizQuestions(selected);
      setQuizState('in_progress');
    } catch (error) {
      alert('Failed to load questions for the quiz.');
    }
  };

  const handleQuizComplete = async (finalScore: number, finalAnswers: (number | null)[]) => {
    setScore(finalScore);
    setUserAnswers(finalAnswers);
    setQuizState('complete');

    try {
      const response = await fetch('/api/user/update-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ score: finalScore }),
      });
      const data = await response.json();
      if (data.success) {
        addPoints(data.pointsAwarded);
        awardBadge('badge_first_quiz'); // Award the "First Steps" badge
        console.log(`${data.pointsAwarded} points awarded!`);
      }
    } catch (error) {
      console.error("Failed to update points", error);
    }
  };

  const handleRestart = () => {
    setQuizState('configuring');
    setQuizQuestions([]);
    setUserAnswers([]);
    setScore(0);
  };

  if (quizState === 'in_progress') {
    return <QuizInterface questions={quizQuestions} onQuizComplete={handleQuizComplete} />;
  }

  if (quizState === 'complete') {
    return <QuizResults questions={quizQuestions} userAnswers={userAnswers} score={score} onRestart={handleRestart} />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Custom Quiz Builder</h1>
      <p className="text-lg">
        Create personalized quizzes to test your knowledge and track your performance.
      </p>
      <div className="mt-8 p-8 bg-white rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Select Topic</label>
            <select
              id="topic"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              disabled={loading || topics.length === 0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              {loading ? (
                <option>Loading topics...</option>
              ) : (
                topics.map(topic => <option key={topic.id} value={topic.id}>{topic.title}</option>)
              )}
            </select>
          </div>
          <div>
            <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">Number of Questions</label>
            <input
              type="number"
              id="numQuestions"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              min="1"
              max="50"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleStartQuiz}
            disabled={loading || topics.length === 0}
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary disabled:bg-gray-400"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilderPage;
