// "use client"
import Image from 'next/image'
// import {Button} from "@nextui-org/react";
// import Header from './components/Header';
// import {NextUIProvider} from "@nextui-org/react";
// import SideBar, { SidebarItem } from './components/SideBar';
// import { HeadToHeadIcon, HomeIcon, MatchesIcon, NewsIcon, SunIcon } from './assets/icons/Icon';
// import {ThemeProvider as NextThemesProvider} from "next-themes";
import imagPage from "./assets/images/imgPage.png"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!",
  icons: "./assets/images/Ball.png",
  openGraph: {
    title: "Home",
    description: "Stay updated with the latest sports news, live match scores, and detailed match game information. Get real-time updates on scores for matches happening all day. Find comprehensive details, team line-ups, goals, and highlights for your favorite games. Don't miss any action!"
  },
  alternates: {
    canonical: "https://www.livezsport.com"
  }
}

const getData = async () => {
    const idPlayer = ["276", "1897", "759"]
    
    const radomPlayerId = Math.floor(Math.random() * idPlayer.length);
    const res = await fetch(`https://v3.football.api-sports.io/players?id=${idPlayer[radomPlayerId]}&season=${new Date().getFullYear()}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
      } 
    })

    if(!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json()
  }

export default async function Home() {

  const DataPlayer = await getData();
  const player = DataPlayer.response;

  

  return (
    <div className='home'>
      <div className='head-home flex flex-col items-center'>
        <h1 className='text-4xl sm:text-6xl font-semibold text-center my-3'>Live<span className='text-red-600'>Z</span>sport</h1>

        <p className='text-center lg:text-xl px-8 md:px-36 lg:px-52'>Discover the world of football on our website, offering the latest event news, match schedules, and live scores. Dive into head-to-head records and comprehensive team statistics, gaining valuable insights into their performance history. Your go-to destination for all things football, providing a comprehensive and convenient platform for fans to stay informed and engaged.</p>

        <Image
        alt='hello'
        src={imagPage}
        width={800}
        height={100}
        className='mt-8 rounded'
        />
      </div>

      <div className='upadte-section my-9 p-3'>
        <div className='title-card mb-6 text-3xl border-b-1 pb-3 pl-2'>
          <p className=''>Pages And Last Updates</p>
        </div>
        <div className='element-section  flex flex-col md:flex-row gap-6'>
        <div className="grid grid-cols-2 flex-1 text-center gap-2">
          <div>
              <div className=' bg-sky-400 inline-flex rounded p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path></svg>
              </div>
              <h4 className=" font-bold text-lg">Matches</h4>
              <p>Stay updated with the latest match schedules, scores, and highlights on our Matches page.</p>
          </div>
          <div>
              <div className=' bg-sky-400 inline-flex rounded p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path></svg>
              </div>
              <h4 className=" font-bold text-lg">News</h4>
              <p>Stay informed about the latest scores, player transfers, match previews, and more in the dynamic world of sports.</p>
          </div>
          <div>
              <div className=' bg-sky-400 inline-flex rounded p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path></svg>
              </div>
              <h4 className=" font-bold text-lg">head to head</h4>
              <p>Explore the head-to-head record and statistics between two football teams on our page.</p>
          </div>
          <div>
              <div className=' bg-sky-400 inline-flex rounded p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16"><path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"></path></svg>
              </div>
              <h4 className=" font-bold text-lg">Home</h4>
              <p>Paragraph of text beneath the heading to explain the heading.</p>
          </div>
        </div>

        <div className=' flex-1'>
          
          <ol className="relative border-l border-gray-200 dark:border-gray-700">                  
              <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">October 2023</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update the website and change the format</h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Changing the website theme, modifying website pages, and fixing problems</p>
              </li>
              <li className="mb-10 ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2023</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Page News</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">Stay informed about the latest scores, player transfers, and more in the dynamic world of sports.</p>
              </li>
              <li className="ml-4">
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2023</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create website</h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">Launch a website LivezSport.</p>
              </li>
          </ol>
        </div>
      </div>
      </div>

      <div className='Statistics-Section  my-9 p-3'>
        <div className='title-card mb-6 text-3xl border-b-1 pb-3 pl-2'>
          <p className=''>PLAYERS STATISTICS</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className=' col-span-2 px-24'>
          <Image
          alt='hello'
          src={`https://media.api-sports.io/football/players/${player[0].player.id}.png`}
          width={800}
          height={100}
          className='mt-8 rounded'
          />
          </div>
          <div className=' col-span-2 '>
          <div className="flex flex-col text-center">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Age</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th> */}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Name</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].player.name}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Height</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].player.height}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Weight</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].player.weight}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Age</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].player.age}y</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Country</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].player.nationality}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Rating</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{Number(player[0].statistics[0].games.rating).toFixed(1)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Position</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].statistics[0].games.position}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Goals</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].statistics[0].goals.total}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Cards Yellow</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].statistics[0].cards.yellow}</td>
                      </tr>

                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">Penalty Won</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{player[0].statistics[0].penalty.won || "0"}</td>
                      </tr>
                      {}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
