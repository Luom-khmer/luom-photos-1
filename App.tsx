import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CreateAlbumForm } from './components/CreateAlbumForm';
import { AlbumView } from './components/AlbumView';

const App: React.FC = () => {
  const [albumId, setAlbumId] = useState<string | null>(null);

  useEffect(() => {
    const getAlbumIdFromUrl = () => {
        try {
            if (typeof window === 'undefined') return null;

            // 1. Priority: Check inside Hash (recommended for Blob/File URLs)
            // Supports formats: #?album=ID or #album=ID
            if (window.location.hash && window.location.hash.includes('album=')) {
                const hash = window.location.hash;
                // Split by ? first if it exists, otherwise check plain hash
                const parts = hash.includes('?') ? hash.split('?') : [hash];
                
                if (parts.length > 1) {
                    const params = new URLSearchParams(parts[1]);
                    if (params.get('album')) return params.get('album');
                } else {
                     // Try parsing the hash itself as params if it starts with #album=...
                     const cleanHash = hash.substring(1); // remove #
                     const params = new URLSearchParams(cleanHash);
                     if (params.get('album')) return params.get('album');
                }
            }

            // 2. Fallback: Standard Search Params
            const params = new URLSearchParams(window.location.search);
            const idFromSearch = params.get('album');
            if (idFromSearch) return idFromSearch;

        } catch (error) {
            console.error("Error parsing URL for album ID:", error);
        }
        return null;
    };

    const handleUrlChange = () => {
        const id = getAlbumIdFromUrl();
        setAlbumId(id);
        // Scroll to top when view changes
        window.scrollTo(0, 0);
    };

    // Initial check
    handleUrlChange();

    // Listeners for navigation changes
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
        window.removeEventListener('popstate', handleUrlChange);
        window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {albumId ? (
          <AlbumView albumId={albumId} />
        ) : (
          <CreateAlbumForm />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;