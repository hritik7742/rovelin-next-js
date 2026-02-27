'use client';

import Image from 'next/image';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import ShareButtons from './ShareButtons';
import { useState, useEffect } from 'react';

interface BlogHeaderProps {
  title: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  image?: string;
  tags: string[];
}

export default function BlogHeader({
  title,
  description,
  date,
  author,
  readingTime,
  image,
  tags,
}: BlogHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <header className="mb-12 pt-4">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <div className="flex flex-wrap gap-2 mb-5">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="px-3 py-1 text-xs font-medium rounded-full transition-all hover:opacity-80"
            style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa' }}
          >
            {tag}
          </Link>
        ))}
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
        {title}
      </h1>

      <p className="text-lg text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-purple-400" />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-purple-400" />
          <time dateTime={date}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span>{readingTime}</span>
        </div>
      </div>

      <ShareButtons url={currentUrl} title={title} description={description} />

      {image && (
        <div className="relative w-full h-80 mt-8 rounded-xl overflow-hidden border border-purple-900/30">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>
      )}

      {/* Divider */}
      <div className="mt-8 border-b border-purple-900/30" />
    </header>
  );
}
