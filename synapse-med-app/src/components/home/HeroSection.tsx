import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-primary text-white text-center py-20">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold mb-4">
          Connect. Learn. Master Medicine.
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Your personalized journey to medical excellence starts here.
        </p>
        <div className="w-full h-64 bg-secondary rounded-lg flex items-center justify-center">
          <p className="text-white">[Placeholder for 3D Animation]</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
