# 🔧 Blog Troubleshooting Guide

Common issues and their solutions.

## 🚨 Installation Issues

### Error: `npm install` fails

**Problem**: Dependencies won't install

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Error: Module not found

**Problem**: Missing dependencies

**Solution**:
```bash
# Install missing package
npm install [package-name]

# Or reinstall all
npm install
```

## 📝 Content Issues

### Posts Not Showing Up

**Problem**: Blog post doesn't appear in listing

**Checklist**:
- [ ] File is in `content/posts/` directory
- [ ] File has `.mdx` extension
- [ ] Frontmatter is valid YAML
- [ ] `published: true` (or omitted)
- [ ] Date format is `YYYY-MM-DD`
- [ ] Restart dev server

**Example of correct frontmatter**:
```yaml
---
title: "My Post Title"
description: "Post description"
date: "2025-01-15"
author: "Author Name"
tags: ["Tag1", "Tag2"]
published: true
---
```

### Frontmatter Parsing Error

**Problem**: Error parsing frontmatter

**Common mistakes**:
```yaml
# ❌ Wrong - missing quotes
title: My Post: A Guide

# ✅ Correct - with quotes
title: "My Post: A Guide"

# ❌ Wrong - invalid date
date: 01/15/2025

# ✅ Correct - ISO format
date: "2025-01-15"

# ❌ Wrong - invalid array
tags: Tag1, Tag2

# ✅ Correct - proper array
tags: ["Tag1", "Tag2"]
```

### Post Shows 404

**Problem**: Individual post returns 404

**Solutions**:
1. Check slug matches filename (without `.mdx`)
2. Restart dev server
3. Clear `.next` folder:
   ```bash
   rm -rf .next
   npm run dev
   ```

## 🎨 Styling Issues

### Syntax Highlighting Not Working

**Problem**: Code blocks have no colors

**Solutions**:

1. Check code block syntax:
   ````mdx
   ```javascript
   // Code here
   ```
   ````

2. Verify `rehype-highlight` is installed:
   ```bash
   npm install rehype-highlight
   ```

3. Check CSS is imported in `globals.css`

4. Restart dev server

### Dark Mode Not Working

**Problem**: Dark mode styles not applying

**Solutions**:
1. Check Tailwind dark mode is enabled in `tailwind.config.ts`
2. Verify dark mode classes are present
3. Clear browser cache
4. Check system dark mode settings

### Images Not Displaying

**Problem**: Images show broken icon

**Checklist**:
- [ ] Image exists in `public/images/blog/`
- [ ] Path starts with `/` (e.g., `/images/blog/photo.jpg`)
- [ ] File extension is correct
- [ ] File name matches exactly (case-sensitive)
- [ ] Image file isn't corrupted

**Correct usage**:
```mdx
<!-- ✅ Correct -->
![Alt text](/images/blog/my-image.jpg)

<!-- ❌ Wrong - missing leading slash -->
![Alt text](images/blog/my-image.jpg)

<!-- ❌ Wrong - wrong directory -->
![Alt text](/blog/images/my-image.jpg)
```

## 🔧 Build Issues

### Build Fails

**Problem**: `npm run build` fails

**Common causes**:

1. **TypeScript errors**:
   ```bash
   # Check for type errors
   npx tsc --noEmit
   ```

2. **Invalid MDX**:
   - Check all MDX files for syntax errors
   - Verify frontmatter is valid
   - Check for unclosed tags

3. **Missing dependencies**:
   ```bash
   npm install
   ```

4. **Clear cache and rebuild**:
   ```bash
   rm -rf .next
   npm run build
   ```

### Out of Memory Error

**Problem**: Build runs out of memory

**Solution**:
```bash
# Increase Node memory limit
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## 🌐 Deployment Issues

### Vercel Deployment Fails

**Problem**: Build fails on Vercel

**Solutions**:

1. Check build logs for specific error
2. Verify all dependencies are in `package.json`
3. Check Node version compatibility
4. Ensure environment variables are set (if needed)

**Vercel settings**:
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Netlify Deployment Fails

**Problem**: Build fails on Netlify

**Solutions**:

1. Check build logs
2. Verify build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Check Node version in `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

### 404 on Deployed Site

**Problem**: Blog pages return 404 in production

**Solutions**:

1. Verify static generation is working:
   ```bash
   npm run build
   # Check .next/server/app/blog/ for generated pages
   ```

2. Check deployment settings
3. Verify routes are correct
4. Clear deployment cache and redeploy

## 🔍 SEO Issues

### Sitemap Not Updating

**Problem**: New posts not in sitemap

**Solutions**:
1. Rebuild site: `npm run build`
2. Check `src/app/sitemap.ts` includes blog posts
3. Verify posts are published
4. Clear cache and rebuild

### RSS Feed Not Working

**Problem**: RSS feed returns error

**Solutions**:
1. Visit `/blog/rss.xml` locally
2. Check for XML syntax errors
3. Verify all posts have required fields
4. Rebuild and redeploy

