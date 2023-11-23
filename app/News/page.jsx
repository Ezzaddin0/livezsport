// 'use client'
// import React, { useEffect, useState } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { Card, CardHeader, CardBody, CardFooter, Image } from '@nextui-org/react'
import Link from 'next/link'
// import { Metadata } from 'next'

export const metadata = {
  title: 'News',
  description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!",
}


const getNews = async () => {
  const res = await fetch("https://newsapi.org/v2/everything?q=football&from=2023-11-15&to=2023-11-15&sortBy=popularity&pageSize=20&page=1&apiKey=b3b3280d1f9a4f6f88f746366c54d67d");

  if(!res.ok) {
      throw new Error("Failed to fetch data");
  }
  return res.json()
}

const page = async () => {

  const News = await getNews();
  // const [news, setNews] = useState([]);

  // async function  data() {
  //   const response = await fetch(`https://newsapi.org/v2/everything?q=football&from=2023-11-05&to=2023-11-05&sortBy=popularity&pageSize=20&page=1&apiKey=b3b3280d1f9a4f6f88f746366c54d67d
  //   `)
  //   const data = await response.json()
  //   const results = data.articles;
        
  //   setNews(results)
  //   console.log(results);
  // }

  // useEffect(() => {
  //   data()
    
    
    
    
  // },[])

  // const [currentSlide, setCurrentSlide] = React.useState(0)
  // const [loaded, setLoaded] = useState(false)
  // const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
  //   initial: 0,
  //   slideChanged(slider) {
  //     setCurrentSlide(slider.track.details.rel)
  //   },
  //   created() {
  //     setLoaded(true)
  //   },
  // })
  return (
    <div className=''>
      {/* <div className="navigation-wrapper">
        <div className="keen-slider p-2 rounded max-w-[91vw] lg:max-w-[93vw]">
          {News.articles.slice(0, 9).map((data,index) => {

            return (
              <div className="keen-slider__slide number-slide1 !h-80 rounded">
                <Image
                src={data.urlToImage}
                alt={data.title}
                fallbackSrc="https://via.placeholder.com/300x200"
                width={1200}
                height={250}
                />
          </div>
            )
          })}
        </div>
        
      </div> */}
      <div className='CardNews grid gap-3 py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {News.articles.map((data,index) => {       
          // console.log(data);
             

          return (
            <Link href={{pathname: "/News/newspage", query: {title: data?.title, description: data?.description, urlToImage: data?.urlToImage, publishedAt: data?.publishedAt, content: data?.content, url: data?.url, author: data?.author} }} key={index}>
            <Card key={index} className="py-4 max-sm:mx-4 ">
              {/* <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                <small className="text-default-500">12 Tracks</small>
                <h4 className="font-bold text-large">Frontend Radio</h4>
              </CardHeader> */}
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