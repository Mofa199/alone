'use client';

import React, { useState } from 'react';

const WordOfTheDay = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="py-20">
      <div className="container mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">Word of the Day</h2>
        <div
          className="w-full max-w-2xl h-48 cursor-pointer"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className="relative w-full h-full transition-transform duration-500"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
          >
            {/* Front of the card */}
            <div className="absolute w-full h-full bg-accent text-primary p-8 rounded-lg shadow-xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-center">
                <h3 className="text-3xl font-bold">Cardiology</h3>
                <p className="mt-2">(Click to reveal definition)</p>
              </div>
            </div>

            {/* Back of the card */}
            <div className="absolute w-full h-full bg-secondary text-white p-8 rounded-lg shadow-xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
              <p className="text-center text-lg">
                The branch of medicine that deals with diseases and abnormalities of the heart.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordOfTheDay;
