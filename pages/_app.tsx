import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { GoogleOAuthProvider } from '@react-oauth/google'

function MyApp({ Component, pageProps }: AppProps) {
  const [isSSR, setisSSR] = useState(true)

  useEffect(() => {
    setisSSR(false)
  }, [])
  if (isSSR) return null
  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
    >
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">

        <Navbar />
        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="videos mt-4 flex h-[88vh] flex-1 flex-col gap-10 overflow-auto">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default MyApp
