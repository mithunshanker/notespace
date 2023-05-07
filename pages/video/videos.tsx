import { InferGetServerSidePropsType } from 'next';
import React, { useEffect, useState } from 'react'
import clientPromise from '../../lib/mongodb';
import 'tailwindcss/tailwind.css'
import {useRouter} from 'next/router'
import Link from 'next/link';
import Head from 'next/head';

export async function getServerSideProps(context: { query: { topic: any; }; }) {
  const{topic}=context.query
  console.log
  try {
 
    const client = await clientPromise;
   
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?type=video&q=${topic}&relevanceLanguage=en&key=${process.env.NEXT_PUBLIC_YOUTUBE_API}&part=snippet&maxResults=5`
    );
    const Data = await response.json(); 

    return {
        props: { data: Data},
    };
} catch (e) {
    console.error(e);
    return{
      props:{}
    }
}

}
function Videos({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight)
    });
  }, []);
  const videos=data.items
  const router = useRouter();
  console.log(videos)
  const topic = router.query.topic;
  const h = screenWidth*9/16
  return (
   <>
   <Head>
    <title>Note Space - Video On {topic}</title>
   </Head>
   <h1 className="flex justify-center text-center text-3xl lg:text-5xl font-extrabold dark:text-white ">Video On {topic}</h1>
   {
    videos&&videos.map((d)=>{
      return(
        
      <div className="flex justify-center  py-10 sm:py-0">
 
  <Link href={`/video/videoplayer?link=${d.id.videoId}`} ><img className='rounded-lg block sm:hidden ' width={screenWidth.toString()} height={h.toString()}  src={d.snippet.thumbnails.medium.url} ></img></Link>

  <Link href={`/video/videoplayer?link=${d.id.videoId}`}><img className='py-5 hidden md:block' width={(screenWidth*30/100).toString()} height={(screenHeight*30/100).toString()} src={d.snippet.thumbnails.medium.url}></img></Link>
</div>)
    })

    
   }
   </>
  )
}

export default Videos
