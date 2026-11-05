import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { LOCALIZED_LANGUAGES } from '@/lib/i18n/languages'
import { TOOLS_REGISTRY } from '@/lib/i18n/tools-registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.rovelin.com'

  // Core English pages
  const corePages = [
    '',
    'about',
    'contact',
    'services',
    'pricing',
    'Our-products',
    'tools',
    'blog'
  ].map(route => ({
    url: `${baseUrl}${route ? `/${route}` : ''}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // English Tool pages (Preserving existing rankings and canonical URLs)
  const englishToolRoutes = TOOLS_REGISTRY.map(tool => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }))

  // Localized Tools Index pages (50 languages)
  const localizedIndexRoutes = LOCALIZED_LANGUAGES.map(lang => ({
    url: `${baseUrl}/${lang.code}/tools`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  // Localized Programmatic SEO Tool pages (50 languages * 46 tools = 2,300 pages)
  const localizedToolRoutes: MetadataRoute.Sitemap = []
  for (const lang of LOCALIZED_LANGUAGES) {
    for (const tool of TOOLS_REGISTRY) {
      localizedToolRoutes.push({
        url: `${baseUrl}/${lang.code}/tools/${tool.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7
      })
    }
  }

  // Blog posts — safeDate guards against "Invalid time value" crashes
  const safeDate = (dateStr: string): Date => {
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const posts = getAllPosts()
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: safeDate(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))

  return [
    ...corePages,
    ...englishToolRoutes,
    ...localizedIndexRoutes,
    ...localizedToolRoutes,
    ...blogRoutes
  ]
}
