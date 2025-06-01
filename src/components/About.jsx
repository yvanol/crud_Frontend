import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-base-content">About Product Manager</h1>
      <div className="max-w-2xl text-base-content">
        <p className="mb-4">
          Product Manager is a simple and intuitive application designed to help you manage your product inventory efficiently.
        </p>
        <p className="mb-4">
          With features like adding, updating, and deleting products, you can keep track of your inventory with ease. Our goal is to provide a seamless experience for small businesses and individuals.
        </p>
        <p>
          Built with modern web technologies, Product Manager ensures reliability and performance, whether you're running it locally or in the cloud.
        </p>
      </div>
    </div>
  );
};

export default About;