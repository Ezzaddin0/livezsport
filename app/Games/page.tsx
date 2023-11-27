// 'use client'
import React from 'react'
import TabsComponents from '../components/TabsComponents'
import CarouselGroup from '../components/CarouselGroup'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Games',
  description: "Stay updated with the latest football matches happening today. Get live scores, detailed statistics, and exciting event highlights for all matches. Follow your favorite teams and stay informed about goals, assists, cards, and more. Don't miss out on the action - check out our comprehensive coverage of today's football matches now",
  openGraph: {
    title: "Games",
    description: "Stay updated with the latest football matches happening today. Get live scores, detailed statistics, and exciting event highlights for all matches. Follow your favorite teams and stay informed about goals, assists, cards, and more. Don't miss out on the action - check out our comprehensive coverage of today's football matches now"
  },
  alternates: {
    canonical: "/Games"
  }
}

const page = async () => {

  var DataMatch = []

  const url = `https://v3.football.api-sports.io/fixtures?date=${new Date().getFullYear()}-${(new Date().getMonth()+1)}-${new Date().getDate()}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'v3.football.api-sports.io',
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json()
    // console.log(result);
    DataMatch = result
    // return result
  } catch (error) {
    console.error(error);
  }
  

    
  return (
    <div className=' p-2'>
        <CarouselGroup DataMatch={DataMatch}/>
        <TabsComponents DataMatch={DataMatch}/>
    </div>
  )
}

export default page