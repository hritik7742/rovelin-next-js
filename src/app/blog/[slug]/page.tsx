"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, use } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { getBlogPost } from '@/utils/contentful';

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
    [INLINES.HYPERLINK]: (node: any, children: any) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file, title } = node.data.target.fields;
      return (
        <Image
          src={`https:${file.url}`}
          alt={title}
          width={800}
          height={400}
          className="blog-content-image"
        />
      );
    },
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: Props) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap params using React.use()
  const { slug } = use(params);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        console.log('Fetching post for encoded slug:', slug);
        const fetchedPost = await getBlogPost(slug);
        console.log('Fetched post:', fetchedPost);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          setLoading(false);
        } else {
          setError('Post not found');
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error fetching post:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div className="blog-loading">Loading post...</div>;
  if (error) return <div className="blog-error">Error: {error}</div>;
  if (!post) return <div className="blog-not-found">Post not found</div>;

  return (
    <article className="blog-post">
      {post.fields.featuredImage && (
        <Image 
          src={`https:${post.fields.featuredImage.fields.file.url}`}
          alt={post.fields.title}
          width={800}
          height={400}
          className="blog-post-image"
          priority
        />
      )}
      <h1>{post.fields.title}</h1>
      <div className="blog-post-meta">
        <time>{new Date(post.sys.createdAt).toLocaleDateString()}</time>
      </div>
      <div className="blog-post-content">
        {documentToReactComponents(post.fields.content, options)}
      </div>
      <Link href="/blog" className="back-to-blog">
        ← Back to Blog
      </Link>
    </article>
  );
} 