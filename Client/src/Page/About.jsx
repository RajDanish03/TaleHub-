import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../Context/BlogContext';

export default function About() {
  const { user } = useContext(BlogContext);

  return (
    <div className="bg-white min-h-screen overflow-hidden font-sans">
      
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl py-16 sm:py-24 lg:flex lg:items-center lg:gap-x-10 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-balance">
              Where Great Stories <span className="text-indigo-600">Find Their Voice</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Welcome to BlogPage, the ultimate platform for readers and writers alike. We've built a community that fosters ideas, shares diverse perspectives, and helps you dive into topics you care about the most.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link to={user ? "/" : "/login"} className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:-translate-y-1">
                {user ? "Explore the community" : "Join our community"}
              </Link>
              <Link to="/" className="text-sm font-semibold leading-6 text-gray-900 transition-colors hover:text-indigo-600">
                Read the latest blogs <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:flex-grow relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
               alt="About us team" 
               className="relative w-full max-w-[45rem] mx-auto rounded-2xl shadow-2xl ring-1 ring-gray-900/10 object-cover hover:scale-[1.02] transition-transform duration-500" 
             />
          </div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="bg-gray-50 py-24 sm:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to share your ideas</p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We believe everyone has a story to tell. Our goal is to make publishing your ideas as beautiful and frictionless as possible.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              
              {/* Feature 1 */}
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                  </div>
                  Seamless Creative Tools
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Draft, edit, and publish engaging blog posts with our robust, intuitive platform tailored for writers.</dd>
              </div>

              {/* Feature 2 */}
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.43 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                  </div>
                  Interactive Engagement
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Engage your audience directly with built-in instant comments, intuitive replying, and live likes.</dd>
              </div>
              
              {/* Feature 3 */}
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </div>
                  Home for Communities
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">Create a space that feels entirely yours, read up on trending topics, and explore the universe of bloggers.</dd>
              </div>
              
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
