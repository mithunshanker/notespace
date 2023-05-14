import { AppProps } from 'next/app'
import Script from 'next/script'
import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }: AppProps) {
  return <>
<Head>
   <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

<Script strategy="lazyOnload">
    {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
</Script>
  </Head>
  <Component {...pageProps} /></>
}

export default MyApp
