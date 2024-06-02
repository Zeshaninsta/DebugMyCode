import React from "react";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <div className="container mx-auto py-12">
        <h2 className="text-4xl font-bold text-center mb-8">
          About DebugMyCode
        </h2>
        <p className="text-lg leading-8">
          DebugMyCode aims to provide a more focused and streamlined experience
          specifically tailored for collaborative code debugging and review. By
          reimagining the user interface, interaction model, and feature set, we
          aim to offer a more efficient and effective platform for developers
          seeking assistance with debugging their code.
        </p>
        <p className="text-lg leading-8 mt-4">
          Our mission is to connect developers and create a community where
          coding issues can be solved collaboratively. We believe in the power
          of community and collective problem-solving to overcome coding
          challenges.
        </p>
      </div>
    </div>
  );
};

export default About;
