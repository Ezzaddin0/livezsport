// 'use client'
import { getSingleNews } from '@/app/helpers';
import { Image } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react'

export async function generateMetadata({  searchParams }) {
  // read route params
  
  return {
    title: searchParams.title,
    description: searchParams.content,
    openGraph: {
      title: searchParams.title,
      description: searchParams.content
    },
    alternates: {
      canonical: `/News/newspage?${searchParams.title}`
    }
    
  }
}

const page = async ({searchParams}) => {
  const newsTitle = searchParams?.title;
  // const news = await getSingleNews(newsTitle)

  // console.log(searchParams);
    
  return (
    <div className='p-4'>
      <h1 className='mb-3 text-2xl font-bold'>{searchParams.title}</h1>
      <Image
      src={searchParams.urlToImage}
      alt={searchParams.title}
      width={1280}
      height={720}
      />
      <p className='mt-6'>date: {searchParams.publishedAt}</p>
      <p className='mt-2'>author: {searchParams.author}</p>
      <p className='mt-4'>{searchParams.content}</p>
      <p className='mt-6'>Sourese: <Link href={searchParams.url}>{searchParams.url}</Link></p>
    </div>
  )
}

export default page