// 'use client'
// import React, { useEffect, useState } from 'react'
import "keen-slider/keen-slider.min.css"
import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
// import { Metadata } from 'next'
import Script from 'next/script'

export const metadata = {
  title: 'News',
  description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!",
  
  openGraph: {
    title: "News",
    description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!"
  },
  alternates: {
    canonical: "/News"
  }
}


const getNews = async () => {
  const res = await fetch(`https://newsapi.org/v2/everything?q=football&from=${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()-3}&to=${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}&sortBy=popularity&pageSize=20&page=1&apiKey=${process.env.NEWS_API_KEY}`);

  if(!res.ok) {
      throw new Error("Failed to fetch data");
  }
  return res.json()
}


const page = async () => {

  const News = await getNews();


  return (
    <div className=''>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
     crossOrigin="anonymous"/>
      <div className='CardNews grid gap-3 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {News.articles.map((data,index) => {       
             

          return (
            <Link href={{pathname: `/News/${data.title}`, query: {title: data?.title, description: data?.description, urlToImage: data?.urlToImage, publishedAt: data?.publishedAt, content: data?.content, url: data?.url, author: data?.author} }} key={index}>
            <Card key={index} className="py-4 max-sm:mx-4 ">
              
              <CardBody key={index} className="overflow-visible">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={data.urlToImage}
                  fallbackSrc="https://via.placeholder.com/300x200"
                  width={250}
                  height={270}
                />
              </CardBody>
              <CardFooter>
              <h4 className="font-bold text-base">{data.title}</h4>
              </CardFooter>
            </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Arrow() {
  const disabeld = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}


export default page