import BlogList from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Rovelin Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and stories about web development, design, and technology.
          </p>
        </header>

        {/* Blog List with Client-side Interactivity */}
        <BlogList initialPosts={allPosts} />
      </div>
    </div>
  );
}
