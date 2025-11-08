# 🖼️ Blog Images - Quick Start

## TL;DR - The Essentials

### Where to Put Images
```
public/images/blog/your-image-name.jpg
```

### How to Reference in Blog Posts
```yaml
---
title: "Your Post"
image: "/images/blog/your-image-name.jpg"
---
```

**Note:** Path starts with `/images/blog/` (NOT `public/images/blog/`)

## Image Specs

| Type | Size | Format | Max File Size |
|------|------|--------|---------------|
| Featured Image | 1200 x 630 px | JPG/PNG/WebP | 200KB |
| Content Image | Max 1200px wide | JPG/PNG/WebP | 500KB |

## Quick Steps

1. **Optimize your image** using [TinyPNG](https://tinypng.com/)
2. **Rename** to something descriptive: `nextjs-tutorial-hero.jpg`
3. **Place** in `public/images/blog/`
4. **Reference** in frontmatter: `image: "/images/blog/nextjs-tutorial-hero.jpg"`
5. **Done!** ✅

## Image is Optional!

You don't need to add an image. Just omit the `image` field:

```yaml
---
title: "My Post"
description: "Description"
date: "2025-01-15"
author: "Your Name"
tags: ["tag1", "tag2"]
# No image field - totally fine!
---
```

## Need More Details?

📖 See **`BLOG_IMAGES_GUIDE.md`** for the complete guide with:
- Optimization tools
- Where to find free images
- Troubleshooting tips
- Best practices
- And more!

---

**That's it!** You're ready to add images to your blog posts. 🎉
