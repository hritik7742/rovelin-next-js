"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { getBlogPosts } from '@/utils/contentful';

interface BlogPost {
  sys: {
    id: string;
    createdAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content: any;
    featuredImage?: {
      fields: {
        file: {
          url: string;
        };
      };
    };
  };
}

// Rich text options for the excerpt
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any) => {
      const text = node.content
        .map((content: any) => {
          if (content.nodeType === 'text') return content.value;
          return '';
        })
        .join('');
      return text.substring(0, 150) + '...';
    },
    [BLOCKS.EMBEDDED_ASSET]: () => null,
    // ... other block renderers
  },
  renderMark: {
    [MARKS.BOLD]: (text: string) => text,
    [MARKS.ITALIC]: (text: string) => text,
    [MARKS.UNDERLINE]: (text: string) => text,
    [MARKS.CODE]: (text: string) => text,
  },
};

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getBlogPosts();
        setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getExcerpt = (post: BlogPost) => {
    if (post.fields.excerpt) {
      return post.fields.excerpt;
    }
    if (post.fields.content) {
      try {
        const firstParagraph = post.fields.content.content
          .find((item: any) => item.nodeType === 'paragraph');
        
        if (firstParagraph) {
          const text = firstParagraph.content
            .map((content: any) => content.value || '')
            .join('')
            .substring(0, 150);
          return text + '...';
        }
      } catch (err) {
        console.error('Error extracting excerpt:', err);
      }
    }
    return 'Read more...';
  };

  if (loading) return (
    <div className="blog-loading">
      <div className="loading-spinner"></div>
    </div>
  );
  
  if (error) return <div className="blog-error">Error: {error}</div>;
  if (!Array.isArray(posts) || posts.length === 0) return <div className="blog-empty">No posts found</div>;

  return (
    <div className="blog-list">
      <div className="blog-header">
        <h1>Our Blog</h1>
        <p>Discover insights, strategies, and updates from the Rovelin team</p>
      </div>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.sys.id} className="blog-card">
            {post.fields.featuredImage && (
              <Image 
                src={`https:${post.fields.featuredImage.fields.file.url}`}
                alt={post.fields.title}
                width={400}
                height={300}
                className="blog-card-image"
              />
            )}
            <div className="blog-card-content">
              <div className="blog-meta">
                <time>{new Date(post.sys.createdAt).toLocaleDateString()}</time>
              </div>
              <h2>{post.fields.title}</h2>
              <div className="blog-excerpt">
                {getExcerpt(post)}
              </div>
              <Link 
                href={`/blog/${post.fields.slug}`} 
                className="read-more"
              >
                Read More 
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 