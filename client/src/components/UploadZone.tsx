import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

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
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors duration-200 ease-in-out ${
        isDragActive ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        <UploadCloud className={`h-12 w-12 ${isDragActive ? 'text-indigo-600' : 'text-gray-400'}`} />
        <div className="text-lg font-medium text-gray-900">
          {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to select"}
        </div>
        <p className="text-sm text-gray-500">Supports PNG, JPG, WebP</p>
      </div>
    </div>
  );
};

export default UploadZone;
