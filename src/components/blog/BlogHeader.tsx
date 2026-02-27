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
    <header className="mb-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/tag/${tag}`}
            className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
        {title}
      </h1>

      <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
        {description}
      </p>

      <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>{author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <time dateTime={date}>{formattedDate}</time>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          <span>{readingTime}</span>
        </div>
      </div>

      <ShareButtons url={currentUrl} title={title} description={description} />

      {image && (
        <div className="relative w-full h-96 mt-8 rounded-xl overflow-hidden">
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
    </header>
  );
}
