import React from 'react';
import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

function Videoplayer() {
  const router = useRouter();
  const videoId = router.query.link;
  const back = router.query.back

  return (
    <>
      <Head>
        <title>Note Space - Video Player</title>
      </Head>

      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          Note Space
        </Link>
        <Link href={`${back}`} className="text-black hover:text-blue-500 transition">
          🔙 Back to Videos
        </Link>
      </nav>

      {/* Video Player */}
      <div className="flex justify-center items-center min-h-screen bg-white px-4 py-6">
        <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
          <iframe
            className="w-full aspect-video rounded-lg"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}

export default Videoplayer;
