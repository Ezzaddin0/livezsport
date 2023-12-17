// 'use client'
import React from 'react'
import TabsComponents from '../components/TabsComponents'
import CarouselGroup from '../components/CarouselGroup'
import { Metadata } from 'next'
import Head from 'next/head'
import Script from 'next/script'

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

async function getMatch() {

  const date = new Date();
  const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0"+ date.getMonth()+1 : date.getMonth()+1}-${date.getDate() < 10 ? "0"+ date.getDate() : date.getDate()}`, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
      }
  })
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}
setInterval(getMatch, 24 * 60 * 60 * 1000);

const page = async () => {

  const Match = await getMatch();
  
  

  // const date = new Date();

  // var DataMatch = []

  // const url = `https://v3.football.api-sports.io/fixtures?date=${date.getFullYear()}-${date.getMonth()+1 < 10 ? "0"+ date.getMonth()+1 : date.getMonth()+1}-${date.getDate() < 10 ? "0"+ date.getDate() : date.getDate()}`;
  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Host': 'v3.football.api-sports.io',
  //     'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`
  //   }
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json()
  //   // console.log(result);
  //   DataMatch = result
  //   // return result
  // } catch (error) {
  //   console.error(error);
  // }
  const live = Match.response.filter((item: { fixture: { status: { short: string; }; }; }) => item.fixture.status.short === "2H" || item.fixture.status.short === "1H" || item.fixture.status.short === "HT");
  
  
// console.log(Match);

    
  return (
    <div className=' p-2'>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
     crossOrigin="anonymous"/>
      {live.length > 0 &&
        <CarouselGroup DataMatch={Match}/>
      }
        <TabsComponents DataMatch={Match}/>
    </div>
  )
}

export default page