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
  title: {
    default: "Livezsport.com - live soccer scores, football, and more ...",
    template: `%s | Livezsport`
  },
  description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!",
  verification: {
    google: "google-site-verification=o1MR0g-6fJgHF5kXZxPSZIykDOiBuxY8HNhSGlVvTF0"
  },
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
        <meta name="keywords" content="live football scores, football match analytics, football player analytics, football news, football stats, live sports scores, live match tracker, sports analytics, live soccer scores, football today, football matches today, live sports news, team news, player news, match reports, highlights, transfer news, fantasy football, betting tips, [Specific League] Live Scores, [Specific Match] Analytics, [Specific Player] Stats, [Specific Team] News, How to Analyze Football Matches, Best Football Analytics Tools, Top Football Players Today, Live football scores, Football analytics, Match analysis, Player statistics, Football news, Live match updates, Football score predictions, Player performance analysis, Football match statistics, Team rankings, Football highlights, Football news updates, Football data analysis, Player profiles, Football scorecards"/>
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
