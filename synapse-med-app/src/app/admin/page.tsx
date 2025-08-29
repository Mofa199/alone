import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users, content, and more.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/admin/add-topic" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-secondary hover:underline">Add New Topic</a>
        <a href="/admin/add-question" className="block p-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-secondary hover:underline">Add New Question</a>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
