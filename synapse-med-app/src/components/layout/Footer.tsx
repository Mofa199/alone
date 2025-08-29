import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Synapse Med. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
            {/* Social media links can go here */}
            <a href="#" className="hover:text-accent">Twitter</a>
            <a href="#" className="hover:text-accent">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
