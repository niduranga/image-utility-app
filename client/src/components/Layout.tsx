import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Image, Crop, Layers, Menu, X, ChevronDown, Zap, Palette, Move, Scissors, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProductsOpen, setIsProductsOpen] = React.useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const tools = [
    { name: 'Compress', href: '/compress', icon: Package },
    { name: 'Resize & Convert', href: '/resize', icon: Image },
    { name: 'Crop', href: '/crop', icon: Crop },
    { name: 'Remove BG', href: '/remove-bg', icon: Layers },
    { name: 'Bulk Process', href: '/bulk', icon: Zap },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:bg-slate-900 dark:text-slate-100 dark:selection:bg-indigo-900/40 dark:selection:text-indigo-200 transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-indigo-600 rounded-lg p-1.5 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-200">
                    <Palette size={20} strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                  ImgUtils
                </span>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:space-x-8 items-center">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/') ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Home
              </Link>
              
              {/* Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 focus:outline-none ${
                    tools.some(t => isActive(t.href)) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  Tools <ChevronDown size={14} className={`transition-transform duration-200 ${isProductsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 mt-0 w-64 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 ring-1 ring-slate-900/5 overflow-hidden transition-all duration-200 origin-top ${
                    isProductsOpen ? 'opacity-100 scale-100 translate-y-2 pointer-events-auto' : 'opacity-0 scale-95 translate-y-0 pointer-events-none'
                  }`}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                >
                  <div className="p-2">
                    {tools.map((tool) => (
                      <Link 
                        key={tool.name}
                        to={tool.href} 
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/80 dark:hover:bg-slate-700/50 transition-colors group/item"
                        onClick={() => setIsProductsOpen(false)}
                      >
                        <tool.icon size={18} className="text-slate-400 dark:text-slate-500 group-hover/item:text-indigo-500 dark:group-hover/item:text-indigo-400 transition-colors" />
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Theme Toggle Button */}
              <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  aria-label="Toggle theme"
              >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
              <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none"
              >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-lg ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link to="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}>Home</Link>
            {tools.map((tool) => (
               <Link 
                 key={tool.name}
                 to={tool.href} 
                 onClick={() => setIsOpen(false)}
                 className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${isActive(tool.href) ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}
               >
                 <tool.icon size={18} />
                 {tool.name}
               </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-16 relative z-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <div className="bg-slate-100 dark:bg-slate-800 rounded p-1 text-slate-500 dark:text-slate-400">
                <Palette size={16} />
             </div>
             <span className="text-sm font-semibold text-slate-900 dark:text-white">ImgUtils</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {new Date().getFullYear()} Open Source. Built with ❤️ using React & Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
