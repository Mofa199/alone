import React from 'react';

const features = [
  { name: 'AI Helper', description: 'Instant answers and summaries from our AI assistant.' },
  { name: 'Interactive 3D Models', description: 'Explore anatomy and pharmacology in stunning 3D.' },
  { name: 'Gamification', description: 'Earn points, badges, and level up your knowledge.' },
  { name: 'Custom Quizzes', description: 'Build personalized quizzes to test your skills.' },
];

const WhatWeOffer = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-12">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold text-secondary mb-2">{feature.name}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
