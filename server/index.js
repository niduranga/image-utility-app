import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
  res.send('Image Utility Server is running');
});

// Helper function to get mime type
const getMimeType = (format) => {
  switch (format) {
    case 'jpeg': return 'image/jpeg';
    case 'png': return 'image/png';
    case 'webp': return 'image/webp';
    case 'avif': return 'image/avif';
    default: return 'image/jpeg';
  }
};

app.post('/api/process', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { width, height, format, quality } = req.body;
    let pipeline = sharp(req.file.buffer);

    // Resize
    if (width || height) {
      pipeline = pipeline.resize({
        width: width ? parseInt(width) : null,
        height: height ? parseInt(height) : null,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
    }

    // Format conversion and compression
    const outputFormat = format || 'jpeg';
    const outputQuality = quality ? parseInt(quality) : 80;

    if (outputFormat === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: outputQuality });
    } else if (outputFormat === 'png') {
      pipeline = pipeline.png({ quality: outputQuality });
    } else if (outputFormat === 'webp') {
      pipeline = pipeline.webp({ quality: outputQuality });
    } else if (outputFormat === 'avif') {
      pipeline = pipeline.avif({ quality: outputQuality });
    }

    const processedImageBuffer = await pipeline.toBuffer();

    res.set('Content-Type', getMimeType(outputFormat));
    res.set('Content-Disposition', `attachment; filename="processed-image.${outputFormat}"`);
    res.send(processedImageBuffer);

  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
