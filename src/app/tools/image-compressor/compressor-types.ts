export const compressorVariants = {
  'webp-compressor': {
    title: 'WebP Image Compressor',
    description: 'Compress WebP images while maintaining excellent quality and transparency.',
    allowedInputs: ['webp'],
    outputFormat: 'webp',
    metaDescription: 'Compress WebP images online for free. Reduce WebP file sizes while maintaining quality and transparency.',
    keywords: 'webp compressor, compress webp, webp optimizer, reduce webp size, webp image compression'
  },
  'png-compressor': {
    title: 'PNG Image Compressor',
    description: 'Compress PNG images while preserving transparency and quality.',
    allowedInputs: ['png'],
    outputFormat: 'png',
    metaDescription: 'Compress PNG images online for free. Reduce PNG file sizes while maintaining transparency and quality.',
    keywords: 'png compressor, compress png, png optimizer, reduce png size, png image compression'
  },
  'jpeg-compressor': {
    title: 'JPEG Image Compressor',
    description: 'Compress JPEG/JPG images with advanced optimization algorithms.',
    allowedInputs: ['jpg', 'jpeg'],
    outputFormat: 'jpeg',
    metaDescription: 'Compress JPEG images online for free. Reduce JPG file sizes while maintaining photo quality.',
    keywords: 'jpeg compressor, jpg compressor, compress jpeg, compress jpg, jpeg optimizer, reduce jpeg size'
  },
  'gif-compressor': {
    title: 'GIF Image Compressor',
    description: 'Compress GIF images and animations while preserving quality.',
    allowedInputs: ['gif'],
    outputFormat: 'gif',
    metaDescription: 'Compress GIF images online for free. Reduce GIF file sizes while maintaining animation quality.',
    keywords: 'gif compressor, compress gif, gif optimizer, reduce gif size, gif image compression, animated gif compressor'
  }
};

export type CompressorVariant = keyof typeof compressorVariants;