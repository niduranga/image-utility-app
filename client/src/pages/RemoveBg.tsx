import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import { removeBackground } from '@imgly/background-removal';
import { Download, Loader2, Layers } from 'lucide-react';
import { saveAs } from 'file-saver';

const RemoveBg = () => {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleDrop = async (files: File[]) => {
    const uploadedFile = files[0];
    setFile(uploadedFile);
    setResult(null);
    setProcessing(true);

    try {
      const blob = await removeBackground(uploadedFile);
      const url = URL.createObjectURL(blob);
      setResult(url);
    } catch (error) {
      console.error('Background removal failed', error);
      alert('Failed to remove background.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (result) {
      saveAs(result, `nobg-${file?.name.split('.')[0]}.png`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Remove Background</h1>
      
      {!file ? (
        <UploadZone onDrop={handleDrop} />
      ) : (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1 w-full bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Original</h3>
              <div className="flex justify-center bg-gray-100 rounded-lg p-4">
                 <img src={URL.createObjectURL(file)} alt="Original" className="max-h-64 object-contain" />
              </div>
              <div className="mt-4 flex justify-between">
                 <button onClick={() => setFile(null)} className="text-sm text-gray-500 hover:text-gray-700">Change Image</button>
              </div>
            </div>
            
            <div className="flex-1 w-full bg-white p-6 rounded-lg shadow flex flex-col items-center">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Result</h3>
              {processing ? (
                 <div className="flex flex-col items-center justify-center h-64 w-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                   <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
                   <p className="text-gray-500">Removing background...</p>
                   <p className="text-xs text-gray-400 mt-2">This runs locally in your browser</p>
                 </div>
              ) : result ? (
                <div className="w-full">
                  <div className="bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAjyQcRNUIdA0ALy8DADs5OyMAAAA=')] bg-repeat rounded-lg overflow-hidden mb-4 flex justify-center p-4">
                    <img src={result} alt="No Background" className="max-h-64 object-contain" />
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <Download className="mr-2 h-5 w-5" /> Download PNG
                  </button>
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                  Waiting for processing...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RemoveBg;
