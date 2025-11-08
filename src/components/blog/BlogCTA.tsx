import Link from 'next/link';
import { Code, Wrench, Chrome } from 'lucide-react';

export default function BlogCTA() {
  return (
    <div className="my-16 space-y-6">
      {/* Contact Us for Projects */}
      <section className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Code className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
            Need a Custom Project?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We build web apps, mobile apps, plugins, and custom software solutions. Lets bring your idea to life.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Tools and Extension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Tools */}
        <Link
          href="/tools"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                Free Tools Collection
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explore our collection of free online tools for developers and creators. Image converters, minifiers, and more.
              </p>
            </div>
          </div>
        </Link>

        {/* Chrome Extensions */}
        <Link
          href="/Our-products"
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Chrome className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Chrome Extensions
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Check out our collection of powerful Chrome extensions. From productivity tools to developer utilities.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
