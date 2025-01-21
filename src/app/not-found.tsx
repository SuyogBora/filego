import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
        <p className="text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/">
              Return Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/contact">
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}