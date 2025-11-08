# 📝 Complete Guide: How to Publish Blog Posts

## 🎯 Overview

This guide will walk you through the entire process of creating and publishing blog posts on your rovelin.com/blog website.

---

## 📋 Step-by-Step Publishing Process

### Step 1: Create Your Blog Post File

1. Navigate to the `content/posts/` folder in your project
2. Create a new file with a `.mdx` extension
3. Use a URL-friendly filename (this becomes your blog post URL)

**Example:**
```
content/posts/my-awesome-tutorial.mdx
```

This will be accessible at: `https://rovelin.com/blog/my-awesome-tutorial`

**Naming Rules:**
- ✅ Use lowercase letters
- ✅ Use hyphens (-) instead of spaces
- ✅ Keep it short and descriptive
- ✅ Use `.mdx` extension
- ❌ Don't use spaces or special characters

**Good Examples:**
- `getting-started-with-react.mdx`
- `10-javascript-tips.mdx`
- `how-to-build-api.mdx`

**Bad Examples:**
- `My Blog Post.mdx` (has spaces)
- `blog_post_1.mdx` (use hyphens, not underscores)
- `post.mdx` (not descriptive)

---

### Step 2: Add Frontmatter (Metadata)

Every blog post MUST start with frontmatter. This is the metadata about your post.

**Required Format:**
```yaml
---
title: "Your Post Title Here"
description: "A brief description of your post (150-160 characters for SEO)"
date: "2025-01-15"
author: "Your Name"
tags: ["Tag1", "Tag2", "Tag3"]
published: true
---
```

**Field Explanations:**

| Field | Required | Format | Description |
|-------|----------|--------|-------------|
| `title` | ✅ Yes | String in quotes | Post title (50-60 chars for SEO) |
| `description` | ✅ Yes | String in quotes | Meta description (150-160 chars) |
| `date` | ✅ Yes | "YYYY-MM-DD" | Publication date |
| `author` | ✅ Yes | String in quotes | Author name |
| `tags` | ✅ Yes | Array ["tag1", "tag2"] | Categories (3-5 recommended) |
| `image` | ❌ No | "/images/blog/image.jpg" | Featured image path |
| `published` | ❌ No | true or false | Publish status (default: true) |

**Example Frontmatter:**
```yaml
---
title: "10 JavaScript Tips Every Developer Should Know"
description: "Discover essential JavaScript tips and tricks that will make you a more efficient developer. Learn best practices and modern techniques."
date: "2025-01-15"
author: "Rovelin Team"
tags: ["JavaScript", "Web Development", "Tutorial", "Tips"]
image: "/images/blog/javascript-tips.jpg"
published: true
---
```

---

### Step 3: Write Your Content

After the frontmatter, write your blog post content using Markdown.

**Basic Markdown Syntax:**

```markdown
## Main Heading (H2)

This is a paragraph. You can use **bold text** and *italic text*.

### Subheading (H3)

- Bullet point 1
- Bullet point 2
- Bullet point 3

1. Numbered list item 1
2. Numbered list item 2
3. Numbered list item 3

[Link text](https://example.com)

![Image alt text](/images/blog/my-image.jpg)

> This is a blockquote or callout

```javascript
// Code block with syntax highlighting
function hello() {
  console.log("Hello, World!");
}
```

| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

**Complete Example Post:**

```mdx
---
title: "Getting Started with Next.js"
description: "Learn how to build modern web applications with Next.js. A beginner-friendly guide with examples."
date: "2025-01-15"
author: "John Doe"
tags: ["Next.js", "React", "Tutorial"]
published: true
---

## Introduction

Next.js is a powerful React framework that makes building web applications easier and faster.

### Why Use Next.js?

Here are the main benefits:

- **Server-Side Rendering**: Better SEO and performance
- **File-based Routing**: Simple and intuitive
- **API Routes**: Build backend and frontend together

### Installation

Install Next.js with this command:

```bash
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Your First Page

Create a new page in the `app` directory:

```javascript
export default function HomePage() {
  return <h1>Hello, Next.js!</h1>;
}
```

> **Tip:** Always use TypeScript for better type safety!

## Conclusion

Next.js is an excellent choice for modern web development. Start building today!
```

---

### Step 4: Add Images (Optional)

If you want to include images in your blog post:

**1. Add Featured Image (for post card):**
```yaml
---
image: "/images/blog/my-featured-image.jpg"
---
```

**2. Add Images in Content:**
```markdown
![Alt text describing the image](/images/blog/content-image.jpg)
```

**Image Guidelines:**
- Place images in `public/images/blog/` folder
- Use descriptive filenames: `nextjs-tutorial-hero.jpg`
- Optimize images before uploading (< 200KB recommended)
- Featured image size: 1200 x 630 pixels (ideal for social sharing)
- Always include alt text for accessibility

> **📖 For detailed image instructions, see `BLOG_IMAGES_GUIDE.md`**

---

### Step 5: Preview Locally

Before publishing, test your blog post locally:

```bash
# Start development server
npm run dev
```

