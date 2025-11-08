'use client';

import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function StaticBlogSection() {
  // Static featured posts data
  const featuredPosts = [
    {
      slug: 'quickvpn-proxy-secure-browsing-made-simple',
      title: 'QuickVPN Proxy: Secure Browsing Made Simple',
      date: '2024-02-05',
      excerpt: 'Discover how QuickVPN Proxy Chrome extension provides fast, secure, and private browsing with just one click. Perfect for accessing blocked content and protecting your online privacy.',
      author: 'Rovelin Studio',
      tags: ['chrome-extension', 'vpn', 'privacy', 'security', 'proxy'],
      readTime: 12
    },
    {
      slug: 'chrome-extension-development-guide',
      title: 'Complete Guide to Chrome Extension Development in 2024',
      date: '2024-01-20',
      excerpt: 'Learn how to build powerful Chrome extensions from scratch with our comprehensive guide covering Manifest V3, APIs, and best practices.',
      author: 'Rovelin Studio',
      tags: ['chrome-extensions', 'javascript', 'development', 'tutorial'],
      readTime: 8
    },
    {
      slug: 'building-successful-chrome-extensions',
      title: 'Building Successful Chrome Extensions: Lessons from 15,000+ Users',
      date: '2024-01-30',
      excerpt: 'Learn the key strategies and best practices we used to build Chrome extensions with over 15,000 active users. From ideation to monetization.',
      author: 'Rovelin Studio',
      tags: ['chrome-extensions', 'business', 'success-story', 'development'],
      readTime: 12
    }
  ];

  return (
    <section className="py-20" style={{background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', border: '1px solid rgba(124, 58, 237, 0.1)', borderRadius: '24px', margin: '40px 0'}}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6" style={{background: 'linear-gradient(135deg, #7c3aed, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            Latest from Our Blog
          </h2>
          <p className="text-xl text-[rgba(248,250,252,0.9)] max-w-3xl mx-auto">
            Stay updated with the latest insights, tutorials, and trends in web development and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <article 
              key={post.slug} 
              className="bg-[rgba(30,41,59,0.4)] backdrop-blur-[10px] border border-[rgba(124,58,237,0.1)] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-[rgba(248,250,252,0.6)] mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    {post.readTime} min
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-[#f8fafc] mb-3 hover:text-[#7c3aed] transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-[rgba(248,250,252,0.9)] mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[rgba(248,250,252,0.6)]">
                    By {post.author}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-[#7c3aed] hover:text-[#818cf8] font-medium text-sm transition-colors flex items-center gap-1"
                  >
                    Read More <ArrowRight size={14} />
                  </Link>
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[rgba(124,58,237,0.1)]">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-[rgba(124,58,237,0.1)] text-[#7c3aed] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1"
            style={{background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'}}
          >
            View All Posts <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}