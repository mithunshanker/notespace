import Head from "next/head";
import clientPromise from "../../lib/mongodb";
import { InferGetServerSidePropsType } from "next";
import "tailwindcss/tailwind.css";
import styles from "-../styles/Home.module.css";
import { Key, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import pdf from "../../public/images/pdf.png";
import other from "../../public/images/other.png";
import { useRouter } from "next/router";


export async function getServerSideProps(context: { query: { s: any; }; }) {
  const f = context.query.s && context.query.s;
  const fq = { subject: f };
  try {
    const client = await clientPromise;
    const db = client.db("db");

    const Data = await db
      .collection("pdfs")
      .find(fq.subject && fq)
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();

    return {
      props: { data: JSON.parse(JSON.stringify(Data)) },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {},
    };
  }
}

export default function JEEindex({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [Exp, setExp] = useState(false);
  const [H, setH] = useState<String|undefined>(
    "-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
  );
  const [P, setP] = useState<String|undefined>();
  const [M, setM] = useState<String|undefined>();
  const [C, setC] = useState<String|undefined>();
  const C_handler = (x: string) => {
    if (x == "h") {
      setH(
        "-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
      );
      setP(undefined);
      setM(undefined);
      setC(undefined);
    }
    if (x == "p") {
      setP(
        "-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
      );
      setH(undefined);
      setM(undefined);
      setC(undefined);
    }
    if (x == "c") {
      setC(
        "-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
      );
      setP(undefined);
      setM(undefined);
      setH(undefined);
    }
    if (x == "m") {
      setM(
        "-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
      );
      setP(undefined);
      setH(undefined);
      setC(undefined);
    }
  };
  const router = useRouter();
  const s = router.query.s
  
  console.log(s)
  return (
    <>
      <Head>
        <title>Note Space - JEE notes {s?`-${s}`:null}</title>
        <meta name="description" content="Our website is a one-stop destination for JEE aspirants looking for high-quality handwritten notes to boost their exam preparation. We offer an extensive collection of notes covering a wide range of topics, created by JEE aspirants.

We believe that handwritten notes are the best way to learn complex concepts, as they provide a personal touch that printed notes often lack.

In addition to handwritten notes, we also provide other useful resources such as practice tests, quizzes, and video lectures to help students prepare for the exam. Our website is user-friendly, making it easy for students to navigate and find the resources they need.

Overall, our website is a valuable resource for JEE aspirants who want to succeed in the exam by accessing high-quality handwritten notes and other helpful resources." />
      </Head>
      
        {/* Navbar */}
        <nav className="border-200  dark:bg-gray-800 dark:border-gray-700 ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" className="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white text-indigo-600 ">
                JEE Notes
              </span>
            </a>
            <button
              onClick={() => setExp(!Exp)}
              data-collapse-toggle="navbar-solid-bg"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-solid-bg"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {Exp ? (
              <div className=" w-full md:block md:w-auto" id="navbar-solid-bg">
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                  <li>
                    <a
                      href="/jee"
                      onClick={() => {
                        C_handler("h");
                      }}
                      className={`block py-2 pl-3 pr-4 text${
                        H
                          ? H
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=physics"
                      onClick={() => C_handler("p")}
                      className={`block py-2 pl-3 pr-4 text${
                        P
                          ? P
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Physics
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=chemistry"
                      onClick={() => C_handler("c")}
                      className={`block py-2 pl-3 pr-4 text${
                        C
                          ? C
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Chemistry
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=maths"
                      onClick={() => C_handler("m")}
                      className={`block py-2 pl-3 pr-4 text${
                        M
                          ? M
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Maths
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="hidden w-full md:block md:w-auto"
                id="navbar-solid-bg"
              >
                <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                  <li>
                    <a
                      href="/jee"
                      onClick={() => C_handler("h")}
                      className={`block py-2 pl-3 pr-4 text${
                        H
                          ? H
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=physics"
                      onClick={() => C_handler("p")}
                      className={`block py-2 pl-3 pr-4 text${
                        P
                          ? P
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Physics
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=chemistry"
                      onClick={() => C_handler("c")}
                      className={`block py-2 pl-3 pr-4 text${
                        C
                          ? C
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Chemistry
                    </a>
                  </li>
                  <li>
                    <a
                      href="/jee?s=maths"
                      onClick={() => C_handler("m")}
                      className={`block py-2 pl-3 pr-4 text${
                        M
                          ? M
                          : "-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      } `}
                    >
                      Maths
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
        {/* items */}
        {data.map((d: { _id: Key | undefined; type: {} | null | undefined; topic: {} | null | undefined; subject: {} | null | undefined; downloadurl: string | undefined; }) => {
          return (
            <div key={d._id} className="flex justify-center pt-5 pr-5 pl-5 ">
              <div className=" pt-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition duration-500 transform hover:scale-105">
                <a href="#">
                  <Image
                    src={d.type == "pdf" ? pdf : other}
                    alt="My Image"
                    width={500}
                    height={500}
                  />
                </a>
                <div className="p-5 ">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {d.topic}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Subject : {d.subject} <br></br> This is material on{" "}
                    {d.topic} topic of {d.subject} in {d.type} format make use
                    of it
                  </p>
                  <a
                    href={d.downloadurl}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Download
                    <svg
                      aria-hidden="true"
                      className=" w-4 h-4 ml-2 -mr-1 transform rotate-90"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </a>
                  <Link
                    href={`/video/videos?topic=${d.topic}`}
                    className="inline-flex items-center  px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Watch Video
                    <svg
                      aria-hidden="true"
                      className=" w-4 h-4 ml-2 -mr-1 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      
    </>
  );
}
