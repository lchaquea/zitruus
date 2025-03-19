import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-300">
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
        <Link 
          href="/"
          className="px-4 py-2 bg-brand-lime text-black rounded-lg hover:opacity-90 transition-opacity"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
} 