import React from 'react'
import 'tailwindcss/tailwind.css'
import {useRouter} from 'next/router'
import Head from 'next/head'


function Videoplayer() {
  const router = useRouter()
  const videoId = router.query.link
  return (
    <>
    <Head>
      <title>Note Space - Video Player</title>
    </Head>
    <div className="overflow-y-hidden aspect-video">
    <iframe
      className="w-full h-full lg:h-screen"
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen>
    </iframe>
  </div>
  </>
  )
}

export default Videoplayer