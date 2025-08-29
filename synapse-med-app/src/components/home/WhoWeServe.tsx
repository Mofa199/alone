import React from 'react';

const studentTypes = [
  { name: 'Medical Students', link: '#' },
  { name: 'Nursing Students', link: '#' },
  { name: 'Pharmacy Students', link: '#' },
];

const WhoWeServe = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-12">Who We Serve</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studentTypes.map((student) => (
            <a key={student.name} href={student.link} className="block p-8 bg-white rounded-lg shadow-lg hover:bg-secondary hover:text-white transition-colors">
              <h3 className="text-2xl font-bold">{student.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeServe;
