import React from 'react';

const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard. Here you can manage users, content, and more.</p>
      <div className="mt-6">
        <a href="/admin/add-topic" className="text-secondary hover:underline">Add New Topic</a>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
