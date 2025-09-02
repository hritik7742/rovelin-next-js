"use client";

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import RelatedTools from '../shared/RelatedTools';
import { 
  Square, 
  Circle, 
  Star, 
  Heart, 
  Triangle, 
  Hexagon,  
  Download,
  Upload,
  Diamond,
  Octagon
} from 'lucide-react';
import { getCroppedImg } from './utils';
import './image-cropper.css';

const SHAPES = {
  freeform: { name: 'Freeform', icon: <Square />, aspect: undefined, cropShape: 'rect' },
  rectangle: { name: 'Rectangle', icon: <Square />, aspect: 16/9, cropShape: 'rect' },
  square: { name: 'Square', icon: <Square />, aspect: 1, cropShape: 'rect' },
  circle: { name: 'Circle', icon: <Circle />, aspect: 1, cropShape: 'round' },
  heart: { name: 'Heart', icon: <Heart />, aspect: 1, cropShape: 'rect' },
  star: { name: 'Star', icon: <Star />, aspect: 1, cropShape: 'rect' },
  triangle: { name: 'Triangle', icon: <Triangle />, aspect: 1, cropShape: 'rect' },
  hexagon: { name: 'Hexagon', icon: <Hexagon />, aspect: 1, cropShape: 'rect' },
  diamond: { name: 'Diamond', icon: <Diamond />, aspect: 1, cropShape: 'rect' },
  octagon: { name: 'Octagon', icon: <Octagon />, aspect: 1, cropShape: 'rect' }
};

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [selectedShape, setSelectedShape] = useState('freeform');
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => 
        setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onCropComplete = useCallback(async (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation,
        selectedShape
      );
      setPreviewUrl(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imgSrc, rotation, selectedShape]);

  const handleDownload = useCallback(async () => {
    if (!croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation,
        selectedShape
      );
      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = croppedImage;
      link.click();
    } catch (e) {
      console.error(e);
    }
  }, [imgSrc, croppedAreaPixels, rotation, selectedShape]);

  const handleShapeSelect = async (shape: string) => {
    setSelectedShape(shape);

    // Update preview with new shape if we have a cropped area
    if (croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(
          imgSrc,
          croppedAreaPixels,
          rotation,
          shape
        );
        setPreviewUrl(croppedImage);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleNewImage = () => {
    // Reset all states
    setImgSrc('');
    setPreviewUrl('');
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
    setSelectedShape('freeform');
    setCroppedAreaPixels(null);

    // Trigger file input click
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input
      fileInputRef.current.click();
    }
  };

  return (
    <div className="ic-container">

      <div className="ic-workspace">
        <header className="ic-header">
          <h1>Image Cropper</h1>
          <p>Crop your images into various shapes with precision</p>
        </header>

        {!imgSrc ? (
          <div className="ic-upload-section">
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="ic-file-input"
              ref={fileInputRef}
            />
            <div className="ic-upload-content">
              <span className="ic-upload-icon">🖼️</span>
              <p>Drop an image here or click to upload</p>
              <span className="ic-formats">Supports: JPG, PNG, WebP</span>
            </div>
          </div>
        ) : (
          <>
            <div className="ic-tools">
              <div className="ic-shapes">
                {Object.entries(SHAPES).map(([key, shape]) => (
                  <button
                    key={key}
                    className={`ic-shape-btn ${selectedShape === key ? 'active' : ''}`}
                    onClick={() => handleShapeSelect(key)}
                    title={shape.name}
                  >
                    {shape.icon}
                  </button>
                ))}
              </div>

              <div className="ic-controls">
                <div className="ic-control">
                  <label>Zoom</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                  />
                </div>
                <div className="ic-control">
                  <label>Rotate</label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e) => setRotation(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="ic-main">
              <div className="ic-crop-container">
                <Cropper
                  image={imgSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={SHAPES[selectedShape as keyof typeof SHAPES].aspect}
                  cropShape={SHAPES[selectedShape as keyof typeof SHAPES].cropShape as "rect" | "round"}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="ic-preview-panel">
                {previewUrl && (
                  <div className="ic-preview">
                    <h3>Preview</h3>
                    <div className="ic-preview-container">
                      <Image 
                        src={previewUrl} 
                        alt="Preview" 
                        className="ic-preview-image"
                      />
                    </div>
                  </div>
                )}
                <div className="ic-preview-actions">
                  <button className="ic-btn primary" onClick={handleDownload}>
                    <Download size={20} />
                    Download
                  </button>
                  <button 
                    className="ic-btn secondary" 
                    onClick={handleNewImage}
                  >
                    <Upload size={20} />
                    New Image
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="ic-articles">
          <article className="ic-article">
            <h2>Advanced Image Cropping Tool</h2>
            <p>
              Our free online image cropper offers professional-grade features for precise image editing. 
              With support for multiple shapes including circles, hearts, stars, and custom polygons, 
              you can create perfectly cropped images for any purpose - from social media profiles to 
              website designs.
            </p>
          </article>

          <article className="ic-article">
            <h2>Features and Capabilities</h2>
            <div className="ic-features">
              <div className="ic-feature">
                <h3>🎯 Multiple Shape Options</h3>
                <p>
                  Choose from various shapes including rectangle, square, circle, heart, star, 
                  pentagon, hexagon, and triangle. Perfect for creating unique profile pictures, 
                  logos, and decorative elements.
                </p>
              </div>
              <div className="ic-feature">
                <h3>🎚️ Precise Controls</h3>
                <p>
                  Fine-tune your crops with our intuitive scaling and rotation controls. 
                  Adjust size, position, and angle with pixel-perfect precision.
                </p>
              </div>
              <div className="ic-feature">
                <h3>{"👁️ Real-time Preview"}</h3>
                <p>
                  {"See your changes instantly with our live preview feature. What you see is exactly what you'll get in the final image."}
                </p>
              </div>
              <div className="ic-feature">
                <h3>💾 Easy Export</h3>
                <p>
                  Download your cropped images instantly in high-quality PNG format, 
                  preserving transparency and quality.
                </p>
              </div>
            </div>
          </article>

          <article className="ic-article">
            <h2>Common Use Cases</h2>
            <div className="ic-use-cases">
              <div className="ic-use-case">
                <h3>Social Media Profiles</h3>
                <p>
                  Create perfect profile pictures and cover images for all social media platforms. 
                  Our tool supports common aspect ratios used by Facebook, Instagram, Twitter, 
                  and LinkedIn.
                </p>
              </div>
              <div className="ic-use-case">
                <h3>E-commerce Products</h3>
                <p>
                  Prepare product images with consistent dimensions and shapes. Ideal for 
                  online stores and marketplace listings.
                </p>
              </div>
              <div className="ic-use-case">
                <h3>Web Design Assets</h3>
                <p>
                  Crop images for websites, banners, and marketing materials. Maintain 
                  consistency across your digital presence.
                </p>
              </div>
            </div>
          </article>

          <div className="ic-faq">
            <h2>Frequently Asked Questions</h2>

            <div className="ic-faq-item">
              <h3>What image formats are supported?</h3>
              <p>
                Our image cropper supports all common image formats including JPG, PNG, WebP, 
                and GIF. The output is available in high-quality PNG format to preserve 
                transparency and quality.
              </p>
            </div>

            <div className="ic-faq-item">
              <h3>Is there a file size limit?</h3>
              <p>
                While we support large images, we recommend keeping input files under 10MB 
                for optimal performance. The tool processes everything in your browser for 
                maximum privacy and speed.
              </p>
            </div>

            <div className="ic-faq-item">
              <h3>How do I get the best quality results?</h3>
              <p>
                For best results, start with a high-resolution image and use the scaling 
                controls to zoom into the area you want to crop. Our tool maintains the 
                original image quality within the cropped area.
              </p>
            </div>
          </div>

          <article className="ic-article">
            <h2>Tips for Perfect Image Cropping</h2>
            <div className="ic-tips">
              <div className="ic-tip">
                <h3>Rule of Thirds</h3>
                <p>
                  Use the crop grid to align key elements along the thirds lines for more 
                  visually appealing compositions.
                </p>
              </div>
              <div className="ic-tip">
                <h3>Maintain Aspect Ratio</h3>
                <p>
                  When cropping for specific platforms, use our preset aspect ratios to 
                  ensure your images will fit perfectly.
                </p>
              </div>
              <div className="ic-tip">
                <h3>Consider the Focus</h3>
                <p>
                  Keep the main subject centered when using circular or shaped crops to 
                  create balanced and professional results.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Middle Ad */}

        <RelatedTools 
          currentTool="/tools/image-cropper" 
          category="Image Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 