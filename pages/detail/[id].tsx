import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi'
import { MdOutlineCancel } from 'react-icons/md'
import { Video } from '../../types'

interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const videoRef = useRef<HTMLVideoElement>(null)
  if (!post) return null
  return (
    <div className="absolute left-0 top-0 flex w-full flex-wrap bg-white lg:flex-nowrap">
      <div className="flex-2 bg-black-600 flex w-[1000px] items-center justify-center lg:w-9/12 ">
        <div className="absolute top-6 left-2 z-50 flex gap-6 lg:left-6 ">
          <p>
            <MdOutlineCancel className="text-[35px] text-white" />
          </p>
        </div>
        <div className="relative">
          <div className="h-[60vh] lg:h-[100vh]">
            <video src={post.video.asset.url} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
  )
  return {
    props: {
      postDetails: data,
    },
  }
}

export default Detail
