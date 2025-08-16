import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rovelin.com'

  // All tool pages
  const toolPages = [
    'archive-converter',
    'base64-converter',
    'base64-image',
    'color-picker',
    'comma-separator',
    'credit-card-generator',
    'css-minifier',
    'digital-signature',
    'email-extractor',
    'emoji-generator',
    'gif-compressor',
    'gradient-generator',
    'heic-to-jpg',
    'html-formatter',
    'image-compressor',
    'image-converter',
    'image-cropper',
    'image-resizer',
    'image-to-pdf',
    'image-to-text',
    'jpeg-compressor',
    'jpg-to-png',
    'js-minifier',
    'json-formatter',
    'lorem-generator',
    'markdown-to-html',
    'name-wheel',
    'password-generator',
    'pdf-to-jpg',
    'pdf-to-png',
    'pdf-to-word',
    'phone-generator',
    'phone-number-extractor',
    'png-compressor',
    'png-to-jpg',
    'qr-generator',
    'random-name-generator',
    'svg-converter',
    'text-diff',
    'text-paragraph-splitter',
    'unit-converter',
    'url-encoder-decoder',
    'video-compressor',
    'video-to-audio',
    'webp-compressor',
    'webp-to-jpg',
    'word-counter',
    
  ]

  // Core pages
  const corePages = [
    '',
    'about',
    'contact',
    'services',
    'pricing',
    'Our-products',
    'tools'
  ].map(route => ({
    url: `${baseUrl}${route ? `/${route}` : ''}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Tool pages
  const toolRoutes = toolPages.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...corePages, ...toolRoutes]
} 