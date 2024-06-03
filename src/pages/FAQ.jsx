// QA.jsx

import React from "react";
import { FaUser } from "react-icons/fa";

const QA = () => {
  return (
    <section className="text-white w-full mt-5">
      <div className="mx-auto w-full">
        <div className="w-full md:w-[80%] mx-auto md:px-4 mt-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center font-teko uppercase">
            Ask and Get Answers
          </h1>
          <div className="w-full mx-auto bg-gray-900 backdrop-blur-sm p-5 rounded-xl border border-slate-600">
            {/* User 1 */}
            <div className="w-full  flex flex-col md:flex-row items-start mb-8 rounded-md cursor-pointer hover:translate-x-2 duration-500">
              <div className="flex justify-center items-center gap-2  text-md">
                <FaUser className="text-md rounded-full" />
                <p className="text-lg font-semibold">Betelehem</p>
              </div>
              <div className="w-full">
                <p className="text-gray-300 mb-2 text-sm md:text-md lg:text-lg">
                  Posted a question - 5 minutes ago
                </p>
                <p className="mb-4 text-sm md:text-md lg:text-lg">
                  I'm trying to optimize my Python code for generating Fibonacci
                  numbers, but it's running very slow for large inputs. Can
                  someone help me improve it?
                </p>
                <div className="w-full border border-gray-600 p-4 rounded-md bg-[#050f14]">
                  {/* Python code */}
                  <p className="text-green-500">// Python code</p>
                  <pre className="text-gray-300 overflow-x-scroll w-full">
                    <code className="w-full">
                      {`def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)
    
print(fibonacci(35))`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
            {/* User 2 (Reply) */}
            <div className="ml-0 md:ml-8 w-full cursor-pointer hover:translate-x-2 duration-500 bg-gray-900 md:p-5 rounded-md">
              <div className="flex flex-col md:flex-row items-start mb-8 w-full">
                <div className="flex justify-center items-center gap-2  text-md">
                  <FaUser className=" text-md rounded-full " />
                  <p className="text-lg font-semibold">Emran</p>
                </div>
                <div className="w-full">
                  <p className="text-gray-300 mb-2 text-sm md:text-md lg:text-lg">
                    Replied to Betelehem - 2 minutes ago
                  </p>
                  <p className="mb-4 text-sm md:text-md lg:text-lg">
                    Here's an optimized version of your Fibonacci function using
                    memoization:
                  </p>
                  <div className="border border-green-500 p-4 rounded-md bg-[#050f14] w-full">
                    {/* Corrected Python code */}
                    <p className="text-green-500">// Optimized Python code</p>
                    <pre className="text-gray-300 overflow-x-scroll w-full">
                      <code className="w-full">
                        {`def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
        return memo[n]
    
print(fibonacci_memo(35))`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QA;
