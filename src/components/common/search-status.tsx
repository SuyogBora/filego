import { Loader2, SearchIcon } from 'lucide-react';
import React from 'react';
import { useFormStatus } from 'react-dom';


export default function SearchStatus({ searching }: { searching: boolean }) {
  const { pending } = useFormStatus();
  const isSearching = searching || pending;

  return (
    <div className="absolute left-4 top-1/2">
      {isSearching ? (
        <div aria-label="searching..." className="h-fit w-fit animate-spin">
          <Loader2 aria-hidden="true" width={16} height={16} className="text-gray" />
        </div>
      ) : (
        <SearchIcon aria-hidden="true" width={16} height={16} className="text-gray" />
      )}
    </div>
  );
}