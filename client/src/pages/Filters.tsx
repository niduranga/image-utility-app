import React, { useState, useRef, useEffect } from 'react';
import UploadZone from '../components/UploadZone';
import { Download, RotateCcw, Image as ImageIcon, Sparkles, Sliders } from 'lucide-react';
import { saveAs } from 'file-saver';

const Filters = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Filter states
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [grayscale, setGrayscale] = useState(0);
  const [sepia, setSepia] = useState(0);
  const [blur, setBlur] = useState(0);
  const [hueRotate, setHueRotate] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrop = (files: File[]) => {
    const selectedFile = files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    resetFilters();
  };

  const resetFilters = () => {
    setBrightness(100);
    setContrast(100);
    setSaturation(100);
    setGrayscale(0);
    setSepia(0);
    setBlur(0);
    setHueRotate(0);
  };

  const getFilterString = () => {
    return `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) grayscale(${grayscale}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
  };

  const applyPreset = (preset: string) => {
    resetFilters();
    switch (preset) {
      case 'vintage':
        setSepia(50);
        setContrast(120);
        setSaturation(80);
        break;
      case 'bw':
        setGrayscale(100);
        setContrast(120);
        break;
      case 'warm':
        setSepia(30);
        setBrightness(110);
        setSaturation(120);
        break;
      case 'cool':
        setHueRotate(180);
        setContrast(110);
        break;
      case 'dramatic':
        setContrast(150);
        setSaturation(120);
        setBrightness(90);
        break;
    }
  };

  const handleDownload = () => {
    if (!previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.filter = getFilterString();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `filtered-${file?.name || 'image.png'}`);
          }
        });
      }
    };
    img.src = previewUrl;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Instant Filters</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">Enhance your photos with professional-grade filters and adjustments.</p>
      </div>

      {!file ? (
        <div className="max-w-2xl mx-auto">
             <UploadZone onDrop={handleDrop} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Sidebar */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 space-y-8 h-fit lg:sticky lg:top-8">
            
            {/* Presets */}
            <div>
              <div className="flex items-center gap-2 mb-4 text-slate-900 dark:text-white font-semibold">
                <Sparkles size={20} className="text-indigo-500" />
                <h3>Presets</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Vintage', 'B&W', 'Warm', 'Cool', 'Dramatic', 'Normal'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => preset === 'Normal' ? resetFilters() : applyPreset(preset.toLowerCase())}
                    className="px-3 py-2 text-sm font-medium rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-slate-200 dark:border-slate-600"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-semibold">
                <Sliders size={20} className="text-indigo-500" />
                <h3>Adjustments</h3>
              </div>
              
              {[
                { label: 'Brightness', val: brightness, set: setBrightness, min: 0, max: 200 },
                { label: 'Contrast', val: contrast, set: setContrast, min: 0, max: 200 },
                { label: 'Saturation', val: saturation, set: setSaturation, min: 0, max: 200 },
                { label: 'Grayscale', val: grayscale, set: setGrayscale, min: 0, max: 100 },
                { label: 'Sepia', val: sepia, set: setSepia, min: 0, max: 100 },
                { label: 'Blur', val: blur, set: setBlur, min: 0, max: 20 },
                { label: 'Hue Rotate', val: hueRotate, set: setHueRotate, min: 0, max: 360 },
              ].map((control) => (
                <div key={control.label}>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{control.label}</label>
                    <span className="text-xs text-slate-500">{control.val}</span>
                  </div>
                  <input
                    type="range"
                    min={control.min}
                    max={control.max}
                    value={control.val}
                    onChange={(e) => control.set(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-3">
               <button
                onClick={resetFilters}
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <RotateCcw size={16} className="mr-2" /> Reset
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all hover:-translate-y-0.5"
              >
                <Download size={16} className="mr-2" /> Download
              </button>
            </div>
            
            <button 
                onClick={() => { setFile(null); setPreviewUrl(null); }} 
                className="w-full text-center text-sm text-slate-500 hover:text-red-500 transition-colors mt-2"
            >
                Upload New Image
            </button>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full bg-slate-100 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex items-center justify-center min-h-[500px] shadow-inner">
                 {/* Checkerboard background for transparency */}
                 <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                 
                 {previewUrl && (
                    <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="max-w-full max-h-[80vh] object-contain relative z-10 transition-all duration-100"
                        style={{ filter: getFilterString() }}
                    />
                 )}
                 <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
