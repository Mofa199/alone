'use client';

import React, { useState } from 'react';

// Define types for clarity
interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  rationale: string;
}

interface QuizInterfaceProps {
  questions: Question[];
  onQuizComplete: (score: number, userAnswers: (number | null)[]) => void;
}

const QuizInterface = ({ questions, onQuizComplete }: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (userAnswers[i] === questions[i].correctAnswerIndex) {
        score++;
      }
    }
    onQuizComplete(score, userAnswers);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="mt-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <p className="text-sm text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        <h2 className="text-2xl font-semibold mt-2">{currentQuestion.questionText}</h2>
      </div>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedAnswer === index
                ? 'bg-secondary text-white border-secondary'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
          Previous
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button onClick={handleSubmit} className="px-6 py-2 rounded bg-primary text-white hover:bg-secondary">
            Submit Quiz
          </button>
        ) : (
          <button onClick={handleNext} className="px-6 py-2 rounded bg-primary text-white hover:bg-secondary">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
