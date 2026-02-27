// NO 'use client' here — this file is used by MDXRemote (RSC) so it must be server-safe.
// Only CodeBlock is in a separate 'use client' file because it uses useState.

import Image from 'next/image';
import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

// Custom Image with Caption
export function BlogImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative w-full h-96 rounded-lg overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Callout Component
interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
  };

  const icons = {
    info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
    warning: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    success: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
  };

  return (
    <div className={`flex gap-3 p-4 my-6 rounded-lg border ${styles[type]}`}>
      <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
      <div className="flex-1 text-sm">{children}</div>
    </div>
  );
}

// YouTube Embed
export function YouTube({ id }: { id: string }) {
  return (
    <div className="relative w-full my-8" style={{ paddingBottom: '56.25%' }}>
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// MDX Components Map — passed to next-mdx-remote/rsc MDXRemote
export const mdxComponents = {
  pre: CodeBlock,
  img: BlogImage,
  Image: BlogImage,
  Callout,
  YouTube,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-lg font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-100"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-base leading-7 text-gray-700 dark:text-gray-300" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-disc space-y-2 text-base text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 text-base text-gray-700 dark:text-gray-300"
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-blue-600 dark:text-blue-400 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-4 italic text-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table
        className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
        {...props}
      />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-2 border-t border-gray-200 dark:border-gray-700"
      {...props}
    />
  ),
};
