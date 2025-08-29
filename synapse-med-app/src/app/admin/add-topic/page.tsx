'use client';

import React from 'react';

const AddTopicPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Add New Topic</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Topic Title</label>
          <input type="text" id="title" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Summary</label>
          <textarea id="summary" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">Main Content (supports text, tables, and image URLs)</label>
          <textarea id="content" rows={10} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
        </div>

        <div>
            <label htmlFor="curriculum" className="block text-sm font-medium text-gray-700">Curriculum</label>
            <select id="curriculum" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                <option>Medical Student</option>
                <option>Nursing Student</option>
                <option>Pharmacy Student</option>
                <option>All Curriculums</option>
            </select>
        </div>

        <div>
          <label htmlFor="module" className="block text-sm font-medium text-gray-700">Module</label>
          <input type="text" id="module" placeholder="e.g., Anatomy" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">Image URLs (one per line)</label>
          <textarea id="imageUrls" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
        </div>

        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700">YouTube Video URL</label>
          <input type="url" id="videoUrl" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="pdfUrl" className="block text-sm font-medium text-gray-700">Downloadable PDF URL</label>
          <input type="url" id="pdfUrl" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="keyTerms" className="block text-sm font-medium text-gray-700">Key Terms for Flashcards (comma-separated)</label>
          <input type="text" id="keyTerms" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>

        <div>
          <label htmlFor="mnemonic" className="block text-sm font-medium text-gray-700">Mnemonic</label>
          <textarea id="mnemonic" rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
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
