import {Card, CardBody, Image, Progress, Tooltip} from "@nextui-org/react";
import Script from 'next/script'

async function fetchMatch(id) {

    const res = await fetch(`https://v3.football.api-sports.io/fixtures?id=${id}`, {
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

export async function generateMetadata({ params }) {
  // read route params
  const DataMatch = await fetchMatch(params.id);
  
   return {
    title: `${DataMatch.response[0].teams.home.name} vs ${DataMatch.response[0].teams.away.name}`,
    description: `${DataMatch.response[0].fixture.status.long}: ${DataMatch.response[0].teams.home.name} ${DataMatch.response[0].score.fulltime.home}-${DataMatch.response[0].score.fulltime.away} ${DataMatch.response[0].teams.away.name} at ${DataMatch.response[0].fixture.venue.name}, ${DataMatch.response[0].fixture.venue.city}. Referee: ${DataMatch.response[0].fixture.referee} date: ${DataMatch.response[0].fixture.date}`,
    openGraph: {
      title: `${DataMatch.response[0].teams.home.name} vs ${DataMatch.response[0].teams.away.name}`,
      description: `${DataMatch.response[0].fixture.status.long}: ${DataMatch.response[0].teams.home.name} ${DataMatch.response[0].score.fulltime.home}-${DataMatch.response[0].score.fulltime.away} ${DataMatch.response[0].teams.away.name} at ${DataMatch.response[0].fixture.venue.name}, ${DataMatch.response[0].fixture.venue.city}. Referee: ${DataMatch.response[0].fixture.referee} date: ${DataMatch.response[0].fixture.date}`
    },
    alternates: {
      canonical: `/Games/${params.id}`
    }
    
  }
}

async function fetchEvents(id) {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures/events?fixture=${id}`, {
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

async function fetchStatistics(id) {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${id}`, {
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

async function fetchLineups(id) {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures/lineups?fixture=${id}`, {
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

async function fetchPlayer(id) {
    const res = await fetch(`https://v3.football.api-sports.io/fixtures/players?fixture=${id}`, {
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

const MatchPage = async ({ params }) => {

const DataMatch = await fetchMatch(params.id);
const DataEvents = await fetchEvents(params.id);
const DataStatistics = await fetchStatistics(params.id);
const DataLineups = await fetchLineups(params.id);
const DataPlayer = await fetchPlayer(params.id);




  const Runs = ["First", "Second", "Extra", "Panlty"]
  let previousTeamId = null;
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




  return (
    <div className='p-4'>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9613838390292158"
     crossOrigin="anonymous"/>
      <Card className='mb-4'>
        <CardBody>
          <div className='flex justify-between items-center'>
            <div className='text-center'>
              <Image
                isBlurred // if team one create blur for image
                width={120}
                height={120}
                alt={DataMatch.response[0].teams.home.name}
                src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/${DataMatch.response[0].teams.home.id}.png`}
              />
              <p className='pt-7'>{DataMatch.response[0].teams.home.name}</p>
            </div>

            <div className=' text-center'>
              <p>{DataMatch.response[0].fixture.date.slice(0,10)} {DataMatch.response[0].fixture.date.slice(11,16)}</p>

              <h2 className=' text-5xl font-bold py-4'>{DataMatch.response[0].goals.home} - {DataMatch.response[0].goals.away}</h2>

              <p>{DataMatch.response[0].fixture.status.long}</p>

              <p className=' pt-8'>{DataMatch.response[0].fixture.venue.name}. {DataMatch.response[0].fixture.venue.city}</p>

              <p><i className={`icon-svg icon-whistle mx-1`}></i> {DataMatch.response[0].fixture.referee}</p>
            </div>

            <div className='text-center'>
              <Image
                isBlurred // if team win create blur for image
                width={120}
                height={120}
                alt={DataMatch.response[0].teams.away.name}
                src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/${DataMatch.response[0].teams.away.id}.png`}
              />
              <p className='pt-7'>{DataMatch.response[0].teams.away.name}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className='flex flex-col gap-4'>
        <section>
          <p className='text-center text-3xl pb-4'>Event</p>        
          <Card>
            <CardBody className='p-3'>    
                {EventsDataFun(DataEvents.response).map((res, index) => {

                    return (
                        <div key={index} className='w-full mb-4'>
                            <p className='text-center text-xl p-1 bg-gray-700/50 rounded'>{Runs[index]} Half</p>
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
                                    // <TableRow key={index}>
                                    <div key={index} className={`${isSameTeam ? "flex flex-row-reverse items-center" : ""} p-1 border-b border-gray-500/40`}>
                                        <small className="text-default-500"> {data.time.elapsed}&apos; </small>
                                        <i className={`icon-svg ${variableValue} mx-1`}></i>
                                        {data.player.name} 
                                        <small className="text-default-500"> {data.assist.name} </small>
                                    </div>
                                    // </TableRow>
                                )
                                })}
                        </div>
                    )
                })}  
            </CardBody>
          </Card>
        </section>
        
        <section>
          <p className='text-center text-3xl pb-4'>Statistics</p>        
          <Card>
            <CardBody className='p-0'>      
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs invisible text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Product name
                          </th>
                          <th scope="col" className="w-1/2 px-6 py-3">
                              Color
                          </th>
                          <th scope="col" className="w-1/2 px-6 py-3">
                              Category
                          </th>
                          {/* <th scope="col" className="px-6 py-3">
                              Price
                          </th> */}
                      </tr>
                  </thead>
                  <tbody>
                  {DataStatistics.response[0].statistics.map((data,index) => {

                    let valueOne = typeof data.value === 'string' ? data.value.replace('%', '') : data.value;

                    let valueTwo = typeof DataStatistics.response[1].statistics[index].value === 'string' ? DataStatistics.response[1].statistics[index].value.replace('%', '') : DataStatistics.response[1].statistics[index].value;



                    return (
                    <tr key="1" className=' border-b  dark:border-gray-700'>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{data.type}</th>
                        <td className="px-6 py-4">
                            <Progress size="sm" maxValue={valueOne > 100 ? 600 : 100} color={valueOne > valueTwo ? "success" : "danger"} value={Number(valueOne)}  className="max-w-md" />
                        </td>
                        <td className="px-6 py-4">
                            <Progress size="sm" maxValue={valueTwo > 100 ? 600 : 100} color={valueOne < valueTwo ? "success" : "danger"}  value={Number(valueTwo)}  className="max-w-md" />
                        </td>
                    </tr>
                    )
                    })}
                  </tbody>
              </table>
            </CardBody>
          </Card>
        </section>

        <section>
          <p className='text-center text-3xl pb-4'>Lineups</p>        
          <Card>
            <CardBody className='p-0'>      
            <div className='lineups h-96 md:w-full  max-[400px]:h-72 container grid grid-flow-col max-sm:rotate-90'>
                <div className=' col-span-1 flex items-center'>
                    <Tooltip showArrow={true} content={DataLineups.response[0].startXI[0].player.name}>
                    <i className="icon-svg icon-shirt-alt max-sm:-rotate-90 mx-1"></i>
                    </Tooltip>
                </div>

                <div className=' col-span-10 flex gap-2'>
                    {DataLineups.response.map((team,indexTeam) => {

                    let player = 1;
                    
                    
                    return (
                        <div key={indexTeam} className={` col-span-4 flex items-center w-full h-full`}>
                        {team.formation.split("-").map((colsTeam,index) => {
                            
                            let shirtElements = [];
                            for (let i = 0; i < colsTeam.length; i++) { // if error remove length
                            shirtElements.push(
                                <div key={i} id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    <i className={`icon-svg max-sm:-rotate-90 ${indexTeam === 0 ? "icon-shirt-alt" : "icon-shirt"} mx-1`}></i>
                                    <div className="tooltip-arrow" data-popper-arrow></div>
                                </div>
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
                    <Tooltip showArrow={true} content={DataLineups.response[1].startXI[0].player.name}>
                    <i className="icon-svg max-sm:-rotate-90 icon-shirt mx-1"></i>
                    </Tooltip>
                </div>
            </div>

            <div className="dataLineups mt-2 flex max-sm:flex-col gap-6">
                {DataLineups.response.map((data,index) => {

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
            </CardBody>
          </Card>
        </section>

        <section>
          <p className='text-center text-3xl pb-4'>player</p>        
          <Card>
            <CardBody className='p-0'>   
            {DataPlayer.response.map((playerSt, index) => {

            return (

                <table key={index} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-3 py-3">
                            <Image className=" !w-7 !h-7" src={playerSt.team.logo} alt={playerSt.team.name} width={28} height={28}/>
                        </th>
                        <th scope="col" className="px-3 py-3">
                            {playerSt.team.name}
                        </th>
                        <th scope="col" className="px-3 py-3">
                            P
                        </th>
                        <th scope="col" className="px-3 py-3">
                            R
                        </th>
                        <th scope="col" className="px-3 py-3">
                            M
                        </th>
                        <th scope="col" className="px-3 py-3">
                            G
                        </th>
                        <th scope="col" className="px-3 py-3">
                            GA
                        </th>
                        <th scope="col" className="px-3 py-3">
                            TS
                        </th>
                        <th scope="col" className="px-3 py-3">
                            SO
                        </th>
                        <th scope="col" className="px-3 py-3">
                            GC
                        </th>
                        <th scope="col" className="px-3 py-3">
                            GS
                        </th>
                        <th scope="col" className="px-3 py-3">
                            TP
                        </th>
                        <th scope="col" className="px-3 py-3">
                            KP
                        </th>
                        <th scope="col" className="px-3 py-3">
                            PA
                        </th>
                        <th scope="col" className="px-3 py-3">
                            YC
                        </th>
                        <th scope="col" className="px-3 py-3">
                            RC
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {playerSt.players.map((player, indexP) => {

                        return (

                        <tr key={indexP} className=" border-b dark:border-gray-700">
                            <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <Image
                            className=" !w-7 !h-7"
                            src={player.player.photo}
                            alt={player.player.name}
                            width={28}
                            height={28} 
                            />
                            </th>
                            <td className="px-3 py-4">
                            {player.player.name}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].games.position}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].games.rating || "-"}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].games.minutes || "-"}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].goals.total || "-"}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].goals.assists || "-"}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].shots.total}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].shots.on}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].goals.conceded}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].goals.saves || "-"}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].passes.total}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].passes.key}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].passes.accuracy}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].cards.yellow}
                            </td>
                            <td className="px-3 py-4">
                            {player.statistics[0].cards.red}
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
            )
            })}
            </CardBody>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default MatchPage