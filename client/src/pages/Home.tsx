import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Image, Minimize, Crop, Maximize, Trash2, ArrowRight } from 'lucide-react';

const ToolCard = ({ icon: Icon, title, desc, link }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd>
            <div className="text-lg font-medium text-gray-900">{desc}</div>
          </dd>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 px-5 py-3">
      <div className="text-sm">
        <Link to={link} className="font-medium text-indigo-600 hover:text-indigo-500">
          Try it now <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Powerful Image Tools</span>{' '}
                  <span className="block text-indigo-600 xl:inline">in your browser</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Compress, resize, crop, and convert your images instantly. No login required. Fast, secure, and easy to use.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/compress" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                      Get started
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/resize" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      Resize Image
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" alt="" />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Our Tools</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard icon={Minimize} title="Compress Image" desc="Reduce file size without losing quality." link="/compress" />
          <ToolCard icon={Image} title="Resize & Convert" desc="Change dimensions and format (JPG, PNG, WebP)." link="/resize" />
          <ToolCard icon={Crop} title="Crop Image" desc="Crop your images to perfect aspect ratios." link="/crop" />
          <ToolCard icon={Layers} title="Remove Background" desc="Automatically remove image backgrounds." link="/remove-bg" />
          <ToolCard icon={Maximize} title="Bulk Processing" desc="Process multiple images at once." link="/bulk" />
        </div>
      </div>

      {/* Steps Section */}
      <div className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-white">How it works</h2>
              <p className="text-xl text-indigo-300">Simple steps to process your images.</p>
            </div>
            <div className="lg:col-span-2">
              <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
                <li>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-white">1. Upload</h3>
                      <p className="text-indigo-200">Drag & drop your images directly into the browser.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-white">2. Process</h3>
                      <p className="text-indigo-200">Select your options and let our tools do the magic.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="space-y-4">
                    <div className="text-lg leading-6 font-medium space-y-1">
                      <h3 className="text-white">3. Download</h3>
                      <p className="text-indigo-200">Get your processed images instantly.</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Frequently asked questions</h2>
              <p className="mt-4 text-lg text-gray-500">Can't find the answer you're looking for? Reach out to our customer support team.</p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <dl className="space-y-12">
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">Is it free?</dt>
                  <dd className="mt-2 text-base text-gray-500">Yes, completely free to use for all features.</dd>
                </div>
                <div>
                  <dt className="text-lg leading-6 font-medium text-gray-900">Do you store my images?</dt>
                  <dd className="mt-2 text-base text-gray-500">No, images are processed in memory and deleted immediately after.</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
