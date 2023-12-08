'use client'
import React, { useEffect, useState } from "react";
// import Image from 'next/image'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Card, CardBody, Tab, Tabs, Accordion, AccordionItem, Image, Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, ScrollShadow, CardFooter, User, Progress, Tooltip} from "@nextui-org/react";
import {useInfiniteScroll} from "@nextui-org/use-infinite-scroll";
import {useAsyncList} from "@react-stately/data";
import { InfoIcon, UserIcon } from "../assets/icons/Icon";
import DataTest from '../assets/json/matchesData.json'
import Statistics from '../assets/json/statistics.json'
import Event from '../assets/json/Event.json'
import  statisticsData from "../assets/json/statisticsData.json";
import soccer_field from "../assets/images/soccer_field.png"
import lineupsData from "../assets/json/lineupsData.json"
import axios from "axios";
import { useRouter } from 'next/navigation'
import Link from 'next/link'


export default function TabsComponents({ DataMatch }) {
  const router = useRouter()

  const res = DataMatch.response;
  
  // const handleClick = () => {
  //   const path = `/Games/${matchData.fixture.id}`;
  //   router.push(path);
  // };

  const Runs = ["First", "Second", "Extra", "Panlty"]

  function EventsDataFun(arr) {
    const groups = {
      group1: [],
      group2: [],
      group3: [],
      group4: []
    };
  
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      // console.log(item);
  
      // Determine the group based on a condition
      if (item.time.elapsed < 45) {
        groups.group1.push(item);
      } else if (item.time.elapsed >= 45 && item.time.elapsed <= 90) {
        groups.group2.push(item);
      } else if(item.time.elapsed > 90 && item.time.elapsed < 120){
        groups.group3.push(item);
      } else {
        groups.group4.push(item);
      }
    }

    const result = Object.values(groups);
    return result.filter(group => group.length > 0);
  }

  const iconsModal = [
    { name: 'Normal Goal', value: 'icon-soccer-ball' },
    { name: 'Own Goal', value: 'icon-soccer-ball-own-goal' },
    { name: 'Penalty', value: 'icon-soccer-ball-penalty' },
    { name: 'Missed Penalty', value: 'icon-soccer-ball-missed-penalty' },

    { name: 'Yellow Card', value: 'icon-yellow-card' },
    { name: 'Red Card', value: 'icon-red-card' },

    { name: 'Substitution 1', value: 'icon-substitution' },
    { name: 'Substitution 2', value: 'icon-substitution' },
    { name: 'Substitution 3', value: 'icon-substitution' },

    { name: 'Goal cancelled', value: 'icon-soccer-ball-own-goal' },
    { name: 'Penalty confirmed', value: 'icon-soccer-ball-missed-penalty' },
  ];

let previousTeamId = null;

const [events, setEvents] = useState([])
  const [statistics, setStatickis] = useState([])
  const [lineups, setLineups] = useState([])
  const [playersStat, setPlayersSt] = useState([])

  const fetchDataModal = (id) => {
    const eventsApi = {
      method: 'GET',
      url: 'https://v3.football.api-sports.io/fixtures/events',
      params: {
        fixture: id,
      },
      headers: {
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
        'X-RapidAPI-Key': `798fac8d6b17ea279368cf79685ae6d5`
      }
    };
    const statisticsApi = {
      method: 'GET',
      url: 'https://v3.football.api-sports.io/fixtures/statistics',
      params: {
        fixture: id,
      },
      headers: {
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
        'X-RapidAPI-Key': `798fac8d6b17ea279368cf79685ae6d5`
      }
    };
    const lineupsApi = {
      method: 'GET',
      url: 'https://v3.football.api-sports.io/fixtures/lineups',
      params: {
        fixture: id,
      },
      headers: {
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
        'X-RapidAPI-Key': `798fac8d6b17ea279368cf79685ae6d5`
      }
    };
    const playersStApi = {
      method: 'GET',
      url: 'https://v3.football.api-sports.io/fixtures/players',
      params: {
        fixture: id,
      },
      headers: {
        'X-RapidAPI-Host': 'v3.football.api-sports.io',
        'X-RapidAPI-Key': `798fac8d6b17ea279368cf79685ae6d5`
      }
    };

    // const popupApi = 
    
    
    const getEvents = axios.request(eventsApi);
    const getStatistics = axios.request(statisticsApi);
    const getLineups = axios.request(lineupsApi);
    const getPlayers = axios.request(playersStApi);
    axios.all([getEvents, getStatistics, getLineups, getPlayers]).then( // [getEvents, getStatistics, getLineups, getPlayers]
      axios.spread((...allData) => {
        const getEventsData = allData[0].data;
        const getStatistics = allData[1].data;
        const getLineups = allData[2].data;
        const getPlayers = allData[3].data;

        // setAllMatch(allDataMatch.response);
        // setLiveMatch(getLiveMatch.response);
        setEvents(getEventsData.response);
        setStatickis(getStatistics.response);
        setLineups(getLineups.response);
        setPlayersSt(getPlayers.response);
      })
      )
    }

