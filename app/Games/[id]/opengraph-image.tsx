import Image from "next/image";
import { ImageResponse } from "next/server";

export const size = {
    width: 900,
    height: 450,

};

export const contentType = "image/png";

async function fetchMatch(id: number) {

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

interface Props {
    params: {
        id: number;
    };
};


export default async function og({params}:Props) {
    const post = await fetchMatch(params.id)
    const postRes = await post.response[0];

    return new ImageResponse((
        <div tw=" relative flex items-center justify-between">
            <Image src={`https://media.api-sports.io/football/teams/${postRes.teams.home.id}.png`} alt={postRes.teams.home.name}/>
            <div tw="absolute flex bg-black opacity-50 inset-0"/>
            <div tw="absolute flex items-center top-2 w-full">
                <p tw="text-white text-4xl flex font-bold m-5">{postRes.teams.home.name}</p>
                <p tw="text-white text-4xl flex font-bold m-5">{postRes.teams.away.name}</p>
            </div>
        </div>
    ))
}