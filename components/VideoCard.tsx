import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { Video } from '../types'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'

interface IProps {
  post: Video
}

export const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setisHover] = useState<boolean>(false)
  const [playing, setplaying] = useState<boolean>(false)
  const [muted, setmuted] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onVideoPress = (): void => {
    if (playing) {
      videoRef?.current?.pause()
      setplaying(false)
    } else {
      videoRef?.current?.play()
      setplaying(true)
    }
  }
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex cursor-pointer gap-3 rounded p-2 font-semibold">
          <div className="h-10 w-10 md:h-16 md:w-16">
            <Link href={`/`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profit"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/`}>
              <div className="flex items-center gap-2">
                <p className="md:text-md flex items-center gap-2 font-bold text-primary">
                  {post.postedBy.userName}{' '}
                  <GoVerified className="text-md text-blue-400" />
                </p>
                <p className="hidden text-xs font-medium capitalize text-gray-500 md:block">
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative flex gap-4 lg:ml-20">
        <div
          className="rounded-3xl"
          onMouseEnter={() => {
            setisHover(true)
          }}
          onMouseLeave={() => {
            setisHover(false)
          }}
        >
          <Link href={`/detail/${post._id}`}>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              loop
              className="h-[300px] w-[200px] cursor-pointer rounded-2xl bg-gray-100 md:h-[400px] lg:h-[528px] lg:w-[700px]"
            />
          </Link>
          {isHover && (
            <div className="absolute bottom-6 left-8 flex w-[100px] cursor-pointer gap-10 p-3 md:left-14 md:w-[50px] lg:left-0 lg:w-[600px] lg:justify-between">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
              {muted ? (
                <button onClick={() => setmuted(false)}>
                  <HiVolumeOff className="text-2xl text-black lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setmuted(true)}>
                  <HiVolumeUp className="text-2xl text-black lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
