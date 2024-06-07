import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import PageTransition from "./PageTransition";
import FramerMotion from "./FramerMotion";

const futurePlans = [
  {
    id: 1,
    title: "Real-Time Q&A",
    description:
      "Providing real-time question asking and answering to ensure developers get the help they need instantly.",
    image:
      "https://img.freepik.com/free-psd/question-mark-confirmed-signs-false-rejection-icon-3d-render-isolated_47987-11659.jpg?t=st=1717757292~exp=1717760892~hmac=4acca03d2efeb60e1c4d3d77beade352c8a03d879f96e21d06b59b018f00722f&w=996", // Placeholder image
  },
  {
    id: 2,
    title: "User Authentication",
    description:
      "Implementing robust user authentication to ensure secure and personalized user experiences.",
    image:
      "https://img.freepik.com/free-vector/phishing-account-concept_23-2148533311.jpg?t=st=1717757370~exp=1717760970~hmac=a7879479aa33392fb9e5e090276e61e790e4ef381cdf955aa0b41122e90525ec&w=826", // Placeholder image
  },
  {
    id: 3,
    title: "Profile Management",
    description:
      "Allowing users to manage their profiles, track their activity, and showcase their contributions.",
    image:
      "https://img.freepik.com/free-vector/job-interview-vector_23-2147499572.jpg?t=st=1717757536~exp=1717761136~hmac=d88e0b238c3e1d30fe4e9c032088c4734f4ae2305289464adb68224638a42cd7&w=826", // Placeholder image
  },
  {
    id: 4,
    title: "Enhanced Collaboration Tools",
    description:
      "Introducing advanced tools for team collaboration, including live code sharing and pair programming features.",
    image:
      "https://img.freepik.com/free-vector/cogwheel-gears-portraying-teamwork-concept_53876-26681.jpg?t=st=1717757737~exp=1717761337~hmac=8568ddfd2ef6fcb45f37530801bb4bc5b38a214fb100cdf3a6250be8d9a52199&w=826", // Placeholder image
  },
];

const futureWork = [
  {
    id: 5,
    title: "AI-Powered Code Suggestions",
    description:
      "Implementing AI to provide real-time code suggestions and optimizations.",
    execption: "Coming soon!",
    image:
      "https://img.freepik.com/free-vector/robotic-artificial-intelligence-technology-smart-lerning-from-bigdata_1150-48136.jpg?t=st=1717757616~exp=1717761216~hmac=be5208442716012f1bb7da332976597e96a3a94beab4fec5181fba9ee2b9cc9d&w=996", // Placeholder image
  },
  {
    id: 6,
    title: "Expanded Language Support",
    description:
      "Adding support for more programming languages to accommodate a wider range of developers.",
    execption: "Coming soon!",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-translation-services-landing-page_23-2151180564.jpg?t=st=1717757673~exp=1717761273~hmac=3131d2767a3ef435cdc8acca27ee8ddd21cc6351b33296800b27ec1d3b8f47a4&w=826", // Placeholder image
  },

  {
    id: 7,
    title: "Comprehensive Tutorials",
    description:
      "Building a rich library of tutorials and courses to help developers learn new skills and technologies.",
    execption: "Coming soon!",
    image:
      "https://img.freepik.com/free-vector/online-education-student-workplace-with-computer-table-pc-monitor-armchair-home-working-place-desk_33099-2176.jpg?t=st=1717757885~exp=1717761485~hmac=b55b7c54b2f4514f34375e05e38f7e5e288b5e1f607ac79fb6068cb9581a925a&w=1380", // Placeholder image
  },
  {
    id: 8,
    title: "Community Events",
    description:
      "Hosting regular webinars, hackathons, and meetups to foster community engagement and learning.",
    execption: "Coming soon!",
    image:
      "https://img.freepik.com/free-photo/caucasian-software-developer-signaling-screen-data-breach-deactivated-security-system-tech-engineer-observing-multiple-system-security-breaches-caused-by-overloaded-storage-servers_482257-40529.jpg?t=st=1717757965~exp=1717761565~hmac=0aa401aca138478989cdf19bfd68eaaaca9d2aacfdbd9dc1038fe5f2708d4acd&w=1380",
    //image: "https://via.placeholder.com/400x300", // Placeholder image
  },
];

const Future = () => {
  return (
    <FramerMotion>
      <section className="text-white mt-10 w-full min-h-screen">
        <div className="container mx-auto w-full ">
          <h1 className="text-4xl md:text-6xl font-bold mb-2 md::mb-10 text-center font-teko">
            DebugMyCode Futures
          </h1>
          <p className="text-md md:text-lg md:text-xl mb-8 text-center font-rubik">
            We are constantly evolving to bring you the best tools and resources
            for your development journey. Here are some exciting features we are
            working on:
          </p>
          <div className="w-full bg-gradient-to-r from-gray-800 via-slate-900 to-gray-800 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
            {futurePlans.map((plan) => (
              <FramerMotion>
                <div
                  key={plan.id}
                  className="w-full p-6 bg-gray-900 rounded-lg shadow-lg cursor-pointer transform hover:scale-105 transition duration-500 ease-in-out"
                >
                  <img
                    src={plan.image}
                    alt={plan.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-2xl font-semibold  mb-2 md:mb-4 text-blue-400">
                    {plan.title}
                  </h2>
                  <p className="text-gray-300 mb-2 font-jet text-sm md:text-lg w-full ">
                    {plan.description}
                  </p>
                  <code className="text-red-400 text-xs font-jet">
                    {plan.execption}
                  </code>
                  <FaCheckCircle className="text-green-500 text-3xl mt-2" />
                </div>
              </FramerMotion>
            ))}
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl mt-10 font-bold mb-10 text-center font-teko">
              Future Work
            </h1>
            <div className="bg-gradient-to-r from-gray-800 via-slate-900 to-gray-800 p-5 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5">
              {futureWork.map((plan) => (
                <FramerMotion>
                  <div
                    key={plan.id}
                    className="p-6 bg-gray-900 rounded-lg shadow-lg bg-gradient-to-r from-gray-800 via-slate-900 to-gray-800 p-5 transform hover:scale-105 transition duration-500 ease-in-out"
                  >
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h2 className="text-2xl font-semibold mb-2 md:mb-4 text-blue-400">
                      {plan.title}
                    </h2>
                    <p className="text-gray-300 mb-2 font-jet text-sm md:text-md">
                      {plan.description}
                    </p>
                    <code className="text-red-400 text-xs font-jet">
                      {plan.execption}
                    </code>
                    <FaCheckCircle className="text-green-500 text-3xl mt-2" />
                  </div>
                </FramerMotion>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default Future;
