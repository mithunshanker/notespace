import React from 'react'
import 'tailwindcss/tailwind.css'
import Navbar from '../../components/Navbar'
function BLOG_index() {
  return (
    <>
    <Navbar/>
    <div className="w-full h-screen" style={{"backgroundImage": "url('https://vojislavd.com/ta-template-demo/assets/img/coming-soon.jpg')"}}>
    <div className="w-full h-screen flex flex-col items-center justify-between bg-black bg-opacity-70 py-8">
        <div className="flex-1 flex flex-col items-center justify-center">
            
            <h1 className="text-6xl lg:text-7xl xl:text-8xl text-gray-200 tracking-wider font-bold font-serif mt-12 text-center">Coming Soon</h1>
          
        </div>
        
    </div>
</div></>
  )
}

export default BLOG_index