### Meta Tags Not Showing

**Problem**: Social media previews don't work

**Solutions**:
1. Check metadata in `src/app/blog/[slug]/page.tsx`
2. Verify featured image exists and is accessible
3. Test with [Open Graph Debugger](https://www.opengraph.xyz/)
4. Clear social media cache:
   - Facebook: [Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - Twitter: [Card Validator](https://cards-dev.twitter.com/validator)

## 🐛 Component Issues

### Table of Contents Not Working

**Problem**: TOC doesn't show or track sections

**Solutions**:
1. Ensure headings use `##` or `###` (H2 or H3)
2. Check heading IDs are generated
3. Verify `rehype-slug` is installed
4. Check JavaScript is enabled

### Share Buttons Not Working

**Problem**: Share buttons don't work

**Solutions**:
1. Check browser console for errors
2. Verify URLs are correct
3. Test in different browsers
4. Check popup blockers aren't interfering

### Search Not Working

**Problem**: Search doesn't filter posts

**Solutions**:
1. Check browser console for errors
2. Verify posts are loading
3. Check search logic in `src/app/blog/page.tsx`
4. Clear browser cache

## 📱 Mobile Issues

### Layout Broken on Mobile

**Problem**: Blog looks broken on mobile devices

**Solutions**:
1. Check responsive classes in components
2. Test with browser dev tools mobile view
3. Verify Tailwind breakpoints are correct
4. Check for fixed widths that should be responsive

### Images Too Large on Mobile

**Problem**: Images overflow on mobile

**Solutions**:
1. Use Next.js Image component
2. Add responsive classes
3. Set max-width: 100%
4. Use proper sizes prop

## 🚀 Performance Issues

### Slow Page Load

**Problem**: Blog pages load slowly

**Solutions**:

1. **Optimize images**:
   - Compress images before uploading
   - Use WebP format
   - Use Next.js Image component

2. **Check bundle size**:
   ```bash
   npm run build
   # Check output for large bundles
   ```

3. **Enable caching**:
   - Add cache headers
   - Use CDN

4. **Lazy load images**:
   - Already implemented with Next.js Image

### Large Bundle Size

**Problem**: JavaScript bundle is too large

**Solutions**:
1. Check for unnecessary imports
2. Use dynamic imports for large components
3. Remove unused dependencies
4. Analyze bundle:
   ```bash
   npm install @next/bundle-analyzer
   ```

## 🔐 Security Issues

### XSS Vulnerability Warning

**Problem**: Security scanner reports XSS

**Solutions**:
1. MDX already sanitizes content
2. Don't use `dangerouslySetInnerHTML`
3. Validate user input (if any)
4. Keep dependencies updated

### Dependency Vulnerabilities

**Problem**: `npm audit` shows vulnerabilities

**Solutions**:
```bash
# Fix automatically
npm audit fix

# Fix with breaking changes (careful!)
npm audit fix --force

# Update specific package
npm update [package-name]
```

## 🔄 Update Issues

### Next.js Update Breaks Blog

**Problem**: Blog breaks after updating Next.js

**Solutions**:
1. Check [Next.js upgrade guide](https://nextjs.org/docs/upgrading)
2. Review breaking changes
3. Update related packages
4. Test thoroughly before deploying

### Package Conflicts

**Problem**: Dependency conflicts after update

**Solutions**:
```bash
# Clear everything
rm -rf node_modules package-lock.json

# Reinstall
npm install

# Or use legacy peer deps
npm install --legacy-peer-deps
```

## 📞 Getting Help

### Still Having Issues?

1. **Check documentation**:
   - `BLOG_SETUP.md`
   - `BLOG_QUICK_START.md`

2. **Search for similar issues**:
   - Next.js GitHub issues
   - MDX GitHub issues
   - Stack Overflow

3. **Check browser console**:
   - Look for error messages
   - Check network tab

4. **Enable debug mode**:
   ```bash
   NODE_OPTIONS='--inspect' npm run dev
   ```

5. **Create minimal reproduction**:
   - Isolate the problem
   - Test with minimal code

### Useful Commands

```bash
# Clear all caches
rm -rf .next node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint

# Build and check for errors
npm run build

# Start fresh dev server
npm run dev
```

### Debug Checklist

- [ ] Check browser console for errors
- [ ] Check terminal for errors
- [ ] Verify file paths are correct
- [ ] Check file permissions
- [ ] Restart dev server
- [ ] Clear browser cache
- [ ] Clear Next.js cache (`.next` folder)
- [ ] Reinstall dependencies
- [ ] Check Node version (18+)
- [ ] Test in different browser

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Next.js Discord](https://discord.gg/nextjs)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

**Remember**: Most issues can be solved by:
1. Checking the error message carefully
2. Restarting the dev server
3. Clearing caches
4. Reinstalling dependencies

**Good luck!** 🍀
