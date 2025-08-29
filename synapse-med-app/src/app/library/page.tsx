'use client';

import React, { useState } from 'react';

const LibraryPage = () => {
  const [activeTab, setActiveTab] = useState('Books');

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">Library</h1>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('Books')}
            className={`${
              activeTab === 'Books'
                ? 'border-secondary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Books
          </button>
          <button
            onClick={() => setActiveTab('Articles')}
            className={`${
              activeTab === 'Articles'
                ? 'border-secondary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Articles
          </button>
          <button
            onClick={() => setActiveTab('Magazines')}
            className={`${
              activeTab === 'Magazines'
                ? 'border-secondary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Magazines
          </button>
        </nav>
      </div>

      <div className="mt-8">
        {/* Placeholder for search and filter */}
        <div className="p-4 bg-gray-100 rounded-lg mb-8">
            <p className="text-gray-600">Search and filter controls will be here.</p>
        </div>

        {/* Content based on active tab */}
        <div className="p-8 border-dashed border-2 border-gray-300 rounded-lg">
            <p className="text-center text-gray-500">
                Content for '{activeTab}' will be displayed here.
            </p>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
