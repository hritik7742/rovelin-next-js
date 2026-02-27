'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';

type BlogContentProps = {
  source: string;
};

export default function BlogContent({ source }: BlogContentProps) {
  // Strip the "Internal Linking Suggestions" section if AI added it
  const cleaned = source
    .replace(/##\s*Internal Linking Suggestions[\s\S]*?(?=\n##\s|\n---\s*\n##\s|$)/gi, '')
    .trim();

  return (
    <article className="blog-content prose prose-lg max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-li:text-gray-300 prose-a:text-purple-400 prose-a:no-underline hover:prose-a:text-purple-300 prose-blockquote:border-purple-500 prose-blockquote:text-gray-400 prose-code:text-purple-300 prose-pre:bg-gray-800 prose-hr:border-gray-700">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={{
          // The BlogHeader already shows the title — suppress the H1 from body content
          h1: () => null,
        }}
      >
        {cleaned}
      </ReactMarkdown>
    </article>
  );
}
