import HeroSection from '@/components/home/HeroSection';
import Partners from '@/components/home/Partners';
import WhatWeOffer from '@/components/home/WhatWeOffer';
import WhoWeServe from '@/components/home/WhoWeServe';
import WordOfTheDay from '@/components/home/WordOfTheDay';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WhatWeOffer />
      <WhoWeServe />
      <WordOfTheDay />
      <Partners />
    </div>
  );
}
