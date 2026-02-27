import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen py-16" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Rovelin Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories about Chrome extensions, web apps, and productivity tools.
          </p>
        </header>

        {/* Blog List with Client-side Interactivity */}
        <BlogList initialPosts={allPosts} />
      </div>
    </div>
  );
}
