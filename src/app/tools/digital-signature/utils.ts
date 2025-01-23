export const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

export const initializeCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  color: string,
  penSize: number,
  backgroundColor: string
) => {
  canvas.width = 600;
  canvas.height = 200;
  
  context.scale(1, 1);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  context.strokeStyle = color;
  context.lineWidth = penSize;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const downloadSignature = (
  canvas: HTMLCanvasElement,
  format: string,
  transparentBg: boolean,
  backgroundColor: string
) => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  const tempCtx = tempCanvas.getContext('2d');
  
  if (!tempCtx) return;

  if (transparentBg) {
    // Handle transparent background
    const originalCanvas = canvas.getContext('2d');
    if (!originalCanvas) return;
    
    const imageData = originalCanvas.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const bgRGB = hexToRgb(backgroundColor);
    
    if (bgRGB) {
      const threshold = 10; // Tolerance for color matching

      // Make background color transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (Math.abs(r - bgRGB.r) < threshold && 
            Math.abs(g - bgRGB.g) < threshold && 
            Math.abs(b - bgRGB.b) < threshold) {
          data[i + 3] = 0; // Make pixel transparent
        }
      }

      tempCtx.putImageData(imageData, 0, 0);
    }
  } else {
    // For non-transparent background
    tempCtx.fillStyle = backgroundColor;
    tempCtx.fillRect(0, 0, canvas.width, canvas.height);
    tempCtx.drawImage(canvas, 0, 0);
  }

  // Handle SVG format
  if (format === 'svg') {
    const svgString = `
      <svg width="${canvas.width}" height="${canvas.height}" xmlns="http://www.w3.org/2000/svg">
        <image width="${canvas.width}" height="${canvas.height}" 
               href="${tempCanvas.toDataURL('image/png')}"/>
      </svg>
    `;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `signature${transparentBg ? '_transparent' : ''}.svg`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return;
  }

  // For PNG and JPEG
  const dataUrl = tempCanvas.toDataURL(`image/${format}`);
  const link = document.createElement('a');
  link.download = `signature${transparentBg ? '_transparent' : ''}.${format}`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 