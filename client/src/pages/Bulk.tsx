import React, { useState } from 'react';
import UploadZone from '../components/UploadZone';
import axios from 'axios';
import { Download, Loader2, RefreshCw, Trash2, FileImage } from 'lucide-react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const Bulk = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState('webp');
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (uploadedFiles: File[]) => {
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const processBulk = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setProgress(0);

    const zip = new JSZip();
    const processedFolder = zip.folder("processed_images");
    let completed = 0;

    // Use for...of loop for sequential processing to avoid overwhelming the server or browser
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('format', format);
      formData.append('quality', '80');

      try {
        const response = await axios.post('http://localhost:5000/api/process', formData, {
          responseType: 'blob'
        });
        
        const newFileName = `${file.name.split('.')[0]}.${format}`;
        if (processedFolder) {
            processedFolder.file(newFileName, response.data);
        }
      } catch (err) {
        console.error(`Failed to process ${file.name}`, err);
      }

      completed++;
      setProgress(Math.round((completed / files.length) * 100));
    }

    try {
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "processed_images.zip");
    } catch (e) {
        console.error("Error generating zip", e);
    } finally {
        setProcessing(false);
        setProgress(0);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Bulk Image Converter</h1>
      
      <div className="space-y-8">
        {!processing && (
            <UploadZone onDrop={handleDrop} multiple={true} />
        )}
        
        {files.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h3 className="text-lg font-medium text-gray-900">{files.length} Images Selected</h3>
              
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <select 
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="block w-full sm:w-32 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white border"
                  disabled={processing}
                >
                  <option value="jpeg">to JPEG</option>
                  <option value="png">to PNG</option>
                  <option value="webp">to WebP</option>
                  <option value="avif">to AVIF</option>
                </select>
                
                <button 
                  onClick={processBulk}
                  disabled={processing}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {processing ? (
                    <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                        Processing... {progress}%
                    </>
                  ) : (
                    <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Convert All
                    </>
                  )}
                </button>
              </div>
            </div>

            {processing && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
                <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                    style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            <div className="border rounded-md divide-y divide-gray-200 max-h-96 overflow-y-auto bg-gray-50">
              {files.map((file, index) => (
                <div key={index} className="p-4 flex justify-between items-center hover:bg-white transition-colors">
                  <div className="flex items-center overflow-hidden">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-md flex items-center justify-center text-indigo-600">
                        <FileImage size={20} />
                    </div>
                    <div className="ml-4 overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)} 
                    disabled={processing}
                    className="ml-4 p-2 text-gray-400 hover:text-red-600 transition-colors rounded-full hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Remove file"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bulk;
