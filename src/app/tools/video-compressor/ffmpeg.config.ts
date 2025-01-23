import { createFFmpeg } from '@ffmpeg/ffmpeg';

export const getFFmpeg = () => {
  return createFFmpeg({
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js'
  });
}; 