import React from 'react';

const QuizBuilderPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Custom Quiz Builder</h1>
      <p className="text-lg">
        Create personalized quizzes to test your knowledge and track your performance.
      </p>
      <div className="mt-8 p-8 bg-white rounded-lg shadow">
        <fieldset disabled>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Select Topic</label>
              <select id="topic" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Anatomy</option>
                <option>Physiology</option>
                <option>Pharmacology</option>
              </select>
            </div>
            <div>
              <label htmlFor="numQuestions" className="block text-sm font-medium text-gray-700">Number of Questions</label>
              <input type="number" id="numQuestions" defaultValue={20} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Quiz
            </button>
          </div>
        </fieldset>
        <p className="text-center text-gray-500 text-xs mt-4">
          Quiz functionality is coming soon.
        </p>
      </div>
    </div>
  );
};

export default QuizBuilderPage;
