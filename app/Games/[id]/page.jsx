import React from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Card, CardHeader, CardBody, Tab, Tabs, Accordion, AccordionItem, Image, Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, ScrollShadow, CardFooter, User, Progress, Tooltip} from "@nextui-org/react";

const MatchPage = async ({ searchParams, params}) => {

  var DataMatch = []

  const fetchMatch = async () => {

    const url = `https://v3.football.api-sports.io/fixtures?id=${params.id}`;
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
  }

  // fetchMatch()




  return (
    <div className='p-4'>
      <Card className='mb-4'>
        <CardBody>
          <div className='flex justify-between items-center'>
            <div className='text-center'>
              <Image
                isBlurred // if team one create blur for image
                width={120}
                height={120}
                alt={"messi"}
                src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/1032.png`}
              />
              <p className='pt-7'>messi</p>
            </div>

            <div className=' text-center'>
              <p>2023-12-03 18:00</p>

              <h2 className=' text-5xl font-bold py-4'>1 - 1</h2>

              <p>Match Finished</p>

              <p className=' pt-8'>Saint-Petersburg Stadium St. Petersburg</p>

              <p><i className={`icon-svg icon-whistle mx-1`}></i> M.Oliver</p>
            </div>

            <div className='text-center'>
              <Image
                isBlurred // if team win create blur for image
                width={120}
                height={120}
                alt={"messi"}
                src={`https://app.requestly.io/delay/1000/https://media.api-sports.io/football/teams/1032.png`}
              />
              <p className='pt-7'>messi</p>
            </div>
          </div>
        </CardBody>
      </Card>
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader className="flex gap-3">
              <p className="text-md">Events</p>
          </CardHeader>
          <CardBody className='p-0'>
            <ScrollShadow hideScrollBar className="h-[300px]">
              
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Color
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Price
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple MacBook Pro 17&quot;
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>
                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Microsoft Surface Pro
                        </th>
                        <td class="px-6 py-4">
                            White
                        </td>
                        <td class="px-6 py-4">
                            Laptop PC
                        </td>
                        <td class="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                    <tr class="bg-white dark:bg-gray-800">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Magic Mouse 2
                        </th>
                        <td class="px-6 py-4">
                            Black
                        </td>
                        <td class="px-6 py-4">
                            Accessories
                        </td>
                        <td class="px-6 py-4">
                            $99
                        </td>
                    </tr>
                </tbody>
            </table>
            </ScrollShadow>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default MatchPage