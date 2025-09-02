"use client";

import { useState, useRef } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './video-to-audio.css';

// Extend Window interface to include webkit audio context
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

interface ConversionStats {
  originalSize: number;
  convertedSize: number;
  duration: string;
  format: string;
}

type AudioFormat = 'mp3' | 'wav' | 'webm' | 'mp4';
type AudioQuality = 'high' | 'medium' | 'low';

export default function VideoToAudioConverter() {
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<ConversionStats | null>(null);
  const [error, setError] = useState<string>('');
  const [audioFormat, setAudioFormat] = useState<AudioFormat>('mp3');
  const [audioQuality, setAudioQuality] = useState<AudioQuality>('medium');
  const [convertedAudioUrl, setConvertedAudioUrl] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  // Process file
  const processFile = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }

    if (file.size > 200 * 1024 * 1024) {
      setError('File too large. Maximum size is 200MB.');
      return;
    }

    setError('');
    setVideo(file);
    setStats(null);
    setConvertedAudioUrl('');
    setProgress(0);
  };

  // Get quality settings
  const getQualitySettings = (quality: AudioQuality) => {
    switch (quality) {
      case 'high': return { bitrate: 320000, sampleRate: 48000 };
      case 'medium': return { bitrate: 192000, sampleRate: 44100 };
      case 'low': return { bitrate: 128000, sampleRate: 22050 };
      default: return { bitrate: 192000, sampleRate: 44100 };
    }
  };

  // Convert video to audio
  const convertVideoToAudio = async () => {
    if (!video) return;

    try {
      setLoading(true);
      setError('');
      setProgress(0);

      // Create video element
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(video);
      videoElement.crossOrigin = 'anonymous';

      // Wait for video to load
      await new Promise<void>((resolve, reject) => {
        videoElement.onloadedmetadata = () => resolve();
        videoElement.onerror = () => reject(new Error('Video load failed'));
        setTimeout(() => reject(new Error('Video load timeout')), 10000);
      });

      setProgress(20);

      const duration = videoElement.duration;
      if (!duration || duration === 0) {
        throw new Error('Invalid video duration');
      }

      // Create audio context
      const audioContext = new (window.AudioContext || window.webkitAudioContext!)({
        sampleRate: getQualitySettings(audioQuality).sampleRate
      });

      setProgress(30);

      // Create media element source
      const source = audioContext.createMediaElementSource(videoElement);
      const destination = audioContext.createMediaStreamDestination();
      source.connect(destination);

      setProgress(40);

      // Determine MIME type based on format preference and browser support
      let mimeType = '';
      let fileExtension: string = audioFormat;

      if (audioFormat === 'mp3') {
        // Most browsers don't support MP3 recording, fallback to WebM
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
          fileExtension = 'webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
          fileExtension = 'mp4';
        }
      } else if (audioFormat === 'wav') {
        if (MediaRecorder.isTypeSupported('audio/wav')) {
          mimeType = 'audio/wav';
        } else {
          mimeType = 'audio/webm;codecs=opus';
          fileExtension = 'webm';
        }
      } else if (audioFormat === 'webm') {
        mimeType = 'audio/webm;codecs=opus';
      } else {
        mimeType = 'audio/webm;codecs=opus';
        fileExtension = 'webm';
      }

      const mediaRecorder = new MediaRecorder(destination.stream, {
        mimeType: mimeType || undefined,
        audioBitsPerSecond: getQualitySettings(audioQuality).bitrate
      });

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      setProgress(50);

      // Start recording
      mediaRecorder.start(1000);
      videoElement.currentTime = 0;
      await videoElement.play();

      // Update progress during playback
      const progressInterval = setInterval(() => {
        if (videoElement.currentTime > 0 && duration > 0) {
          const playbackProgress = (videoElement.currentTime / duration) * 40;
          setProgress(50 + Math.round(playbackProgress));
        }
      }, 500);

      // Wait for video to finish
      await new Promise<void>((resolve) => {
        videoElement.onended = () => {
          clearInterval(progressInterval);
          resolve();
        };

        setTimeout(() => {
          clearInterval(progressInterval);
          resolve();
        }, (duration + 2) * 1000);
      });

      setProgress(90);

      // Stop recording and process result
      mediaRecorder.stop();

      await new Promise<void>((resolve) => {
        mediaRecorder.onstop = () => {
          try {
            if (chunks.length === 0) {
              throw new Error('No audio data recorded');
            }

            const audioBlob = new Blob(chunks, { type: mimeType });
            const audioUrl = URL.createObjectURL(audioBlob);
            setConvertedAudioUrl(audioUrl);

            // Calculate stats
            const durationMinutes = Math.floor(duration / 60);
            const durationSeconds = Math.floor(duration % 60);
            const durationString = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;

            setStats({
              originalSize: video.size,
              convertedSize: audioBlob.size,
              duration: durationString,
              format: fileExtension.toUpperCase()
            });

            setProgress(100);
            resolve();
          } catch (err) {
            throw err;
          }
        };
      });

      setLoading(false);

      // Cleanup
      URL.revokeObjectURL(videoElement.src);
      audioContext.close();

    } catch (error) {
      console.error('Error converting video to audio:', error);

      let errorMessage = 'Error converting video to audio. ';
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage += 'The video took too long to process.';
        } else if (error.message.includes('load')) {
          errorMessage += 'Could not load the video file.';
        } else if (error.message.includes('duration')) {
          errorMessage += 'Invalid video file.';
        } else {
          errorMessage += 'Please try a different video file.';
        }
      } else {
        errorMessage += 'Please try a different video file.';
      }

      setError(errorMessage);
      setLoading(false);
      setProgress(0);
    }
  };

  // Download converted audio
  const downloadAudio = () => {
    if (!convertedAudioUrl || !video || !stats) return;

    const link = document.createElement('a');
    link.href = convertedAudioUrl;
    const fileName = video.name.replace(/\.[^/.]+$/, '');
    const extension = stats.format.toLowerCase();
    link.download = `${fileName}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const clearVideo = () => {
    if (convertedAudioUrl) {
      URL.revokeObjectURL(convertedAudioUrl);
    }
    setVideo(null);
    setStats(null);
    setError('');
    setConvertedAudioUrl('');
    setProgress(0);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="video-to-audio">
      <div className="container">
        <header className="header">
          <h1>Video to Audio Converter</h1>
          <p className="description">
            Extract high-quality audio from your video files using built-in browser technology.
          </p>
        </header>

        <div className="main-content">
          <div className="upload-container">
            <div
              className={`upload-area ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
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
                  <div className="upload-icon">🎬</div>
                  <p>Drag and drop your video here</p>
                  <p className="file-types">Supports MP4, MOV, AVI, WebM (max 200MB)</p>
                  <button
                    type="button"
                    className="select-button"
                    onClick={() => inputRef.current?.click()}
                  >
                    Select Video
                  </button>
                </div>
              ) : (
                <div className="video-preview-container">
                  <div className="video-preview">
                    <video src={URL.createObjectURL(video)} controls className="video-element" />
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
                        <span>{formatFileSize(video.size)}</span>
                      </div>
                      <div className="info-item">
                        <span>Type</span>
                        <span>{video.type.split('/')[1]?.toUpperCase() || 'VIDEO'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {video && (
              <>
                <div className="conversion-options">
                  <h3>Audio Settings</h3>

                  <div className="options-grid">
                    <div className="option-group">
                      <label>Preferred Format:</label>
                      <div className="format-buttons">
                        <button
                          className={`format-button ${audioFormat === 'mp3' ? 'active' : ''}`}
                          onClick={() => setAudioFormat('mp3')}
                          disabled={loading}
                          title="Will convert to WebM if MP3 not supported"
                        >
                          MP3*
                        </button>
                        <button
                          className={`format-button ${audioFormat === 'wav' ? 'active' : ''}`}
                          onClick={() => setAudioFormat('wav')}
                          disabled={loading}
                          title="High quality uncompressed audio"
                        >
                          WAV
                        </button>
                        <button
                          className={`format-button ${audioFormat === 'webm' ? 'active' : ''}`}
                          onClick={() => setAudioFormat('webm')}
                          disabled={loading}
                          title="Best browser compatibility"
                        >
                          WEBM
                        </button>
                      </div>
                      <p className="format-note">
                        *MP3 may be converted to WebM for browser compatibility
                      </p>
                    </div>

                    <div className="option-group">
                      <label>Audio Quality:</label>
                      <div className="quality-buttons">
                        <button
                          className={`quality-button ${audioQuality === 'low' ? 'active' : ''}`}
                          onClick={() => setAudioQuality('low')}
                          disabled={loading}
                        >
                          Low (128k)
                        </button>
                        <button
                          className={`quality-button ${audioQuality === 'medium' ? 'active' : ''}`}
                          onClick={() => setAudioQuality('medium')}
                          disabled={loading}
                        >
                          Medium (192k)
                        </button>
                        <button
                          className={`quality-button ${audioQuality === 'high' ? 'active' : ''}`}
                          onClick={() => setAudioQuality('high')}
                          disabled={loading}
                        >
                          High (320k)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="conversion-controls">
                  <button
                    onClick={convertVideoToAudio}
                    disabled={loading}
                    className="convert-button"
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        <span>Converting... {progress}%</span>
                      </>
                    ) : (
                      `Extract Audio`
                    )}
                  </button>

                  <button
                    onClick={clearVideo}
                    className="clear-button"
                    disabled={loading}
                  >
                    Upload New Video
                  </button>

                  {loading && (
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="progress-text">{progress}%</span>
                    </div>
                  )}

                  {stats && convertedAudioUrl && (
                    <>
                      <div className="conversion-stats">
                        <h3>Conversion Results</h3>
                        <div className="stats-grid">
                          <div className="stat-item">
                            <span>Original Size</span>
                            <span>{formatFileSize(stats.originalSize)}</span>
                          </div>
                          <div className="stat-item">
                            <span>Audio Size</span>
                            <span>{formatFileSize(stats.convertedSize)}</span>
                          </div>
                          <div className="stat-item">
                            <span>Duration</span>
                            <span>{stats.duration}</span>
                          </div>
                          <div className="stat-item">
                            <span>Format</span>
                            <span>{stats.format}</span>
                          </div>
                        </div>
                      </div>

                      <div className="audio-preview">
                        <h3>Audio Preview</h3>
                        <audio src={convertedAudioUrl} controls className="audio-player" />
                      </div>

                      <button
                        onClick={downloadAudio}
                        className="download-button"
                      >
                        Download Audio File
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Middle Ad */}

        <section className="features-section">
          <h2>Simple & Reliable Audio Extraction</h2>
          <div className="features">
            <div className="feature">
              <h3>🎵 Browser-Based</h3>
              <p>Uses built-in browser technology - no external dependencies or complex setup required.</p>
            </div>
            <div className="feature">
              <h3>🔒 Complete Privacy</h3>
              <p>All processing happens locally in your browser. Your files never leave your device.</p>
            </div>
            <div className="feature">
              <h3>⚡ Fast & Simple</h3>
              <p>Quick audio extraction with real-time progress tracking and instant playback.</p>
            </div>
          </div>
        </section>

        <RelatedTools
          currentTool="/tools/video-to-audio"
          category="Media Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}