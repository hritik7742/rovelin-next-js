# Blog Images Directory

Place your blog featured images and content images here.

## Recommended Sizes

### Featured Images (Post Cards)
- **Dimensions**: 1200 x 630 pixels
- **Format**: JPG or PNG
- **File size**: < 200KB (optimized)
- **Aspect ratio**: 1.91:1 (Open Graph standard)

### Content Images
- **Max width**: 1200 pixels
- **Format**: JPG, PNG, or WebP
- **File size**: < 500KB (optimized)

## Naming Convention

Use descriptive, SEO-friendly names:
- ✅ `nextjs-tutorial-hero.jpg`
- ✅ `typescript-advanced-patterns.png`
- ❌ `IMG_1234.jpg`
- ❌ `screenshot.png`

## Image Optimization

Before uploading, optimize your images:
- Use tools like TinyPNG, ImageOptim, or Squoosh
- Compress without losing quality
- Consider using WebP format for better compression

## Usage in Blog Posts

### Featured Image (Frontmatter)
```yaml
---
image: "/images/blog/my-post-image.jpg"
---
```

### Content Images (MDX)
```mdx
<Image 
  src="/images/blog/content-image.jpg" 
  alt="Descriptive alt text"
  caption="Optional caption"
/>
```

Or use standard Markdown:
```mdx
![Alt text](/images/blog/content-image.jpg)
```

## Alt Text Best Practices

Always include descriptive alt text:
- ✅ "Next.js App Router file structure diagram"
- ✅ "TypeScript interface example with syntax highlighting"
- ❌ "Image"
- ❌ "Screenshot"

## Example Images

You can use placeholder images while developing:
- [Unsplash](https://unsplash.com/) - Free high-quality photos
- [Pexels](https://www.pexels.com/) - Free stock photos
- [Placeholder.com](https://placeholder.com/) - Placeholder images

---

**Note**: This directory is currently empty. Add your blog images here!
