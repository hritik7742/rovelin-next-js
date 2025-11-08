# 📋 Blog Publishing Quick Reference

## ⚡ Quick Start (3 Steps)

### 1. Create File
```
content/posts/my-post.mdx
```

### 2. Add This Template
```mdx
---
title: "Your Post Title"
description: "Brief description (150-160 chars)"
date: "2025-01-15"
author: "Your Name"
tags: ["Tag1", "Tag2", "Tag3"]
published: true
---

## Your Content Here

Write your blog post using Markdown...
```

### 3. Publish
```bash
git add .
git commit -m "Add blog post"
git push origin main
```

**Done!** Your post goes live automatically! 🎉

---

## 📝 Frontmatter Fields

| Field | Required | Example |
|-------|----------|---------|
| `title` | ✅ | `"10 JavaScript Tips"` |
| `description` | ✅ | `"Learn essential JS tips..."` |
| `date` | ✅ | `"2025-01-15"` |
| `author` | ✅ | `"Your Name"` |
| `tags` | ✅ | `["JavaScript", "Tips"]` |
| `image` | ❌ | `"/images/blog/image.jpg"` |
| `published` | ❌ | `true` or `false` |

---

## 🎨 Markdown Cheat Sheet

```markdown
## Heading 2
### Heading 3

**bold** and *italic*

- Bullet list
- Another item

1. Numbered list
2. Another item

[Link](https://example.com)

![Image](/images/blog/image.jpg)

> Blockquote or callout

```javascript
// Code block
console.log("Hello!");
```
```

---

## 📁 File Structure

```
content/posts/
  ├── my-first-post.mdx       ← Your blog posts here
  ├── another-post.mdx
  └── tutorial.mdx

public/images/blog/
  ├── featured-image.jpg      ← Your images here
  └── content-image.jpg
```

---

## 🚀 Commands

```bash
# Preview locally
npm run dev
# Visit: http://localhost:3000/blog

# Build for production
npm run build

# Publish (if using Git)
git add .
git commit -m "Add post"
git push origin main
```

---

## ✅ Pre-Publish Checklist

- [ ] Frontmatter is complete and valid
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] Date format is YYYY-MM-DD
- [ ] 3-5 relevant tags added
- [ ] Images are optimized (< 200KB)
- [ ] All links work
- [ ] No typos
- [ ] Previewed locally
- [ ] `published: true`

---

## 🎯 SEO Tips

**Title:** 50-60 characters, include main keyword
**Description:** 150-160 characters, compelling summary
**Tags:** 3-5 relevant tags
**Images:** 1200x630px for featured image
**Content:** 1000+ words for better ranking

---

## 🐛 Quick Fixes

**Post not showing?**
```bash
# Restart dev server
npm run dev
```

**Build error?**
```bash
# Clear cache
rm -rf .next
npm run build
```

**Images not loading?**
- Check path: `/images/blog/filename.jpg`
- Check file exists in `public/images/blog/`

---

## 📞 Full Documentation

- `HOW_TO_PUBLISH_BLOG.md` - Complete guide
- `BLOG_SETUP.md` - Technical setup
- `BLOG_TROUBLESHOOTING.md` - Common issues

---

**Happy Blogging!** 📝✨
