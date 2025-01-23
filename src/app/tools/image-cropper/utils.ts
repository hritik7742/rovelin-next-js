export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

export const drawShapes = {
  heart: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const scale = Math.min(width, height) / 100;
    ctx.beginPath();
    ctx.moveTo(50 * scale, 90 * scale);
    ctx.bezierCurveTo(
      50 * scale, 90 * scale,
      90 * scale, 70 * scale,
      90 * scale, 40 * scale
    );
    ctx.bezierCurveTo(
      90 * scale, 20 * scale,
      70 * scale, 10 * scale,
      50 * scale, 10 * scale
    );
    ctx.bezierCurveTo(
      30 * scale, 10 * scale,
      10 * scale, 20 * scale,
      10 * scale, 40 * scale
    );
    ctx.bezierCurveTo(
      10 * scale, 70 * scale,
      50 * scale, 90 * scale,
      50 * scale, 90 * scale
    );
    ctx.fill();
  },

  triangle: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.beginPath();
    ctx.moveTo(width / 2, height * 0.1); // Top point
    ctx.lineTo(width * 0.1, height * 0.9); // Bottom left
    ctx.lineTo(width * 0.9, height * 0.9); // Bottom right
    ctx.closePath();
    ctx.fill();
  },

  hexagon: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const size = Math.min(width, height) * 0.4;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  },

  diamond: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const size = Math.min(width, height) * 0.4;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY - size); // Top
    ctx.lineTo(centerX + size, centerY); // Right
    ctx.lineTo(centerX, centerY + size); // Bottom
    ctx.lineTo(centerX - size, centerY); // Left
    ctx.closePath();
    ctx.fill();
  },

  octagon: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const size = Math.min(width, height) * 0.4;
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = centerX + size * Math.cos(angle);
      const y = centerY + size * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  },

  star: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const outerRadius = Math.min(width, height) * 0.4;
    const innerRadius = outerRadius * 0.4;
    const spikes = 5;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes - Math.PI / 2;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }
};

export const getCroppedImg = async (
  imageSrc: string, 
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  shape = 'rectangle'
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Draw the cropped image
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.translate(-canvas.width / 2, -canvas.height / 2);

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  ctx.restore();

  // Apply shape mask if needed
  if (shape !== 'rectangle' && shape !== 'freeform') {
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fillStyle = 'black';

    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else if (drawShapes[shape as keyof typeof drawShapes]) {
      drawShapes[shape as keyof typeof drawShapes](ctx, canvas.width, canvas.height);
    }
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      }
    }, 'image/png');
  });
}; 