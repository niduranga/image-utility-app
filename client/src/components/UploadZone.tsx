import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

interface UploadZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Record<string, string[]>;
  multiple?: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onDrop, accept, multiple = false }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept || {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    multiple
  });

  return (
    <div 
      {...getRootProps()} 
      className={`relative group border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ease-in-out ${
        isDragActive 
          ? 'border-indigo-500 bg-indigo-50/50 scale-[1.02] shadow-xl shadow-indigo-100' 
          : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50 hover:shadow-lg hover:shadow-slate-100'
      }`}
    >
      <input {...getInputProps()} />
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none rounded-2xl"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center space-y-6">
        <div className={`p-5 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5 transition-transform duration-300 ${isDragActive ? 'scale-110 text-indigo-600' : 'text-slate-400 group-hover:text-indigo-500 group-hover:scale-110'}`}>
           <UploadCloud size={48} strokeWidth={1.5} />
        </div>
        
        <div className="space-y-2">
            <h3 className="text-xl font-semibold text-slate-900">
            {isDragActive ? "Drop files now" : "Click to upload or drag & drop"}
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
            SVG, PNG, JPG or GIF (max. 10MB)
            </p>
        </div>

        <div className="flex gap-4 mt-4 opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500">
            {/* Icons representing file types */}
            <div className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">JPG</div>
            <div className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">PNG</div>
            <div className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded">WEBP</div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;
