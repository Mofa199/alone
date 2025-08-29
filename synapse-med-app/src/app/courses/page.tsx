import React from 'react';

const CoursesPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">My Course</h1>
      <p className="text-lg">
        Based on your profile, you are enrolled in the [User's Primary Field] curriculum.
      </p>
      <div className="mt-8 p-8 border-dashed border-2 border-gray-300 rounded-lg">
        <p className="text-center text-gray-500">
          A list of available modules (e.g., Anatomy, Physiology) will be displayed here.
        </p>
      </div>
    </div>
  );
};

export default CoursesPage;
