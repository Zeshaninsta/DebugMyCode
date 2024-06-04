import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import FramerMotion from "./FramerMotion";

const testimonialsData = [
  {
    id: 1,
    name: "Alice",
    message:
      "This platform has significantly improved my productivity and efficiency!",
  },
  {
    id: 2,
    name: "Bob",
    message: "A wonderful experience, the support team is always helpful!",
  },
  {
    id: 3,
    name: "Charlie",
    message: "The best platform I have used for project management!",
  },
  {
    id: 4,
    name: "David",
    message: "Highly recommend to anyone looking to streamline their workflow.",
  },
  {
    id: 5,
    name: "Eva",
    message: "Amazing features and an intuitive interface. Love it!",
  },
  {
    id: 6,
    name: "Frank",
    message: "It has made collaboration with my team so much easier.",
  },
  {
    id: 7,
    name: "Grace",
    message: "A must-have tool for any serious professional.",
  },
  {
    id: 8,
    name: "Hank",
    message: "The updates and new features are always exciting!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) =>
          (prevIndex + (isMobile ? 1 : 4)) % testimonialsData.length
      );
    }, 5000); // Change every 5 seconds

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

  const getDisplayedTestimonials = () => {
    if (isMobile) {
      return [testimonialsData[currentIndex % testimonialsData.length]];
    } else {
      const end = currentIndex + 4;
      return testimonialsData
        .slice(currentIndex, end)
        .concat(testimonialsData.slice(0, end % testimonialsData.length))
        .slice(0, 4);
    }
  };

  const displayedTestimonials = getDisplayedTestimonials();

  return (
    <FramerMotion>
      <section className=" text-white w-full">
        <div className="mx-auto w-full md:w-[80%] mt-5">
          <div className=" mx-auto p-5 border-2 border-slate-700">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko">
              Testimonials
            </h1>
            <div className="bg-gray-900 p-5 rounded-xl overflow-hidden relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform duration-1000 ease-in-out">
                {displayedTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="p-6 relative">
                    <div className="w-24 h-24 bg-transparent border border-blue-500 absolute top-0 left-0 z-10"></div>
                    <div className="w-24 h-24 bg-transparent border border-blue-500 absolute bottom-0 right-0 z-10 "></div>
                    <div className="z-20 relative bg-transparent backdrop-blur-sm rounded-lg shadow-lg p-6  border border-blue-500 h-[200px] hover:scale-105 duration-500 cursor-pointer">
                      <div className="flex flex-col items-start mb-4">
                        <div className="flex justify-center items-center border-b border-red-300 my-auto mb-2 gap-2">
                          <FaUser className="text-lg rounded-full" />
                          <p className="text-lg font-semibold font-rubik">
                            {testimonial.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-300 mb-2 font-jet">
                            {testimonial.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default Testimonials;