Visit: `http://localhost:3000/blog/your-post-slug`

**Check:**
- ✅ Post displays correctly
- ✅ Images load properly
- ✅ Code blocks have syntax highlighting
- ✅ Links work
- ✅ No typos or formatting issues

---

### Step 6: Publish to Production

Once you're happy with your post, publish it:

#### Option A: Using Git (Recommended)

```bash
# 1. Add your changes
git add content/posts/your-post.mdx
git add public/images/blog/  # If you added images

# 2. Commit with a descriptive message
git commit -m "Add blog post: Your Post Title"

# 3. Push to GitHub
git push origin main
```

#### Option B: Direct Upload

If you're not using Git, you can:
1. Upload the `.mdx` file to `content/posts/` on your server
2. Upload any images to `public/images/blog/`
3. Rebuild your site: `npm run build`

---

### Step 7: Automatic Deployment

If you're using **Vercel** or **Netlify**:

1. Push to GitHub (as shown above)
2. Your site automatically rebuilds
3. Your new post goes live in 1-2 minutes!

**Check deployment:**
- Vercel: Visit your Vercel dashboard
- Netlify: Visit your Netlify dashboard

---

## 🎨 Advanced Features

### Draft Posts

To save a post without publishing:

```yaml
---
published: false
---
```

Draft posts won't appear on your blog or in search engines.

### Code Blocks with Language

Always specify the language for syntax highlighting:

````markdown
```javascript
console.log("JavaScript code");
```

```python
print("Python code")
```

```bash
npm install package-name
```
````

### Blockquotes for Callouts

Use blockquotes for important notes:

```markdown
> **Note:** This is an important note!

> **Warning:** Be careful with this!

> **Tip:** Here's a helpful tip!
```

---

## 📊 SEO Best Practices

### Title Optimization
- Keep it 50-60 characters
- Include your main keyword
- Make it compelling and clickable

**Good Examples:**
- "10 JavaScript Tips Every Developer Should Know"
- "How to Build a REST API with Node.js in 2025"
- "Complete Guide to React Hooks for Beginners"

### Description Optimization
- Keep it 150-160 characters
- Include main keywords
- Summarize the post value
- Include a call-to-action

**Good Example:**
```yaml
description: "Learn how to build a REST API with Node.js and Express. Step-by-step tutorial with code examples. Perfect for beginners!"
```

### Tag Selection
- Use 3-5 relevant tags
- Mix broad and specific tags
- Use consistent tag names across posts

**Good Examples:**
```yaml
tags: ["JavaScript", "Web Development", "Tutorial", "Beginners"]
tags: ["React", "Hooks", "Frontend", "Advanced"]
tags: ["Node.js", "API", "Backend", "Express"]
```

---

## 🔄 Publishing Workflow Summary

```
1. Create file: content/posts/my-post.mdx
   ↓
2. Add frontmatter (title, description, date, author, tags)
   ↓
3. Write content using Markdown
   ↓
4. Add images to public/images/blog/ (optional)
   ↓
5. Preview locally: npm run dev
   ↓
6. Test at: http://localhost:3000/blog/my-post
   ↓
7. Commit: git add . && git commit -m "Add post"
   ↓
8. Push: git push origin main
   ↓
9. Auto-deploy on Vercel/Netlify
   ↓
10. Post is LIVE! 🎉
```

---

## 📝 Quick Reference Template

Copy this template for new posts:

```mdx
---
title: "Your Post Title Here"
description: "Brief description for SEO (150-160 characters)"
date: "2025-01-15"
author: "Your Name"
tags: ["Tag1", "Tag2", "Tag3"]
image: "/images/blog/featured-image.jpg"
published: true
---

## Introduction

Start with an engaging introduction...

## Main Content

### Subheading 1

Your content here...

### Subheading 2

More content...

## Conclusion

Wrap up your post...
```

---

## 🐛 Troubleshooting

### Post Not Showing Up?

**Check:**
1. ✅ File is in `content/posts/` folder
2. ✅ File has `.mdx` extension
3. ✅ Frontmatter is valid YAML (check quotes and colons)
4. ✅ `published: true` (or omit this field)
5. ✅ Date format is `YYYY-MM-DD`
6. ✅ Restart dev server: `npm run dev`

### Images Not Loading?

**Check:**
1. ✅ Images are in `public/images/blog/` folder
2. ✅ Path starts with `/images/blog/`
3. ✅ Filename matches exactly (case-sensitive)
4. ✅ Image file isn't corrupted

### Build Errors?

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

---

## 📞 Need Help?

- Check `BLOG_TROUBLESHOOTING.md` for common issues
- Review example posts in `content/posts/`
- Read `BLOG_SETUP.md` for detailed documentation

---

## 🎉 You're Ready!

You now know everything you need to publish blog posts on your website. Start creating amazing content!

**Remember:**
- Write valuable content for your readers
- Optimize for SEO
- Use images to enhance your posts
- Publish consistently
- Share on social media

**Happy blogging!** 📝✨
