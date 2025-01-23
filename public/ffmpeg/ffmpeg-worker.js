importScripts('https://unpkg.com/@ffmpeg/core@0.12.4/dist/ffmpeg-core.js');

function createFFmpegCore() {
  return FFmpegCore;
}

self.onmessage = function (e) {
  const { type, data } = e.data;
  if (type === 'init') {
    createFFmpegCore().then((core) => {
      self.postMessage({ type: 'ready', data: core });
    });
  }
}; 