import React from 'react'
import { Metadata } from 'next'

export const metadata = {
  title: 'privacy Policy',
  description: '...',
}

const privacyPolicy = () => {

  console.log("https://v3.football.api-sports.io/fixtures?date=" + new Date().getFullYear() + "-" + (new Date().getMonth()+1) + "-" + new Date().getDate())
  return (
    <div className='p-4 text-2xl'>
        <h2>privacy Policy</h2>
        <p>If you have problem send in soical media for website</p>
        <p>{"thank you (:"}</p>
    </div>
  )
}

export default privacyPolicy