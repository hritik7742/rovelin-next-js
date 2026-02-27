import Link from 'next/link';
import { Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article
      className="group rounded-xl border border-purple-900/30 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20"
      style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)' }}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-2 text-white group-hover:text-purple-400 transition-colors line-clamp-2">
          {post.title}
        </h2>

        <p className="text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
