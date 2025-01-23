"use client";

import { useState, useRef } from 'react';
import './video-compressor.css';

export default function VideoCompressor() {
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [stats, setStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    format: string;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('Please select a video file');
      return;
    }

    setVideo(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStats(null);
  };

  // Optimized video compression
  const compressVideo = async () => {
    if (!video) return;
    
    try {
      setLoading(true);
      setProgress(0);

      const videoElement = document.createElement('video');
      videoElement.src = previewUrl;
      await new Promise((resolve) => {
        videoElement.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // More aggressive compression for larger videos
      const getScaleFactor = (width: number) => {
        if (width > 1920) return 0.4;
        if (width > 1280) return 0.5;
        if (width > 854) return 0.75;
        return 0.8;
      };

      const scaleFactor = getScaleFactor(videoElement.videoWidth);
      canvas.width = videoElement.videoWidth * scaleFactor;
      canvas.height = videoElement.videoHeight * scaleFactor;

      // Optimize frame rate and bitrate based on video duration
      const fps = videoElement.duration > 60 ? 20 : 24;
      const bitrate = videoElement.duration > 60 ? 600000 : 800000;
      const interval = 1000 / fps;

      const stream = canvas.captureStream();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp8',
        videoBitsPerSecond: bitrate
      });

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        setStats({
          originalSize: video.size,
          compressedSize: blob.size,
          compressionRatio: Math.round((1 - blob.size / video.size) * 100),
          format: 'WebM'
        });

        const link = document.createElement('a');
        link.href = url;
        link.download = `compressed_${video.name.split('.')[0]}.webm`;
        link.click();

        URL.revokeObjectURL(url);
        setLoading(false);
        setProgress(100);
      };

      // Process frames in larger batches for better performance
      const batchSize = 10;
      mediaRecorder.start();

      let currentTime = 0;
      const duration = videoElement.duration;

      const processFrameBatch = async () => {
        const batchEnd = Math.min(currentTime + (interval * batchSize) / 1000, duration);
        
        while (currentTime <= batchEnd) {
          videoElement.currentTime = currentTime;
          await new Promise(resolve => {
            videoElement.onseeked = resolve;
          });
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          currentTime += interval / 1000;
        }
        
        setProgress(Math.round((currentTime / duration) * 100));
        
        if (currentTime < duration) {
          setTimeout(processFrameBatch, 0); // Use setTimeout for better UI responsiveness
        } else {
          mediaRecorder.stop();
        }
      };

      await processFrameBatch();

    } catch (error) {
      console.error('Error compressing video:', error);
      alert('Error compressing video. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="video-compressor">
      <div className="container">
        <header className="header">
          <h1>Video Compressor</h1>
          <p className="description">
            Compress your videos while maintaining quality. Perfect for sharing on social media or email.
          </p>
        </header>

        <div className="main-content">
          <div className="upload-container">
            <div 
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('video/')) {
                  handleFileChange({ target: { files: [file] } } as any);
                } else {
                  alert('Please select a video file');
                }
              }}
            >
              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="file-input"
                aria-label="Choose video file"
              />
              {!video ? (
                <div className="upload-content">
                  <div className="upload-icon">
                    📁
                  </div>
                  <p>Drag and drop your video here</p>
                  <p className="file-types">Supports MP4, MOV, AVI, and more</p>
                  <button 
                    type="button"
                    className="select-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      inputRef.current?.click();
                    }}
                  >
                    <span>Select Video</span>
                  </button>
                </div>
              ) : (
                <div className="video-preview-container">
                  <div className="preview-section">
                    <video 
                      src={previewUrl} 
                      controls 
                      className="video-preview"
                    />
                  </div>
                  <div className="video-info">
                    <h3>Video Details</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span>Name</span>
                        <span>{video.name}</span>
                      </div>
                      <div className="info-item">
                        <span>Size</span>
                        <span>{(video.size / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                      <div className="info-item">
                        <span>Type</span>
                        <span>{video.type.split('/')[1].toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {video && (
              <div className="compression-controls">
                <button 
                  onClick={compressVideo}
                  disabled={loading}
                  className="compress-button"
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Compressing... {progress}%</span>
                    </>
                  ) : (
                    'Compress Video'
                  )}
                </button>

                {stats && (
                  <div className="compression-stats">
                    <h3>Compression Results</h3>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span>Original Size</span>
                        <span>{(stats.originalSize / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                      <div className="stat-item">
                        <span>Compressed Size</span>
                        <span>{(stats.compressedSize / (1024 * 1024)).toFixed(2)} MB</span>
                      </div>
                      <div className="stat-item">
                        <span>Compression Ratio</span>
                        <span>{stats.compressionRatio}%</span>
                      </div>
                      <div className="stat-item">
                        <span>Format</span>
                        <span>{stats.format}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <section className="features-section">
          <h2>Why Choose Our Video Compressor?</h2>
          <div className="features">
            <div className="feature">
              <h3>✨ High Quality</h3>
              <p>Smart compression that maintains video quality</p>
            </div>
            <div className="feature">
              <h3>🔒 Private & Secure</h3>
              <p>All processing happens in your browser</p>
            </div>
            <div className="feature">
              <h3>⚡ Lightning Fast</h3>
              <p>Optimized for quick compression</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid">
            <article className="info-card">
              <h3>How It Works</h3>
              <p>Our video compressor uses advanced algorithms to reduce file size while maintaining quality. Perfect for social media, email sharing, and more.</p>
            </article>
            <article className="info-card">
              <h3>Supported Formats</h3>
              <p>We support all major video formats including MP4, MOV, AVI, and more. Output is provided in efficient WebM format.</p>
            </article>
            <article className="info-card">
              <h3>Best Practices</h3>
              <p>For optimal results, we recommend videos under 1GB. Larger files may take longer to process.</p>
            </article>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is there a file size limit?</h3>
              <p>While there's no strict limit, we recommend files under 1GB for optimal performance.</p>
            </div>
            <div className="faq-item">
              <h3>What happens to my videos?</h3>
              <p>All processing happens locally in your browser. Your videos never leave your device.</p>
            </div>
            <div className="faq-item">
              <h3>Will I lose quality?</h3>
              <p>Our smart compression maintains optimal quality while reducing file size.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
} 