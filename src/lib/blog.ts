import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { BlogPost, BlogFrontmatter } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Ensure posts directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true });
}

export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
      .filter((post): post is BlogPost => post !== null && post.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allPosts;
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const frontmatter = data as BlogFrontmatter;

    const stats = readingTime(content);

    // gray-matter auto-parses YAML dates into JS Date objects — normalize to 'yyyy-mm-dd' string
    const rawDate = frontmatter.date;
    const parsedDate = rawDate instanceof Date
      ? rawDate.toISOString().slice(0, 10)
      : (typeof rawDate === 'string' && rawDate.trim()
        ? rawDate.trim()
        : new Date().toISOString().slice(0, 10));

    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      date: parsedDate,
      author: frontmatter.author,
      tags: frontmatter.tags || [],
      image: frontmatter.image,
      published: frontmatter.published !== false,
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPost[] {
  const allPosts = getAllPosts();

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const commonTags = post.tags.filter((tag) => tags.includes(tag));
      return { post, score: commonTags.length };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function generateTableOfContents(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: { id: string; text: string; level: number }[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    toc.push({ id, text, level });
  }

  return toc;
}

export function searchPosts(query: string): BlogPost[] {
  const allPosts = getAllPosts();
  const lowerQuery = query.toLowerCase();

  return allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}
