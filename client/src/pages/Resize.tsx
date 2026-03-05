import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';

const Resize = () => {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [format, setFormat] = useState('png');
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleDrop = (files: File[]) => {
    setFile(files[0]);
    setResult(null);
  };

  const processImage = async () => {
    if (!file) return;
    setProcessing(true);
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('format', format);

    try {
      const response = await axios.post('http://localhost:5000/api/process', formData, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setResult(url);
    } catch (error) {
      console.error('Processing failed', error);
      alert('Failed to resize image.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      saveAs(result, `resized-${file?.name.split('.')[0]}.${format}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resize & Convert</h1>
      
      {!file ? (
        <UploadZone onDrop={handleDrop} />
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Width (px)</label>
                  <input 
                    type="number" 
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height (px)</label>
                  <input 
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Format</label>
                  <select 
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900 bg-white"
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                    <option value="avif">AVIF</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <button onClick={() => setFile(null)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                  <button 
                    onClick={processImage}
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {processing ? <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> : null}
                    Process
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              {result ? (
                <div className="w-full text-center">
                  <img src={result} alt="Resized" className="max-w-full h-auto rounded-lg shadow-lg mb-4" />
                  <button 
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Download className="mr-2 h-5 w-5" /> Download
                  </button>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                  Preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resize;
