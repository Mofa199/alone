'use client';

import React from 'react';

// Define types
interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  rationale: string;
}

interface QuizResultsProps {
  questions: Question[];
  userAnswers: (number | null)[];
  score: number;
  onRestart: () => void;
}

const QuizResults = ({ questions, userAnswers, score, onRestart }: QuizResultsProps) => {
  return (
    <div className="mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-primary mb-4">Quiz Complete!</h2>
      <p className="text-xl text-center text-gray-700 mb-8">
        Your Score: <span className="font-bold text-secondary">{score} / {questions.length}</span>
      </p>

      <div className="space-y-6">
        {questions.map((question, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === question.correctAnswerIndex;
          return (
            <div key={question.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
              <p className="font-semibold">{index + 1}. {question.questionText}</p>
              <div className="mt-2 text-sm space-y-2">
                <p>Your answer: <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>{userAnswer !== null ? question.options[userAnswer] : 'Not answered'}</span></p>
                {!isCorrect && <p>Correct answer: <span className="text-green-700">{question.options[question.correctAnswerIndex]}</span></p>}
                <div className="mt-2 p-2 bg-gray-100 rounded">
                    <p className="font-bold">Rationale:</p>
                    <p className="text-gray-600">{question.rationale}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-lg bg-primary text-white font-bold hover:bg-secondary transition-colors"
        >
          Take Another Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
