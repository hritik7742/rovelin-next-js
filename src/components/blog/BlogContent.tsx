import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

type BlogContentProps = {
  source: string;
};

export default function BlogContent({ source }: BlogContentProps) {
  return (
    <article className="blog-content prose prose-lg dark:prose-invert max-w-none bg-transparent rounded-xl p-8 shadow-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
      >
        {source}
      </ReactMarkdown>
    </article>
  );
}
