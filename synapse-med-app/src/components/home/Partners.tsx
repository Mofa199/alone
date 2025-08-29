import React from 'react';

const partners = [
  { name: 'MedSchool Inc.', logo: '/path/to/logo1.svg' },
  { name: 'Future Docs of America', logo: '/path/to/logo2.svg' },
  { name: 'Nursing Today', logo: '/path/to/logo3.svg' },
  { name: 'Pharma Solutions', logo: '/path/to/logo4.svg' },
];

const Partners = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-primary mb-12">Our Partners</h2>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((partner) => (
            <div key={partner.name} className="text-gray-500 text-xl font-semibold">
              {/* In a real app, you'd use an <Image> tag with the logo */}
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
