import React from 'react'
import { Metadata } from 'next'
import Script from 'next/script'

export const metadata = {
  title: 'privacy Policy',
  description: '...',
}

const privacyPolicy = () => {

  return (
    <div className='p-4 text-2xl'>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
     crossOrigin="anonymous"/>
        <h2>privacy Policy</h2>
        <p>If you have problem send in soical media for website</p>
        <p>{"thank you (:"}</p>
    </div>
  )
}

export default privacyPolicy