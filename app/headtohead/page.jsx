import React from 'react'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata = {
  title: 'Head To Head',
  description: "Explore the head-to-head record between two football teams and gain valuable insights by analyzing their past encounters. Discover the historical performance, statistics, and key moments of matches played between these teams. Whether you're a fan, a bettor, or a sports enthusiast, our page provides a comprehensive overview of the head-to-head history between two teams",
  openGraph: {
    title: "Head To Head",
    description: "Explore the head-to-head record between two football teams and gain valuable insights by analyzing their past encounters. Discover the historical performance, statistics, and key moments of matches played between these teams. Whether you're a fan, a bettor, or a sports enthusiast, our page provides a comprehensive overview of the head-to-head history between two teams"
  },
  alternates: {
    canonical: "/headtohead"
  }
}
const HeadToHead = () => {
  return (
    <div className=' h-screen flex items-center justify-center'>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
     crossOrigin="anonymous"/>
        <p className=' text-center text-5xl font-semibold'>Comming Soon</p>
    </div>
  )
}

export default HeadToHead