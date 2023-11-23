'use client'
import React, { useState } from 'react'
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"


import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Link, User } from '@nextui-org/react';

const CarouselGroup = ({ DataMatch }: any) => {

  const res = DataMatch.response;

  const live = res.filter((item: { fixture: { status: { short: string; }; }; }) => item.fixture.status.short === "2H" || item.fixture.status.short === "1H" || item.fixture.status.short === "HT");

    const testLoop = ['', '', '', '', '', '', '', '', '']

    const [ref] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
          origin: "center",
          perView: 1,
          spacing: 10,
        },
        vertical: true,
      })

    const [currentSlide, setCurrentSlide] = React.useState(0)
        const [loaded, setLoaded] = useState(false)
        const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
            slides: {
                perView: 2,
                spacing: 10,
            },
            initial: 0,
            slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
            },
            created() {
            setLoaded(true)
            },
    })
      return (
        <>
        <div className="navigation-wrapper !hidden md:!block max-w-[91vw] lg:max-w-[90vw] max-lg:max-w-[89vw] pb-4">
            <div ref={sliderRef} className="keen-slider rounded-sm">
                {live.map((data: { league: { country: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; name: any; round: any; flag: any; logo: any; }; teams: { home: { id: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; away: { id: any; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }; goals: { home: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; away: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; fixture: { status: { elapsed: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }; },index: React.Key | null | undefined) => {

                    return (
                <div key={index} className="keen-slider__slide number-slide1 rounded-sm !min-w-[50%] !max-w-[100%]">
                    <Card fullWidth={true}>
                        <CardHeader className="flex gap-3">
                            <User   
                            name={data.league.country}
                            description={`${data.league.name} - ${data.league.round}`}
                            avatarProps={{
                                src: data.league.flag || data.league.logo
                            }}
                            />
                        </CardHeader>
                        <Divider/>
                        <CardBody className=' justify-center'>
                            <div className=' flex justify-between items-center'>
                                <div>
                                    <Image
                                    src={`https://media-4.api-sports.io/football/teams/${data.teams.home.id}.png`}
                                    alt=''
                                    width={64}
                                    height={64}
                                    />
                                    <p>{data.teams.home.name}</p>
                                </div>

                                <div className=' flex flex-col items-center gap-3'>
                                    <p className=' text-4xl'>{data.goals.home} - {data.goals.away}</p>
                                    <p className=' bg-blue-900 px-6 py-1 rounded-2xl'>{data.fixture.status.elapsed}&apos;</p>
                                </div>

                                <div>
                                    <Image
                                    src={`https://media-4.api-sports.io/football/teams/${data.teams.away.id}.png`}
                                    alt=''
                                    width={64}
                                    height={64}
                                    />
                                    <p>{data.teams.away.name}</p>
                                </div>
                        </div>
                        </CardBody>
                    </Card>
                </div>
                    )
                })}
            </div>
            {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
        </div>

        <div ref={ref} className="keen-slider mb-4 !hidden max-md:!flex" style={{ height: 300 }}>
            <div className="keen-slider__slide number-slide1">
            <Card fullWidth={true}>
                        <CardHeader className="flex gap-3">
                            <User   
                            name="Jane Doe"
                            description="Product Designer"
                            avatarProps={{
                                src: "https://media.api-sports.io/football/teams/442.png"
                            }}
                            />
                        </CardHeader>
                        <Divider/>
                        <CardBody className=' justify-center'>
                            <div className=' flex justify-between items-center'>
                                <div>
                                    <Image
                                    src='https://media.api-sports.io/football/teams/442.png'
                                    alt=''
                                    width={64}
                                    height={64}
                                    />
                                    <p>Messai</p>
                                </div>

                                <div className=' flex flex-col items-center gap-3'>
                                    <p className=' text-4xl'>5 - 1</p>
                                    <p className=' bg-blue-900 px-6 py-1 rounded-2xl'>87&apos;</p>
                                </div>

                                <div>
                                    <Image
                                    src='https://media.api-sports.io/football/teams/442.png'
                                    alt=''
                                    width={64}
                                    height={64}
                                    />
                                    <p>Messai</p>
                                </div>
                        </div>
                        </CardBody>
                    </Card>
            </div>
            <div className="keen-slider__slide number-slide2">2</div>
            <div className="keen-slider__slide number-slide3">3</div>
            <div className="keen-slider__slide number-slide4">4</div>
            <div className="keen-slider__slide number-slide5">5</div>
            <div className="keen-slider__slide number-slide6">6</div>
        </div>
        </>
      )
}

function Arrow(props: {
    disabled: boolean
    left?: boolean
    onClick: (e: any) => void
  }) {
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
  

export default CarouselGroup