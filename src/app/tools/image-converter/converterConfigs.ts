export const converterVariants = {
  'jpg-to-png': {
    title: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format with transparency support.',
    defaultTarget: 'png',
    allowedInputs: ['jpg', 'jpeg'],
    allowedOutputs: ['png'],
    metaDescription: 'Convert JPG to PNG online with our free converter. Maintain quality and add transparency to your images.',
    keywords: 'jpg to png, jpeg to png, convert jpg to png, jpg png converter'
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format with optimized compression.',
    defaultTarget: 'jpg',
    allowedInputs: ['png'],
    allowedOutputs: ['jpg'],
    metaDescription: 'Convert PNG to JPG online with our free converter. Optimize file size while maintaining quality.',
    keywords: 'png to jpg, convert png to jpg, png jpg converter'
  },
  'webp-to-jpg': {
    title: 'WebP to JPG Converter',
    description: 'Convert WebP images to JPG format for better compatibility.',
    defaultTarget: 'jpg',
    allowedInputs: ['webp'],
    allowedOutputs: ['jpg'],
    metaDescription: 'Convert WebP to JPG online. Free tool to convert WebP images to JPG format.',
    keywords: 'webp to jpg, convert webp to jpg, webp jpg converter'
  },
  'image-to-pdf': {
    title: 'Image to PDF Converter',
    description: 'Convert images to PDF format easily.',
    defaultTarget: 'pdf',
    allowedInputs: ['jpg', 'jpeg', 'png', 'webp'],
    allowedOutputs: ['pdf'],
    metaDescription: 'Convert images to PDF online. Free tool to convert JPG, PNG, WebP to PDF format.',
    keywords: 'image to pdf, jpg to pdf, png to pdf, convert image to pdf'
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter',
    description: 'Convert PDF files to JPG images.',
    defaultTarget: 'jpg',
    allowedInputs: ['pdf'],
    allowedOutputs: ['jpg'],
    metaDescription: 'Convert PDF to JPG online. Free tool to convert PDF pages to JPG images.',
    keywords: 'pdf to jpg, convert pdf to jpg, pdf jpg converter'
  },
  'heic-to-jpg': {
    title: 'HEIC to JPG Converter',
    description: 'Convert HEIC/HEIF images from iPhone to JPG format.',
    defaultTarget: 'jpg',
    allowedInputs: ['heic', 'heif'],
    allowedOutputs: ['jpg'],
    metaDescription: 'Convert HEIC to JPG online. Free tool to convert iPhone HEIC photos to JPG format.',
    keywords: 'heic to jpg, convert heic to jpg, iphone photo converter'
  },
  'svg-converter': {
    title: 'SVG Converter',
    description: 'Convert SVG files to PNG/JPG or vice versa.',
    defaultTarget: 'png',
    allowedInputs: ['svg', 'png', 'jpg'],
    allowedOutputs: ['svg', 'png', 'jpg'],
    metaDescription: 'Convert SVG files online. Free tool to convert between SVG, PNG, and JPG formats.',
    keywords: 'svg converter, svg to png, svg to jpg, convert svg'
  },
  'pdf-to-png': {
    title: 'PDF to PNG Converter',
    description: 'Convert PDF files to PNG images.',
    defaultTarget: 'png',
    allowedInputs: ['pdf'],
    allowedOutputs: ['png'],
    metaDescription: 'Convert PDF to PNG online. Free tool to convert PDF pages to PNG images.',
    keywords: 'pdf to png, convert pdf to png, pdf png converter'
  }
};

export type ConverterVariant = keyof typeof converterVariants; 