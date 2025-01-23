export const convertDimension = (value: number, fromUnit: string, toUnit: string): number => {
  const pxConversions = {
    px: 1,
    mm: 3.7795275591,
    cm: 37.795275591,
    inch: 96
  };
  
  const px = value * pxConversions[fromUnit as keyof typeof pxConversions];
  return Math.round(px / pxConversions[toUnit as keyof typeof pxConversions]);
};

export const getPreviewStyle = (
  dimensions: { width: string; height: string },
  unit: string
): React.CSSProperties => {
  if (!dimensions.width || !dimensions.height) return {};
  
  const pxWidth = convertDimension(Number(dimensions.width), unit, 'px');
  const pxHeight = convertDimension(Number(dimensions.height), unit, 'px');
  
  // Calculate the aspect ratio of the preview container (400x400)
  const containerWidth = 400;
  const containerHeight = 400;
  const containerRatio = containerWidth / containerHeight;
  
  // Calculate the aspect ratio of the resized image
  const imageRatio = pxWidth / pxHeight;
  
  let previewWidth, previewHeight;
  
  if (imageRatio > containerRatio) {
    // Image is wider than container
    previewWidth = containerWidth;
    previewHeight = containerWidth / imageRatio;
  } else {
    // Image is taller than container
    previewHeight = containerHeight;
    previewWidth = containerHeight * imageRatio;
  }
  
  return {
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
    objectFit: 'fill' as const // Changed from 'contain' to 'fill'
  };
}; 