import React, { useState, useCallback } from 'react';
import UploadZone from '../components/UploadZone';
import Cropper from 'react-easy-crop';
import { Download } from 'lucide-react';
import { getCroppedImg } from '../utils/cropImage';

const Crop = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      console.log('donee', { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const onFileChange = async (files: File[]) => {
    if (files && files.length > 0) {
      const file = files[0];
      let imageData = await readFile(file);
      setImageSrc(imageData);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Crop Image</h1>
      
      {!imageSrc ? (
        <UploadZone onDrop={onFileChange} />
      ) : (
        <div className="space-y-8">
          <div className="relative h-96 bg-gray-900 rounded-lg overflow-hidden">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700">Zoom</label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e) => setZoom(e.target.value)}
                className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <button 
              onClick={showCroppedImage}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Crop & Preview
            </button>
          </div>

          {croppedImage && (
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Result</h3>
              <div className="flex flex-col items-center">
                <img src={croppedImage} alt="Cropped" className="max-w-md w-full h-auto rounded-lg shadow-lg mb-4" />
                <a 
                  href={croppedImage} 
                  download="cropped-image.jpg"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="mr-2 h-5 w-5" /> Download Result
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Crop;