const {isOpen, onOpen, onOpenChange} = useDisclosure();

const [matchData, setMatchData] = useState(null);
function modalFunction(data,id) {
  setMatchData(data)
  fetchDataModal(id) 
}

const linkComponent = matchData ? (
  <Link href={`/Games/${matchData.fixture.id}`}>
    <Button color="primary"  size="sm" variant="ghost" className="mr-4 capitalize">
      more details
    </Button>
  </Link>
) : null;

const live = res.filter((item) => item.fixture.status.short === "2H" || item.fixture.status.short === "1H" || item.fixture.status.short === "HT");

const finshed = res.filter((item) => item.fixture.status.short === "FT");

const Scheduled = res.filter((item) => item.fixture.status.short === "NS");



function separateDuplicates(arr) {
    const groups = {};
  
    // Loop through the array
    for (let i = 0; i < arr.length; i++) {
      const itemID = arr[i].league.id;
      const item = arr[i];
  
      // Check if the item is already in the groups object
      if (groups[itemID]) {
        // If it exists, push the item to its corresponding group
        groups[itemID].push(item);
      } else {
        // If it doesn't exist, create a new group with the item
        groups[itemID] = [item];
      }
    }
  
    return Object.values(groups);
  }

  return (
    <>
    <Tabs aria-label="Options">
        <Tab key="ALL" title="ALL">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                        <Accordion isCompact variant="splitted" defaultExpandedKeys={["0"]}>
                            {separateDuplicates(res).map((groups, index) => {

                                return (
                            <AccordionItem 
                            key={index} 
                            className="accor-item" 
                            aria-label="Accordion 1" 
                            title={`${groups[0].league.country}`} 
                            subtitle={String(groups[0].league.name)}
                            startContent={
                                <Avatar
                                size="sm"
                                showFallback 
                                name={groups[0].league.country}
                                src={groups[0].league.logo || groups[0].league.flag}
                                />
                            }
                            >
                                <table className="w-full ">
                                    <tbody>
                                        {groups.map((data, index) => {                                          
                                            
                                            return (

                                        <tr key={index} className="flex justify-between items-center border-t border-gray-700 py-1 flex-wrap">
                                            <th className="text-start">{data.fixture.status.short}</th>
                                            <th className="match-item max-[480px]:w-full text-center">
                                                <div className="hidden min-[480px]:flex items-center justify-center">
                                                    <div className="flex items-center">
                                                        <p>{data.teams.home.name}</p>
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.home.name)}
                                                        />
                                                    </div>
                                                    <div className="px-2">{data.goals.home}-{data.goals.away}</div>
                                                    <div className="flex items-center">
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.away.name)}
                                                        />
                                                        <p>{data.teams.away.name}</p>
                                                    </div>
                                                </div>

                                                <div className="hidden max-[480px]:block">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.home.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.home.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.home || "-"}</p>
                                                        </div>
                                                        <div className="flex pt-1 items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.away.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.away.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.away || "-"}</p>
                                                        </div>
                                                </div>
                                            </th>
                                            <th className="info-element text-end">
                                                <Button aria-label="Info" isIconOnly size="sm" radius="lg" variant="light" onClick={() => modalFunction(data, data.fixture.id)} onPress={onOpen}>
                                                    
                                                <InfoIcon className="cursor-pointer" size="20" />
                                                </Button>
                                                
                                            </th>
                                        </tr>
                                            )
                                        } )}
                                    </tbody>
                                </table>
                            </AccordionItem>
                                )
                            })}
                        </Accordion>
                        </th>
                    </tr>
                </tbody>
            </table>
        </Tab>
        <Tab key="LIVE" title="LIVE">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                        <Accordion isCompact variant="splitted" defaultExpandedKeys={["0"]}>
                            {separateDuplicates(live).map((groups, index) => {
                              // console.log(groups);

                                return (
                            <AccordionItem 
                            key={index} 
                            className="accor-item" 
                            aria-label="Accordion 1" 
                            title={`${groups[0].league.country}`} 
                            subtitle={String(groups[0].league.name)}
                            startContent={
                                <Avatar
                                size="sm"
                                showFallback 
                                name={groups[0].league.country}
                                src={groups[0].league.logo || groups[0].league.flag}
                                />
                            }
                            >
                                <table className="w-full ">
                                    <tbody>
                                        {groups.map((data, index) => {
                                            
                                            return (

                                        <tr key={index} className="flex justify-between items-center border-t border-gray-700 py-1 flex-wrap">
                                            <th className="text-start">{data.fixture.status.short}</th>
                                            <th className="match-item max-[480px]:w-full text-center">
                                                <div className="hidden min-[480px]:flex items-center justify-center">
                                                    <div className="flex items-center">
                                                        <p>{data.teams.home.name}</p>
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.home.name)}
                                                        />
                                                    </div>
                                                    <div className="px-2">{data.goals.home}-{data.goals.away}</div>
                                                    <div className="flex items-center">
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.away.name)}
                                                        />
                                                        <p>{data.teams.away.name}</p>
                                                    </div>
                                                </div>

                                                <div className="hidden max-[480px]:block">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.home.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.home.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.home || "-"}</p>
                                                        </div>
                                                        <div className="flex pt-1 items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.away.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.away.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.away || "-"}</p>
                                                        </div>
                                                </div>
                                            </th>
                                            <th className="info-element text-end">
                                              {/* <Link href={{pathname: `/Games/${data.teams.home.name}vs${data.teams.away.name}&${data.league.name}&${data.league.country}`, query: {id: data.fixture.id, countryLeague: data.league.country, nameLeague: data.league.name, roundLeague: data.league.round, logoLeague: data.league.logo, homeName: data.teams.home.name, homeId: data.teams.home.id, fixtureDate: data.fixture.date, homeGoals: data.goals.home, awayGoals: data.goals.away, statusLong: data.fixture.status.long, venueName: data.fixture.venue.name, referee: data.fixture.referee, awayName: data.teams.away.name, awayId: data.teams.away.id, isOpen: isOpen, onOpenChange: onOpenChange}}}> */}
                                                <Button aria-label="Info" isIconOnly size="sm" radius="lg" onClick={() => modalFunction(data, data.fixture.id)} variant="light" onPress={onOpen}>
                                                    
                                                <InfoIcon className="cursor-pointer" size="20" />
                                                </Button>
                                              {/* </Link> */}
                                                
                                            </th>
                                        </tr>
                                            )
                                        } )}
                                    </tbody>
                                </table>
                            </AccordionItem>
                                )
                            })}
                        </Accordion>
                        </th>
                    </tr>
                </tbody>
            </table>  
        </Tab>
        <Tab key="FINSHED" title="FINSHED">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                        <Accordion isCompact variant="splitted" defaultExpandedKeys={["0"]}>
                            {separateDuplicates(finshed).map((groups, index) => {

                                return (
                            <AccordionItem 
                            key={index} 
                            className="accor-item" 
                            aria-label="Accordion 1" 
                            title={`${groups[0].league.country}`} 
                            subtitle={String(groups[0].league.name)}
                            startContent={
                                <Avatar
                                size="sm"
                                showFallback 
                                name={groups[0].league.country}
                                src={groups[0].league.logo || groups[0].league.flag}
                                />
                            }
                            >
                                <table className="w-full ">
                                    <tbody>
                                        {groups.map((data, index) => {
                                            
                                            return (

                                        <tr key={index} className="flex justify-between items-center border-t border-gray-700 py-1 flex-wrap">
                                            <th className="text-start">{data.fixture.status.short}</th>
                                            <th className="match-item max-[480px]:w-full text-center">
                                                <div className="hidden min-[480px]:flex items-center justify-center">
                                                    <div className="flex items-center">
                                                        <p>{data.teams.home.name}</p>
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.home.name)}
                                                        />
                                                    </div>
                                                    <div className="px-2">{data.goals.home}-{data.goals.away}</div>
                                                    <div className="flex items-center">
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.away.name)}
                                                        />
                                                        <p>{data.teams.away.name}</p>
                                                    </div>
                                                </div>

                                                <div className="hidden max-[480px]:block">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.home.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.home.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.home || "-"}</p>
                                                        </div>
                                                        <div className="flex pt-1 items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.away.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.away.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.away || "-"}</p>
                                                        </div>
                                                </div>
                                            </th>
                                            <th className="info-element text-end">
                                                <Button aria-label="Info" isIconOnly size="sm" radius="lg" variant="light" onClick={() => modalFunction(data, data.fixture.id)} onPress={onOpen}>
                                                    
                                                <InfoIcon className="cursor-pointer" size="20" />
                                                </Button>
                                                
                                            </th>
                                        </tr>
                                            )
                                        } )}
                                    </tbody>
                                </table>
                            </AccordionItem>
                                )
                            })}
                        </Accordion>
                        </th>
                    </tr>
                </tbody>
            </table> 
        </Tab>
        <Tab key="SCHEDULED" title="SCHEDULED">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-wrap dark:text-white">
                        <Accordion isCompact variant="splitted" defaultExpandedKeys={["0"]}>
                            {separateDuplicates(Scheduled).map((groups, index) => {
                              

                                return (
                            <AccordionItem 
                            key={index} 
                            className="accor-item" 
                            aria-label="Accordion 1" 
                            title={`${groups[0].league.country}`} 
                            subtitle={String(groups[0].league.name)}
                            startContent={
                                <Avatar
                                size="sm"
                                showFallback 
                                name={groups[0].league.country}
                                src={groups[0].league.logo || groups[0].league.flag}
                                />
                            }
                            >
                                <table className="w-full ">
                                    <tbody>
                                        {groups.map((data, index) => {
                                            
                                            return (

                                        <tr key={index} className="flex justify-between items-center border-t border-gray-700 py-1 flex-wrap">
                                            <th className="text-start">{data.fixture.date.slice(11, 16)}</th>
                                            <th className="match-item max-[480px]:w-full text-center">
                                                <div className="hidden min-[480px]:flex items-center justify-center">
                                                    <div className="flex items-center">
                                                        <p>{data.teams.home.name}</p>
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.home.name)}
                                                        />
                                                    </div>
                                                    <div className="px-2">{data.goals.home}-{data.goals.away}</div>
                                                    <div className="flex items-center">
                                                        {/* <Image
                                                            alt="The guitarist in the concert."
                                                            src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                            width={64}
                                                            height={64}
                                                            className=" !w-10 !h-10"
                                                            layout="responsive"
                                                        /> */}
                                                        <Avatar 
                                                         src={`https://media.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                                         size="sm"
                                                         showFallback
                                                         name={String(data.teams.away.name)}
                                                        />
                                                        <p>{data.teams.away.name}</p>
                                                    </div>
                                                </div>

                                                <div className="hidden max-[480px]:block">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.home.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.home.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.home || "-"}</p>
                                                        </div>
                                                        <div className="flex pt-1 items-center justify-between">
                                                            <div className="flex items-center">
                                                                <p>{data.teams.away.name}</p>
                                                                <Image
                                                                alt="The guitarist in the concert."
                                                                src={data.teams.away.logo}
                                                                width={64}
                                                                height={64}
                                                                className=" !w-8 !h-8"
                                                                layout="responsive"
                                                                />
                                                            </div>
                                                            <p>{data.goals.away || "-"}</p>
                                                        </div>
                                                </div>
                                            </th>
                                            {/* <Link href={`/Games/?league=${data.league.name}?match=${data.teams.home.name}vs${data.teams.away.name}`}> */}
                                            <th className="info-element text-end">
                                                <Button aria-label="Info" isIconOnly size="sm" radius="lg" variant="light" onClick={() => modalFunction(data, data.fixture.id)} onPress={onOpen}>
                                                    
                                                <InfoIcon className="cursor-pointer" size="20" />
                                                </Button>
                                                
                                            </th>
                                            {/* </Link> */}
                                        </tr>
                                            )
                                        } )}
                                    </tbody>
                                </table>
                            </AccordionItem>
                                )
                            })}
                        </Accordion>
                        </th>
                    </tr>
                </tbody>
            </table> 
        </Tab>
    </Tabs>

    <Modal isOpen={isOpen} size="4xl" scrollBehavior={"outside"} placement={"bottom"} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center justify-between">
              <User   
                name={`${matchData?.league?.country}: ${matchData?.league?.name}`}
                description={matchData?.league?.round || "League Name"}
                avatarProps={{
                  src: `${matchData?.league?.logo}`
                }}
              />
              {/* <Link href={`/Games/${matchData.fixture.id}`}> */}
              {/* <Button color="primary" onClick={handleClick}  size="sm" variant="ghost" className="mr-4 capitalize">
                more details
              </Button> */}
              {/* </Link> */}
              {linkComponent}
              </ModalHeader>
              <ScrollShadow hideScrollBar className=" h-3/4">
              <ModalBody>
                <Card>
                  <div className="flex justify-between items-center text-center py-8 px-2">
                    <div className="Team">
                      <Image
                        isBlurred // if team one create blur for image
                        width={120}
                        height={120}
                        alt={matchData?.teams?.home.name}
                        src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/${matchData?.teams?.home.id}.png`}
                      />
                      <p>{matchData?.teams?.home.name}</p>
                    </div>

                    <div className="details flex flex-col justify-between gap-2">
                      <div className="status">
                        <h4 className="pb-6">{matchData?.fixture?.date}</h4>
                        <h2 className=" text-5xl pb-3">{matchData?.goals?.home}-{matchData?.goals?.away}</h2>
                        <h3>{matchData?.fixture?.status.long}</h3>
                      </div>

                      <div className="stadium pt-6">
                        <h4>{matchData?.fixture?.venue.name}</h4>
                        <h4><i className={`icon-svg icon-whistle mx-1`}></i>{matchData?.fixture?.referee}</h4>
                      </div>
                    </div>

                    <div className="Team">
                      <Image
                        width={120}
                        height={120}
                        alt={matchData?.teams?.away.name}
                        src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/${matchData?.teams?.away.id}.png`}
                      />
                      <p>{matchData?.teams?.away.name}</p>
                    </div>
                  </div>
                </Card>


                <Card>
                  <CardBody>
                  <div className="flex w-full flex-col">
                    <Tabs variant="underlined" aria-label="Options">
                      {events.length > 0 && 
                      <Tab key="Events" title="Events">
                          {EventsDataFun(events).map((res,index) => {
                            

                            return (

                            <Table key={index} removeWrapper  aria-label="Example static collection table">
                            <TableHeader>
                              <TableColumn className="text-center">{Runs[index]} Half</TableColumn>
                              {/* <TableColumn>ROLE</TableColumn>
                              <TableColumn>STATUS</TableColumn> */}
                            </TableHeader>
                            <TableBody key={index}>
                              {res.map((data, index) => {

                              const isSameTeam = data.team.id === previousTeamId;
                              previousTeamId = data.team.id;

                              const desiredName = data.detail;

                              const foundObject = iconsModal.find(obj => obj.name === desiredName);

                              let variableValue = null;
                              if (foundObject) {
                                variableValue = foundObject.value;
                              }
                              
                                return (
                                  <TableRow key={index}>
                                    <TableCell className={isSameTeam ? "flex flex-row-reverse" : ""}>
                                      <small className="text-default-500"> {data.time.elapsed}&apos; </small>
                                       <i className={`icon-svg ${variableValue} mx-1`}></i>
                                       {data.player.name} 
                                       <small className="text-default-500"> {data.assist.name} </small>
                                    </TableCell>
                                  </TableRow>
                                )
                              })}
                            </TableBody>
                          </Table>
                            )
                          })}
                      </Tab>
                      }
                      {statistics.length > 0 && 
                      <Tab key="Statistics" title="Statistics">
                        <Table hideHeader removeWrapper  aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>status</TableColumn>
                            <TableColumn width={'100%'}>NAME</TableColumn>
                            <TableColumn width={'100%'}>STATUS</TableColumn>
                          </TableHeader>

                          <TableBody>
                            {statisticsData[0].statistics.map((data,index) => {

                              let valueOne = typeof data.value === 'string' ? data.value.replace('%', '') : data.value;

                              let valueTwo = typeof statisticsData[1].statistics[index].value === 'string' ? statisticsData[1].statistics[index].value.replace('%', '') : statisticsData[1].statistics[index].value;
                              
                              

                              return (
                                <TableRow key="1">
                                  <TableCell>{data.type}</TableCell>
                                  <TableCell className=" w-1/2">
                                    <Progress size="sm" maxValue={valueOne > 100 ? 600 : 100} color={valueOne > valueTwo ? "success" : "danger"} value={Number(valueOne)}  className="max-w-md" />
                                  </TableCell>
                                  <TableCell className=" w-1/2">
                                    <Progress size="sm" maxValue={valueTwo > 100 ? 600 : 100} color={valueOne < valueTwo ? "success" : "danger"}  value={Number(valueTwo)}  className="max-w-md" />
                                  </TableCell>
                                </TableRow>
                              )
                            })}
                          </TableBody>
                        </Table>
                      </Tab>
                      }
                      {lineups.length > 0 && 
                      <Tab key="Lineups" title="Lineups">
                      <div className='lineups h-96 md:w-full  max-[400px]:h-72 container grid grid-flow-col max-sm:rotate-90'>
                        <div className=' col-span-1 flex items-center'>
                          <Tooltip showArrow={true} content={lineupsData[0].startXI[0].player.name}>
                            <i className="icon-svg icon-shirt-alt max-sm:-rotate-90 mx-1"></i>
                          </Tooltip>
                        </div>

                        <div className=' col-span-10 flex gap-2'>
                          {lineups.map((team,indexTeam) => {

                            let player = 1;
                            
                            
                            return (
                              <div key={indexTeam} className={` col-span-4 flex items-center w-full h-full`}>
                                {team.formation.split("-").map((colsTeam,index) => {
                                  
                                  let shirtElements = [];
                                  for (let i = 0; i < colsTeam.length; i++) { // if error remove length
                                    shirtElements.push(
                                      <Tooltip showArrow={true} content={team.startXI[player++].player.name}>
                                        <i className={`icon-svg max-sm:-rotate-90 ${indexTeam === 0 ? "icon-shirt-alt" : "icon-shirt"} mx-1`}></i>
                                      </Tooltip>
                                    );
                                  }
                                  
                                  return (
                                    <div key={index} className={`w-full h-full flex flex-col justify-around items-center px-3`}>
                                      {shirtElements}
                                    </div>
                                  )
                                })}

                              </div>
                            )
                          })}
                        </div>

                        <div className='col-span-1 flex items-center'>
                          <Tooltip showArrow={true} content={lineupsData[1].startXI[0].player.name}>
                            <i className="icon-svg max-sm:-rotate-90 icon-shirt mx-1"></i>
                          </Tooltip>
                        </div>
                      </div>

                      <div className="dataLineups mt-2 flex max-sm:flex-col gap-6">
                        {lineups.map((data,index) => {

                          return (
                            <div key={index} className=" w-full">
                              <div className="head bg-gray-200/10 px-2 rounded-sm flex items-center justify-between">
                                <div className="flex items-center">
                                <h2>{data.team.name}</h2>
                                <h3>{data.formation}</h3>
                                </div>
                                <Image
                                src={data.team.logo}
                                alt={data.team.name}
                                width={44}
                                height={44}
                                />
                              </div>

                              <div className="coach">
                                <p className="uppercase p-2 bg-gray-200/5">coach</p>
                                <p className="p-2">{data.coach.name}</p>
                              </div>
                              
                              <div className="startXI">
                                <p className="uppercase p-2 bg-gray-200/5">starting XI</p>
                                {data.startXI.map((startxi,index) => {

                                  return (
                                    <p key={index} className="p-2"><span className=" text-gray-500 pr-4">{startxi.player.number}</span>{startxi.player.name}</p>
                                  )
                                })}
                              </div>
                              
                              <div className="substitutes">
                                <p className="uppercase p-2 bg-gray-200/5">substitutes</p>
                                {data.substitutes.map((sub,index) => {

                                  return (
                                    <p key={index} className="p-2"><span className=" text-gray-500 pr-4">{sub.player.number}</span>{sub.player.name}</p>
                                  )
                                })}
                              </div>
                              
                            </div>
                          )
                        })}

                      </div>
                      </Tab>
                      }
                      {playersStat.length > 0 && 
                      <Tab key="player" title="player">
                        {playersStat.map((playerSt, index) => {

                          return (

                        <Table key={index} removeWrapper  aria-label="Example static collection table">
                          <TableHeader>
                            <TableColumn>
                              <Image
                              className=" !w-7 !h-7"
                              src={playerSt.team.logo}
                              alt={playerSt.team.name}
                              width={28}
                              height={28}
                              />
                            </TableColumn>
                            <TableColumn>{playerSt.team.name}</TableColumn>
                            <TableColumn>P</TableColumn>
                            <TableColumn>R</TableColumn>
                            <TableColumn>M</TableColumn>
                            <TableColumn>G</TableColumn>
                            <TableColumn>GA</TableColumn>
                            <TableColumn>TS</TableColumn>
                            <TableColumn>SO</TableColumn>
                            <TableColumn>GC</TableColumn>
                            <TableColumn>GS</TableColumn>
                            <TableColumn>TP</TableColumn>
                            <TableColumn>KP</TableColumn>
                            <TableColumn>PA</TableColumn>
                            <TableColumn>YC</TableColumn>
                            <TableColumn>RC</TableColumn>
                          </TableHeader>
                          <TableBody>
                              {playerSt.players.map((player, indexP) => {
                                
                                return (
                                  <TableRow key={index}>
                                  <TableCell>
                                    <Image
                                      className=" !w-7 !h-7"
                                      src={player.player.photo}
                                      alt={player.player.name}
                                      width={28}
                                      height={28} 
                                      />
                                  </TableCell>
                                  <TableCell>{player.player.name}</TableCell>
                                  <TableCell>{player.statistics[0].games.position}</TableCell>
                                  <TableCell>{player.statistics[0].games.rating || "-"}</TableCell>
                                  <TableCell>{player.statistics[0].games.minutes || "-"}</TableCell>
                                  <TableCell>{player.statistics[0].goals.total || "-"}</TableCell>
                                  <TableCell>{player.statistics[0].goals.assists || "-"}</TableCell>
                                  <TableCell>{player.statistics[0].shots.total}</TableCell>
                                  <TableCell>{player.statistics[0].shots.on}</TableCell>
                                  <TableCell>{player.statistics[0].goals.conceded}</TableCell>
                                  <TableCell>{player.statistics[0].goals.saves || "-"}</TableCell>
                                  <TableCell>{player.statistics[0].passes.total}</TableCell>
                                  <TableCell>{player.statistics[0].passes.key}</TableCell>
                                  <TableCell>{player.statistics[0].passes.accuracy}</TableCell>
                                  <TableCell>{player.statistics[0].cards.yellow}</TableCell>
                                  <TableCell>{player.statistics[0].cards.red}</TableCell>
                              </TableRow>
                                )
                              })}
                          </TableBody>
                        </Table>
                          )
                        })}
                      </Tab>
                      }
                    </Tabs>
                  </div>  
                  </CardBody>
                </Card>
              </ModalBody>
                </ScrollShadow>
              <ModalFooter>
                {/* <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}