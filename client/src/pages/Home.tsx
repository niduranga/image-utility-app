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
  <Link to={link} className="group relative bg-white overflow-hidden rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${color}-500`}>
        <Icon size={80} />
    </div>
    
    <div className="p-6 relative z-10 flex flex-col h-full">
      <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-${color}-50 text-${color}-600 mb-5 w-fit group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={28} />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-slate-500 mb-6 flex-grow leading-relaxed">{desc}</p>
      
      <div className="flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700 mt-auto">
        Try it now <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  </Link>
);

const FeatureStep = ({ number, title, desc, icon: Icon }: { number: string, title: string, desc: string, icon: any }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
        <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full"></div>
            <div className="relative bg-white p-4 rounded-2xl shadow-sm text-indigo-600">
                <Icon size={32} />
            </div>
            <div className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {number}
            </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

const Home = () => {
  return (
    <div className="bg-slate-50 overflow-hidden">
      
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium mb-8 animate-fade-in-up">
                <Sparkles size={14} /> New: AI Background Removal
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 animate-fade-in-up animation-delay-100">
                Master Your Images <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                    In Seconds
                </span>
            </h1>
            
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
                Professional-grade image tools directly in your browser. 
                Compress, resize, crop, and convert without uploading to a server.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-300">
                <Link 
                    to="/compress" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-1"
                >
                    Start Processing
                    <ArrowRight className="ml-2 -mr-1" size={20} />
                </Link>
                <Link 
                    to="/remove-bg" 
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl text-indigo-700 bg-white border border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm transition-all duration-300 hover:-translate-y-1"
                >
                    <Layers className="mr-2" size={20} />
                    Remove Background
                </Link>
            </div>

            {/* Hero Image Mockup */}
            <div className="mt-16 relative mx-auto max-w-5xl animate-fade-in-up animation-delay-500">
                <div className="relative rounded-2xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:rounded-3xl lg:p-4 backdrop-blur-sm">
                    <div className="rounded-xl overflow-hidden shadow-2xl bg-white aspect-[16/9] flex items-center justify-center border border-slate-100">
                       <div className="grid grid-cols-2 gap-8 p-12 w-full h-full bg-slate-50">
                          {/* Left Side: Original */}
                          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
                              <FileImage size={64} className="text-slate-300 mb-4" />
                              <div className="text-sm font-medium text-slate-500">Original.jpg</div>
                              <div className="text-xs text-slate-400">2.4 MB</div>
                          </div>
                          
                          {/* Right Side: Processed */}
                          <div className="bg-white rounded-lg shadow-sm border border-indigo-200 p-4 flex flex-col items-center justify-center relative overflow-hidden ring-4 ring-indigo-50">
                              <div className="absolute top-2 right-2 text-green-500"><CheckCircle size={20} /></div>
                              <FileImage size={64} className="text-indigo-500 mb-4" />
                              <div className="text-sm font-medium text-slate-900">Optimized.webp</div>
                              <div className="text-xs text-green-600 font-bold">145 KB (-94%)</div>
                          </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Tools Grid Section */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase mb-2">Everything you need</h2>
            <p className="text-3xl md:text-4xl font-extrabold text-slate-900">Powerful Tools for Every Task</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500">
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
      <div className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
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
      <div className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Is it really free?</h3>
                    <p className="text-slate-600">Yes! All tools are completely free to use without any limits. We believe in open and accessible tools.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Is my data safe?</h3>
                    <p className="text-slate-600">Absolutely. We don't store your images. Processing happens either in your browser or temporarily in memory on our secure servers.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">What formats are supported?</h3>
                    <p className="text-slate-600">We support JPEG, PNG, WebP, AVIF, and GIF for most tools. Bulk processing supports mixing formats.</p>
                </div>
                 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Can I use this on mobile?</h3>
                    <p className="text-slate-600">Yes, our interface is fully responsive and works great on phones and tablets.</p>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
