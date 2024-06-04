import React from "react";
import FramerMotion from "./FramerMotion";
const Community = () => {
  const communityPosts = [
    {
      id: 1,
      title: "Tips for Debugging React Components",
      content:
        "Here are some tips I've found helpful for debugging React components, including using React DevTools and adding console logs to track component state and props.",
      author: "John Doe",
      date: "June 1, 2024",
    },
    {
      id: 2,
      title: "Python Algorithm Optimization Techniques",
      content:
        "Sharing some advanced Python algorithm optimization techniques, such as using memoization and leveraging built-in libraries like itertools.",
      author: "Jane Smith",
      date: "May 30, 2024",
    },
    {
      id: 3,
      title: "Best Practices for Responsive Web Design",
      content:
        "Discussing the best practices and strategies for creating responsive web designs, including the use of flexible grid layouts and media queries.",
      author: "Alex Johnson",
      date: "May 28, 2024",
    },
    {
      id: 4,
      title: "Understanding JavaScript Closures",
      content:
        "An in-depth explanation of JavaScript closures, how they work, and common use cases such as data privacy and partial application.",
      author: "Chris Lee",
      date: "May 25, 2024",
    },
    {
      id: 5,
      title: "Introduction to Docker for Developers",
      content:
        "A beginner's guide to Docker, covering the basics of containerization, how to create Dockerfiles, and manage containers using Docker CLI.",
      author: "Morgan Brown",
      date: "May 23, 2024",
    },
    {
      id: 6,
      title: "Implementing Dark Mode in Web Applications",
      content:
        "Steps to implement dark mode in your web applications, including CSS variables, media queries, and user preference detection.",
      author: "Jordan White",
      date: "May 20, 2024",
    },
    {
      id: 7,
      title: "Using Git Effectively for Collaboration",
      content:
        "Tips and best practices for using Git in collaborative projects, including branching strategies, commit messages, and pull request reviews.",
      author: "Taylor Green",
      date: "May 18, 2024",
    },
    {
      id: 8,
      title: "Introduction to GraphQL",
      content:
        "An overview of GraphQL, its benefits over REST APIs, and how to set up a basic GraphQL server using Node.js and Express.",
      author: "Casey Blue",
      date: "May 15, 2024",
    },
  ];

  return (
    <FramerMotion>
      <section className="mt-10 text-white md:p-5 w-full ">
        <div className="container mx-auto w-full">
          <div className="w-full  mx-auto md:px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko uppercase">
              Community
            </h1>
            <FramerMotion>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative md:border-2 border-slate-600 md:p-5 w-full">
                {communityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:rotate-3 duration-500 cursor-pointer w-full"
                  >
                    <h2 className="text-2xl font-semibold mb-4 font-teko">
                      {post.title}
                    </h2>
                    <p className="text-sm md:lg font-jet">{post.content}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <p className="text-xs md:sm font-jet bg-gray-900 rounded-sm leading-normal p-2">
                        Posted by {post.author} on {post.date}
                      </p>
                      {/* Add additional actions or metadata here */}
                    </div>
                  </div>
                ))}
              </div>
            </FramerMotion>
          </div>
        </div>
      </section>
    </FramerMotion>
  );
};

export default Community;
