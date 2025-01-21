'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { XCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            {error.message || 'An unexpected error occurred.'}
            {error.digest && (
              <div className="mt-2 text-sm text-gray-500">
                Error ID: {error.digest}
              </div>
            )}
          </AlertDescription>
        </Alert>
        
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => reset()}
            variant="default"
          >
            Try again
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
          >
            Return home
          </Button>
        </div>
      </div>
    </div>
  );
}