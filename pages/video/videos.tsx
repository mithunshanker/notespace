import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import React, { useState } from 'react';
import clientPromise from '../../lib/mongodb';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

type VideoItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: { medium: { url: string } };
  };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const topic = typeof context.query.topic === 'string' ? context.query.topic : '';

  try {
    const client = await clientPromise;
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?type=video&q=${encodeURIComponent(topic)}&relevanceLanguage=en&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}&part=snippet&maxResults=6`
    );
    const data = await response.json();

    return {
      props: { data: data || { items: [] } }, // Ensure a default empty array
    };
  } catch (e) {
    console.error("Error fetching videos:", e);
    return {
      props: { data: { items: [] } }, // Avoid crash if fetch fails
    };
  }
};

function Videos({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const topic = router.query.topic || 'Unknown Topic';
  const videos: VideoItem[] = data.items || [];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Note Space - Videos on {topic}</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-500">
              Note Space
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="text-black hover:text-blue-500 transition">Home</Link>
              <Link href="/about" className="text-black hover:text-blue-500 transition">About</Link>
              <Link href="/contact" className="text-black hover:text-blue-500 transition">Contact</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="md:hidden text-black" 
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-100 p-4 space-y-4">
            <Link href="/" className="block text-black hover:text-blue-500 transition">Home</Link>
            <Link href="/about" className="block text-black hover:text-blue-500 transition">About</Link>
            <Link href="/contact" className="block text-black hover:text-blue-500 transition">Contact</Link>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-white text-black px-4 py-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Videos on {topic}</h1>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {videos.length > 0 ? (
            videos.map((d) => (
              <Link key={d.id.videoId} href={`/video/videoplayer?link=${d.id.videoId}&back=${encodeURIComponent(router.asPath)}`} className="group w-full max-w-sm">
                <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
                  {/* Video Thumbnail */}
                  <img
                    className="w-full h-56 object-cover rounded-t-xl transition duration-300 group-hover:opacity-90"
                    src={d.snippet.thumbnails.medium.url}
                    alt={d.snippet.title}
                  />
                  
                  {/* Video Title */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-black group-hover:text-blue-600 truncate">
                      {d.snippet.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-3">No videos found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Videos;
