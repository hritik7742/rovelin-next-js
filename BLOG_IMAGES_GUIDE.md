# Blog Images Guide

## 📁 Where to Put Blog Images

All blog images should be placed in: **`public/images/blog/`**

This directory is already set up and ready to use!

## 🖼️ Image Path in Blog Posts

When you add an image to your blog post frontmatter, use this path format:

```yaml
---
title: "Your Blog Post Title"
description: "Your description"
date: "2025-01-15"
author: "Rovelin Team"
tags: ["tag1", "tag2"]
image: "/images/blog/your-image-name.jpg"
published: true
---
```

**Important:** The path starts with `/images/blog/` (not `public/images/blog/`)

## 📏 Recommended Image Specifications

### Featured Images (for blog cards and headers)
- **Dimensions**: 1200 x 630 pixels (Open Graph standard)
- **Aspect Ratio**: 1.91:1
- **Format**: JPG or PNG (WebP for better compression)
- **File Size**: Under 200KB (optimized)
- **Quality**: High quality but compressed

### Content Images (inside blog posts)
- **Max Width**: 1200 pixels
- **Format**: JPG, PNG, or WebP
- **File Size**: Under 500KB
- **Quality**: Optimized for web

## 📝 Naming Convention

Use descriptive, SEO-friendly names with hyphens:

✅ **Good Examples:**
- `nextjs-14-tutorial-hero.jpg`
- `typescript-advanced-patterns.png`
- `react-hooks-guide.jpg`
- `web-development-tips.png`

❌ **Bad Examples:**
- `IMG_1234.jpg`
- `screenshot.png`
- `image1.jpg`
- `photo.png`

## 🎨 How to Add Images to Your Blog Posts

### Option 1: Featured Image (Shows in cards and header)

Add to the frontmatter:
```yaml
---
image: "/images/blog/my-awesome-post.jpg"
---
```

### Option 2: No Featured Image (Optional)

Simply omit the `image` field or leave it empty:
```yaml
---
title: "My Post"
# No image field needed
---
```

### Option 3: Images Inside Blog Content

Use standard Markdown syntax:
```markdown
![Alt text description](/images/blog/content-image.jpg)
```

Or use HTML for more control:
```html
<img src="/images/blog/content-image.jpg" alt="Description" />
```

## 🔧 Image Optimization Tools

Before uploading images, optimize them:

### Online Tools (Free)
- **TinyPNG**: https://tinypng.com/ (PNG/JPG compression)
- **Squoosh**: https://squoosh.app/ (Google's image optimizer)
- **Compressor.io**: https://compressor.io/ (Multiple formats)

### Desktop Tools
- **ImageOptim** (Mac): https://imageoptim.com/
- **RIOT** (Windows): https://riot-optimizer.com/
- **GIMP** (Cross-platform): https://www.gimp.org/

### Command Line
```bash
# Using ImageMagick
magick convert input.jpg -quality 85 -resize 1200x630 output.jpg

# Using cwebp for WebP
cwebp -q 85 input.jpg -o output.webp
```

## 🎯 Where to Find Free Images

### Stock Photo Sites
- **Unsplash**: https://unsplash.com/ (High-quality, free)
- **Pexels**: https://www.pexels.com/ (Free stock photos)
- **Pixabay**: https://pixabay.com/ (Free images and videos)
- **Freepik**: https://www.freepik.com/ (Free with attribution)

### Tech-Specific Images
- **Undraw**: https://undraw.co/ (Customizable illustrations)
- **Heroicons**: https://heroicons.com/ (Icons)
- **Lucide**: https://lucide.dev/ (Icon library)

### Create Your Own
- **Canva**: https://www.canva.com/ (Design tool)
- **Figma**: https://www.figma.com/ (Design tool)
- **Excalidraw**: https://excalidraw.com/ (Diagrams)

## ✅ Alt Text Best Practices

Always include descriptive alt text for accessibility:

✅ **Good Alt Text:**
- "Next.js App Router file structure showing nested routes"
- "TypeScript interface example with type annotations"
- "React component lifecycle diagram"

❌ **Bad Alt Text:**
- "Image"
- "Screenshot"
- "Photo"
- "Picture1"

## 📋 Quick Checklist

Before publishing a blog post with images:

- [ ] Image is placed in `public/images/blog/`
- [ ] Image is optimized (under 200KB for featured images)
- [ ] Filename is descriptive and SEO-friendly
- [ ] Image path in frontmatter is correct: `/images/blog/filename.jpg`
- [ ] Alt text is descriptive and meaningful
- [ ] Image dimensions are appropriate (1200x630 for featured)
- [ ] Image format is web-friendly (JPG, PNG, or WebP)

## 🚀 Example Blog Post with Image

```yaml
---
title: "Getting Started with Next.js 14"
description: "Learn how to build modern web applications with Next.js 14"
date: "2025-01-15"
author: "Rovelin Team"
tags: ["Next.js", "React", "Tutorial"]
image: "/images/blog/nextjs-14-getting-started.jpg"
published: true
---

Your blog content here...

![Next.js App Router structure](/images/blog/nextjs-app-router.png)

More content...
```

## 🔍 Troubleshooting

### Image Not Showing?

1. **Check the file path**: Make sure the image is in `public/images/blog/`
2. **Check the frontmatter**: Path should be `/images/blog/filename.jpg`
3. **Check the filename**: Make sure it matches exactly (case-sensitive)
4. **Restart dev server**: Sometimes Next.js needs a restart to pick up new images
5. **Clear browser cache**: Hard refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### Image Too Large?

1. **Resize**: Use an image editor to resize to 1200x630
2. **Compress**: Use TinyPNG or Squoosh to reduce file size
3. **Convert to WebP**: Better compression than JPG/PNG

### Image Quality Poor?

1. **Use higher quality source**: Start with a high-resolution image
2. **Adjust compression**: Don't compress too much (aim for 85% quality)
3. **Use correct format**: JPG for photos, PNG for graphics with transparency

## 💡 Pro Tips

1. **Use WebP format** when possible for better compression
2. **Create a template** for consistent featured image sizes
3. **Keep a backup** of original high-res images
4. **Use descriptive filenames** for better SEO
5. **Test on mobile** to ensure images look good on all devices
6. **Consider dark mode** - some images may need adjustments

---

**Need Help?** If you have questions about blog images, refer to this guide or check the `public/images/blog/README.md` file.
