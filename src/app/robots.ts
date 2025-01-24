import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/privacy-policy',
        '/privacy-policy/*'  // This will block all privacy policy pages including product-specific ones
      ]
    },
    sitemap: 'https://www.rovelin.com/sitemap.xml'
  }
} 