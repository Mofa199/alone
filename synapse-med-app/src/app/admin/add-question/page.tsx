'use client';

import React, { useState } from 'react';

const AddQuestionPage = () => {
  const [formData, setFormData] = useState({
    questionText: '',
    rationale: '',
    topicId: '',
  });
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.questionText || options.some(opt => opt.trim() === '')) {
      alert('Please fill out the question text and all option fields.');
      return;
    }

    const payload = {
      ...formData,
      options,
      correctAnswerIndex,
    };

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Question added successfully!');
        // Reset form
        setFormData({ questionText: '', rationale: '', topicId: '' });
        setOptions(['', '', '', '']);
        setCorrectAnswerIndex(0);
      } else {
        const errorData = await response.json();
        alert(`Failed to add question: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the question.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Question</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">Question Text</label>
          <textarea id="questionText" value={formData.questionText} onChange={handleFormChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">Options (select the correct answer)</label>
            <div className="mt-2 space-y-4">
                {options.map((option, index) => (
                    <div key={index} className="flex items-center">
                        <input
                            type="radio"
                            name="correctAnswer"
                            id={`option-radio-${index}`}
                            checked={correctAnswerIndex === index}
                            onChange={() => setCorrectAnswerIndex(index)}
                            className="h-4 w-4 text-secondary border-gray-300 focus:ring-secondary"
                        />
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            className="ml-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                            placeholder={`Option ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
        </div>

        <div>
          <label htmlFor="rationale" className="block text-sm font-medium text-gray-700">Rationale</label>
          <textarea id="rationale" value={formData.rationale} onChange={handleFormChange} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Explain why the correct answer is correct."></textarea>
        </div>

        <div>
          <label htmlFor="topicId" className="block text-sm font-medium text-gray-700">Associated Topic ID</label>
          <input type="text" id="topicId" value={formData.topicId} onChange={handleFormChange} placeholder="e.g., topic_1678886400000" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary">
            Save Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestionPage;
