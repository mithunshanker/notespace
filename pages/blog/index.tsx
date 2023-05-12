import React from 'react'
import 'tailwindcss/tailwind.css'

function BLOG_index() {
  return (
    <>
    <section className="fixed top-0  w-full px-8 text-gray-700 bg-white">
    <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
        <div className="relative flex flex-col md:flex-row">
            {/* <a href="#_" className="flex items-center mb-5 font-medium text-gray-900 lg:w-auto lg:items-center lg:justify-center md:mb-0">
                <span className="mx-auto text-xl font-black leading-none text-gray-900 select-none">AI<span className="text-indigo-600">.</span></span>
            </a> */}
            <nav className="flex flex-wrap items-center mb-5 text-base md:mb-0 md:pl-8 md:ml-8  md:border-gray-200">
                <h1 className='text-3xl pr-5 font-bold text-indigo-600' >Note Space</h1>
                {/* <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl" ><span className="block text-indigo-600 xl:inline">Scribble Hub</span></h1> */}
                <a href="/#H" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Home</a>
                <a href="/#F" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Features</a>
                <a href="/jee" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Jee</a>
                <a href="/neet" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Neet</a>
                {/* <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#_" className="mr-5 font-medium leading-6 text-gray-600 hover:text-gray-900">Blog</a> */}
            </nav>
        </div>

        <div className="inline-flex items-center ml-5 space-x-6 lg:justify-end">
            {/* <a href="#" className="text-base font-medium leading-6 text-gray-600 whitespace-no-wrap transition duration-150 ease-in-out hover:text-gray-900">
                Sign in
            </a> */}
            <a href="/jee" className="hidden md:block inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                Get Started
            </a>
        </div>
    </div>
</section>
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