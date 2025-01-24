import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rovelin.com'

  // All tool pages
  const toolPages = [
    'archive-converter',
    'base64-image',
    'color-picker',
    'comma-separator',
    'credit-card-generator',
    'digital-signature',
    'email-extractor',
    'emoji-generator',
    'html-formatter',
    'image-cropper',
    'image-resizer',
    'image-to-text',
    'js-minifier',
    'json-formatter',
    'lorem-generator',
    'markdown-to-html',
    'name-wheel',
    'password-generator',
    'phone-generator',
    'phone-number-extractor',
    'qr-generator',
    'random-name-generator',
    'text-diff',
    'unit-converter',
    'word-counter'
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