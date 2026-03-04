import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import axios from 'axios';
import { Download, Loader2 } from 'lucide-react';
import { saveAs } from 'file-saver';

const Compress = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
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
    formData.append('quality', quality.toString());
    formData.append('format', 'jpeg'); // Compress to JPEG by default

    try {
      const response = await axios.post('http://localhost:5000/api/process', formData, {
        responseType: 'blob'
      });
      const url = URL.createObjectURL(new Blob([response.data]));
      setResult(url);
    } catch (error) {
      console.error('Processing failed', error);
      alert('Failed to compress image.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      saveAs(result, `compressed-${file?.name.split('.')[0]}.jpg`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Compress Image</h1>
      
      {!file ? (
        <UploadZone onDrop={handleDrop} />
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quality: {quality}%</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={quality} 
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <button onClick={() => setFile(null)} className="text-sm text-gray-500 hover:text-gray-700">Change Image</button>
                  <button 
                    onClick={processImage}
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {processing ? <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" /> : null}
                    Compress Now
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 w-full flex flex-col items-center">
              {result ? (
                <div className="w-full">
                  <img src={result} alt="Compressed" className="max-w-full h-auto rounded-lg shadow-lg mb-4" />
                  <button 
                    onClick={handleDownload}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Download className="mr-2 h-5 w-5" /> Download Compressed Image
                  </button>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Image Preview
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compress;
