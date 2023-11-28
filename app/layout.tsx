import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from './Provider'
import SideBar, { SidebarItem } from './components/SideBar'
import { HeadToHeadIcon, HomeIcon, MatchesIcon, NewsIcon } from './assets/icons/Icon'
import Header from './components/Header'
import Link from 'next/link'
import Footer from './components/Footer'
import GoogleAnalytics from "./GoogleAnalytics"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Livezsport.com - live soccer scores, football, and more ...',
  description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!",
  openGraph: {
    title: "Livezsport.com - live soccer scores, football, and more ...",
    description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!"
  },
  metadataBase: new URL("https://www.livezsport.com"),
  alternates: {
    canonical: "https://www.livezsport.com"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "production" && (

          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
          crossOrigin="anonymous">
          </script>
        )}
      </head>
      <body>
        <GoogleAnalytics/>
        <Provider>
        <div className='flex bg-slate-100 dark:bg-gray-900 min-h-screen'>
            <SideBar>
                <SidebarItem href='/' icon={<HomeIcon size={20} />} text="Home" active={Boolean(true)} alert={undefined}/>
                <SidebarItem href='/Games' icon={<MatchesIcon size={20} />} text="Games" active={Boolean(false)} alert={undefined}/>
                {/* <Link href="/News"> */}
                <SidebarItem href='/News' icon={<NewsIcon size={20} />} text="News" active={Boolean(false)} alert={undefined}/>
                {/* </Link> */}
                <SidebarItem href='/headtohead' icon={<HeadToHeadIcon size={20} />} text="HeadToHead" active={Boolean(false)} alert={undefined}/>
            </SideBar>
            <div className='Container-main w-full'>
              <Header/>
              { children }
            <Footer/>
            </div>
        </div>
        </Provider>
      </body>
    </html>
  )
}
