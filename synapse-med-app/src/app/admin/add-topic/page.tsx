'use client';

import React, { useState } from 'react';

const AddTopicPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    curriculum: 'Medical Student',
    module: '',
    imageUrls: '',
    videoUrl: '',
    pdfUrl: '',
    keyTerms: '',
    mnemonic: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.title || !formData.content) {
      alert('Title and Content are required.');
      return;
    }

    const payload = {
      ...formData,
      imageUrls: formData.imageUrls.split('\n').filter(url => url.trim() !== ''),
      keyTerms: formData.keyTerms.split(',').map(term => term.trim()),
    };

    try {
      const response = await fetch('/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Topic added successfully!');
        // Optionally, reset the form
        setFormData({
            title: '', summary: '', content: '', curriculum: 'Medical Student', module: '',
            imageUrls: '', videoUrl: '', pdfUrl: '', keyTerms: '', mnemonic: '',
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add topic: ${errorData.message}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while submitting the topic.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Topic</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Topic Title</label>
          <input type="text" id="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea id="summary" value={formData.summary} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Main Content (supports text, tables, and image URLs)</label>
          <textarea id="content" value={formData.content} onChange={handleChange} rows={10} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
            <label htmlFor="curriculum" className="block text-sm font-medium text-gray-700">Curriculum</label>
            <select id="curriculum" value={formData.curriculum} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Medical Student</option>
                <option>Nursing Student</option>
                <option>Pharmacy Student</option>
                <option>All Curriculums</option>
            </select>
        </div>

        <div>
          <label htmlFor="module" className="block text-sm font-medium text-gray-700">Module</label>
          <input type="text" id="module" value={formData.module} onChange={handleChange} placeholder="e.g., Anatomy" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">Image URLs (one per line)</label>
          <textarea id="imageUrls" value={formData.imageUrls} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">YouTube Video URL</label>
          <input type="url" id="videoUrl" value={formData.videoUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700">Downloadable PDF URL</label>
          <input type="url" id="pdfUrl" value={formData.pdfUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="keyTerms" className="block text-sm font-medium text-gray-700">Key Terms for Flashcards (comma-separated)</label>
          <input type="text" id="keyTerms" value={formData.keyTerms} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="mnemonic" className="block text-sm font-medium text-gray-700">Mnemonic</label>
          <textarea id="mnemonic" value={formData.mnemonic} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save Topic
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTopicPage;
