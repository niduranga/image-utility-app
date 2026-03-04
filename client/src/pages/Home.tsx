import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  Image as ImageIcon, 
  Minimize, 
  Crop, 
  Maximize, 
  ArrowRight, 
  Zap, 
  CheckCircle,
  FileImage,
  CloudUpload,
  Sparkles
} from 'lucide-react';

// Reusable Components

const ToolCard = ({ icon: Icon, title, desc, link, color }: { icon: any, title: string, desc: string, link: string, color: string }) => (
  <Link to={link} className="group relative bg-white dark:bg-slate-800 overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500`}>
        <Icon size={80} />
    </div>
    
    <div className="p-6 relative z-10 flex flex-col h-full">
      <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 mb-5 w-fit group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow leading-relaxed">{desc}</p>
      
      <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 mt-auto">
        Try it now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

const FeatureStep = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
            <div className="relative bg-white dark:bg-slate-700 p-4 rounded-2xl shadow-sm text-indigo-600 dark:text-indigo-400">
                <Icon size={32} />
            </div>
            <div className="absolute -top-2 -right-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">
                {number}
            </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{desc}</p>
    </div>
);

const Home = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-200/40 dark:bg-pink-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-8 animate-fade-in-up">
                <Sparkles size={14} /> New: AI Background Removal
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 animate-fade-in-up animation-delay-100">
                Master Your Images <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                    In Seconds
                </span>
            </h1>
            
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 dark:text-slate-300 mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
                Professional-grade image tools directly in your browser. 
                Compress, resize, crop, and convert without uploading to a server.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-300">
                <Link 
                    to="/compress" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                    Start Processing
                    <ArrowRight className="ml-2 -mr-1" size={20} />
                </Link>
                <Link 
                    to="/remove-bg" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-200 dark:hover:border-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1"
                >
                    <Layers className="mr-2" size={20} />
                    Remove Background
                </Link>
            </div>

            {/* Hero Image Mockup */}
            <div className="mt-20 relative mx-auto max-w-5xl animate-fade-in-up animation-delay-500 perspective-1000">
                <div className="relative rounded-3xl bg-slate-900/10 dark:bg-white/5 p-4 ring-1 ring-inset ring-slate-900/10 dark:ring-white/10 backdrop-blur-xl transition-transform duration-500 hover:scale-[1.01] hover:rotate-x-2">
                    <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 aspect-[16/9] flex items-center justify-center border border-white/50 dark:border-white/10 relative">
                       
                       {/* Abstract Background Elements inside Mockup */}
                       <div className="absolute top-0 right-0 w-full h-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat mix-blend-overlay"></div>
                       <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                       <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 p-8 md:p-12 w-full h-full items-center relative z-10">
                          {/* Left Side: Original */}
                          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 dark:border-slate-700/60 p-6 flex flex-col items-center justify-center relative group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                              <div className="absolute -top-3 -left-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-100 dark:border-red-800 shadow-sm">BEFORE</div>
                              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-xl mb-4 flex items-center justify-center text-slate-300 dark:text-slate-500 group-hover:scale-105 transition-transform duration-300">
                                <FileImage size={40} />
                              </div>
                              <div className="text-base font-bold text-slate-800 dark:text-white">Travel_Photo.raw</div>
                              <div className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1">5.2 MB • PNG</div>
                          </div>
                          
                          {/* Arrow for Mobile */}
                          <div className="md:hidden flex justify-center text-slate-300 dark:text-slate-600">
                            <ArrowRight size={24} className="rotate-90 md:rotate-0" />
                          </div>

                          {/* Right Side: Processed */}
                          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-xl border border-indigo-100 dark:border-indigo-900/50 p-6 flex flex-col items-center justify-center relative ring-4 ring-indigo-50/50 dark:ring-indigo-500/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:ring-indigo-100 dark:hover:ring-indigo-500/40">
                              <div className="absolute -top-3 -right-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100 dark:border-emerald-800 shadow-sm flex items-center gap-1">
                                <CheckCircle size={12} /> AFTER
                              </div>
                              <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl mb-4 flex items-center justify-center text-indigo-500 dark:text-indigo-400 relative overflow-hidden group">
                                <FileImage size={40} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-indigo-100/50 dark:bg-indigo-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                              </div>
                              <div className="text-base font-bold text-slate-900 dark:text-white">Optimized_Web.webp</div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded">240 KB</span>
                                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 line-through">5.2 MB</span>
                              </div>
                          </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Tools Grid Section */}
      <div className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase mb-2">Everything you need</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Powerful Tools for Every Task</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">
                Select a tool below to get started. All processing happens securely in your browser or on our optimized servers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ToolCard 
                icon={Minimize} 
                title="Smart Compression" 
                desc="Reduce file size by up to 90% without visible quality loss. Perfect for web optimization." 
                link="/compress" 
                color="blue"
            />
            <ToolCard 
                icon={ImageIcon} 
                title="Resize & Convert" 
                desc="Change dimensions and convert between modern formats like WebP, AVIF, PNG, and JPEG." 
                link="/resize" 
                color="indigo"
            />
            <ToolCard 
                icon={Crop} 
                title="Precision Crop" 
                desc="Crop your images to exact aspect ratios or dimensions with our interactive tool." 
                link="/crop" 
                color="violet"
            />
            <ToolCard 
                icon={Layers} 
                title="Remove Background" 
                desc="AI-powered background removal. Isolate subjects instantly for e-commerce or design." 
                link="/remove-bg" 
                color="purple"
            />
            <ToolCard 
                icon={Maximize} 
                title="Bulk Processing" 
                desc="Have hundreds of images? Process them all at once and download as a ZIP file." 
                link="/bulk" 
                color="pink"
            />
             <ToolCard 
                icon={Zap} 
                title="Instant Filter" 
                desc="Apply professional filters and adjustments to enhance your photos in one click. (Coming Soon)" 
                link="#" 
                color="gray"
            />
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <FeatureStep 
                number="1" 
                title="Upload" 
                desc="Drag & drop your images directly into the browser. We support all major formats." 
                icon={CloudUpload}
            />
             <FeatureStep 
                number="2" 
                title="Process" 
                desc="Our powerful algorithms optimize, resize, or edit your images in milliseconds." 
                icon={Zap}
            />
             <FeatureStep 
                number="3" 
                title="Download" 
                desc="Get your transformed images instantly. No watermarks, no sign-up required." 
                icon={CheckCircle}
            />
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white dark:bg-slate-900 py-24 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Is it really free?</h3>
                    <p className="text-slate-600 dark:text-slate-400">Yes! All tools are completely free to use without any limits. We believe in open and accessible tools.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Is my data safe?</h3>
                    <p className="text-slate-600 dark:text-slate-400">Absolutely. We don't store your images. Processing happens either in your browser or temporarily in memory on our secure servers.</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What formats are supported?</h3>
                    <p className="text-slate-600 dark:text-slate-400">We support JPEG, PNG, WebP, AVIF, and GIF for most tools. Bulk processing supports mixing formats.</p>
                </div>
                 <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Can I use this on mobile?</h3>
                    <p className="text-slate-600 dark:text-slate-400">Yes, our interface is fully responsive and works great on phones and tablets.</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
