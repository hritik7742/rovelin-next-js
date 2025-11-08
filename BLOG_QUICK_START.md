# 🚀 Blog Quick Start Guide

## Installation (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. View Your Blog

Open [http://localhost:3000/blog](http://localhost:3000/blog)

## Create Your First Post (2 minutes)

### 1. Create File

Create `content/posts/my-first-post.mdx`

### 2. Add Content

```mdx
---
title: "My First Blog Post"
description: "This is my first post on the new blog!"
date: "2025-01-15"
author: "Your Name"
tags: ["Getting Started", "Blog"]
published: true
---

## Welcome!

This is my first blog post. Here's what I'll be writing about:

- Web development tips
- Technology tutorials
- Project updates

### Code Example

```javascript
console.log("Hello, Blog!");
```

<Callout type="success">
Your blog is now live!
</Callout>
```

### 3. View Your Post

Visit: `http://localhost:3000/blog/my-first-post`

## Publishing to Production

### Option 1: Vercel (Recommended)

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add blog system"
   git push origin main
   ```

2. Import project on [Vercel](https://vercel.com)
3. Deploy automatically!

### Option 2: Netlify

1. Push to GitHub
2. Import project on [Netlify](https://netlify.com)
3. Deploy automatically!

### Option 3: Self-Hosted

```bash
npm run build
npm start
```

## Essential Features

### ✅ What's Included

- **Blog Listing**: `/blog`
- **Individual Posts**: `/blog/[slug]`
- **Tag Filtering**: `/blog/tag/[tag]`
- **RSS Feed**: `/blog/rss.xml`
- **Search & Filter**: Built-in
- **Pagination**: 10 posts per page
- **SEO Optimized**: Automatic metadata
- **Syntax Highlighting**: For code blocks
- **Social Sharing**: Twitter, Facebook, LinkedIn
- **Related Posts**: Based on tags
- **Newsletter Signup**: Ready to integrate
- **Dark Mode**: Supported
- **Mobile Responsive**: Fully responsive

### 📝 Custom Components

Use these in your MDX files:

```mdx
<!-- Info Box -->
<Callout type="info">
Important information here
</Callout>

<!-- Warning Box -->
<Callout type="warning">
Warning message here
</Callout>

<!-- Success Box -->
<Callout type="success">
Success message here
</Callout>

<!-- YouTube Video -->
<YouTube id="VIDEO_ID" />

<!-- Image with Caption -->
<Image 
  src="/images/blog/photo.jpg" 
  alt="Description"
  caption="Photo caption"
/>
```

## File Structure

```
content/posts/          ← Your blog posts go here
src/app/blog/          ← Blog pages
src/components/blog/   ← Blog components
src/lib/blog.ts        ← Blog utilities
```

## Common Tasks

### Add Featured Image

1. Place image in `public/images/blog/`
2. Add to frontmatter:
   ```yaml
   image: "/images/blog/my-image.jpg"
   ```

### Create Draft Post

Set `published: false` in frontmatter:

```yaml
---
published: false
---
```

### Change Posts Per Page

Edit `src/app/blog/page.tsx`:

```typescript
const POSTS_PER_PAGE = 10; // Change this number
```

### Customize Colors

Edit `src/app/globals.css`:

```css
:root {
  --accent-color: #7c3aed; /* Change this */
}
```

## SEO Checklist

For each post:

- ✅ Compelling title (50-60 characters)
- ✅ Meta description (150-160 characters)
- ✅ Featured image (1200x630px)
- ✅ 3-5 relevant tags
- ✅ Alt text for images
- ✅ Internal/external links
- ✅ 1000+ words for better ranking

## Troubleshooting

### Post Not Showing?

1. Check frontmatter syntax
2. Ensure `published: true`
3. Restart dev server
4. Check file is `.mdx` extension

### Code Not Highlighting?

Use triple backticks with language:

````
```javascript
code here
```
````

### Images Not Loading?

- Place in `public/images/blog/`
- Reference as `/images/blog/filename.jpg`

## Next Steps

1. ✅ Create 2-3 initial posts
2. ✅ Customize colors and branding
3. ✅ Add your logo
4. ✅ Set up newsletter integration
5. ✅ Submit sitemap to Google Search Console
6. ✅ Share on social media

## Need Help?

- 📖 Full documentation: `BLOG_SETUP.md`
- 🌐 Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)
- 📝 MDX docs: [mdxjs.com](https://mdxjs.com)

---

**You're all set!** Start creating amazing content! 🎉
