'use client';

import React, { useState } from 'react';

const AddStudyGuidePage = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    objectives: '',
    content: '',
    topicId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Title and Content are required.');
      return;
    }

    const payload = {
      ...formData,
      objectives: formData.objectives.split('\n').filter(obj => obj.trim() !== ''),
    };

    try {
      const response = await fetch('/api/study-guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Study Guide added successfully!');
        setFormData({ title: '', summary: '', objectives: '', content: '', topicId: '' });
      } else {
        const errorData = await response.json();
        alert(`Failed to add study guide: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred while submitting the study guide.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Study Guide</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Study Guide Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary / Description</label>
          <textarea id="summary" value={formData.summary} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label htmlFor="objectives" className="block text-sm font-medium text-gray-700">Learning Objectives (one per line)</label>
          <textarea id="objectives" value={formData.objectives} onChange={handleChange} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Main Content</label>
          <textarea id="content" value={formData.content} onChange={handleChange} rows={15} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label htmlFor="topicId" className="block text-sm font-medium text-gray-700">Associated Topic ID (optional)</label>
          <input type="text" id="topicId" value={formData.topicId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary">
            Save Study Guide
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudyGuidePage;
