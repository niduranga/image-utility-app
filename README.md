# Image Utility Application

A full-stack MERN application for manipulating images directly in the browser and via server-side processing.

## Features

- **Compress Image**: Reduce file size with quality control.
- **Resize & Convert**: Change dimensions and convert between JPEG, PNG, WebP, AVIF.
- **Crop Image**: Interactive cropper with zoom and rotation.
- **Remove Background**: Client-side background removal using AI.
- **Bulk Processing**: Process multiple images at once and download as ZIP.

## Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS V4, Lucide React.
- **Backend**: Node.js, Express, Sharp, Multer.
- **Tools**: React Dropzone, React Easy Crop, @imgly/background-removal, JSZip.

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd image-utility-app
   ```

2. **Install Server Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the Development Servers**

   You need to run both client and server.

   **Server:**
   ```bash
   cd server
   npm run dev
   ```
   Server runs on http://localhost:5000

   **Client:**
   ```bash
   cd client
   npm run dev
   ```
   Client runs on http://localhost:5173

## Project Structure

- `/client`: React frontend application.
- `/server`: Express backend API.

## Notes

- Background removal runs entirely in the browser using WebAssembly. First run might take a moment to load the models.
- Image processing (Resize, Compress, Convert) uses the high-performance `sharp` library on the server.
