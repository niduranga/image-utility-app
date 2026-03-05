import React from 'react';

interface AdPlaceholderProps {
  className?: string;
  size?: 'banner' | 'rectangle' | 'skyscraper';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = '', size = 'banner' }) => {
  const getDimensions = () => {
    switch (size) {
      case 'rectangle':
        return 'w-[300px] h-[250px]';
      case 'skyscraper':
        return 'w-[160px] h-[600px]';
      case 'banner':
      default:
        return 'w-full h-[90px] md:h-[120px]';
    }
  };

  return (
    <div className={`flex items-center justify-center bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden my-6 mx-auto ${getDimensions()} ${className}`}>
      <div className="text-center p-4">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">Advertisement</p>
        <div className="text-gray-300 dark:text-gray-600 font-bold text-lg">Ad Space</div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
