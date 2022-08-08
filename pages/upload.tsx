import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import useAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import axios from 'axios'

const Upload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [videoAsset, setvideoAsset] = useState<
    SanityAssetDocument | undefined
  >()
  const [wrongFileType, setWrongFileType] = useState<boolean>(false)
  const [caption, setCaption] = useState('')
  const [category, setCategory] = useState(topics[0].name)
  const [savingPost, setSavingPost] = useState(false)
  const { userProfile }: { userProfile: any } = useAuthStore()
  const router = useRouter()
  const uploadVideo = async (e: any) => {
    const selectFile = e.target.files[0]
    const fileTypes = ['video/mp4', 'video/ogg', 'video/webm']
    if (fileTypes.includes(selectFile.type)) {
      client.assets
        .upload('file', selectFile, {
          contentType: selectFile.type,
          filename: selectFile.name,
        })
        .then((data: SanityAssetDocument) => {
          setvideoAsset(data)
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
      setWrongFileType(true)
    }
  }

  const handlePost = async () => {
    if (caption && videoAsset?._id && category) {
      setSavingPost(true)
      const document = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic: category,
      }
      await axios.post('http://localhost:3000/api/post', document)
      router.push('/')
    }
  }

  return (
    <div className="absolute left-0 top-[60px] mb-10 flex h-full w-full justify-center bg-[#F8F8F8] pt-10 lg:pt-20">
      <div className="flex w-[60%] flex-wrap items-center justify-between gap-6 rounded-lg bg-white p-14 pt-6 xl:h-[80vh]">
        <div>
          <div>
            <p className="text-2xl font-bold">Upload Video</p>
            <p className="text-md mt-1 text-gray-400">
              Post a Video to your accout
            </p>
          </div>
          <div className=" mt-10 flex h-[460px] w-[260px] cursor-pointer flex-col items-center justify-center rounded-xl border-4 border-dashed border-gray-200 p-10 outline-none hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset?.url}
                      loop
                      controls
                      className="mt-16 h-[450px] rounded-xl bg-black"
                    />
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <div className="flex h-full flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-xl font-bold">
                          <FaCloudUploadAlt className="text-6xl text-gray-300" />
                        </p>
                        <p className="text-xl font-semibold">
                          Select video to upload
                        </p>
                      </div>
                      <p className="mt-10 text-center text-sm leading-10 text-gray-400">
                        MP4 or WebM or ogg <br /> 720x1280 or higher <br /> up
                        to 10 minutes
                        <br /> Less than 2GB
                      </p>
                      <p className="text-md mt-10 w-52 rounded bg-[#F51997] p-2 text-center font-medium text-white outline-none">
                        Select File
                      </p>
                    </div>
                    <input
                      name="upload-video"
                      className="h-10 w-0"
                      type="file"
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className="mt-4 w-[250px] text-center text-xl font-semibold text-red-400">
                Please select a video file
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Caption</label>
          <input
            type="text"
            className="text-md rounded border-2 border-gray-200 p-2 outline-none"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value)
            }}
          />
          <label className="text-md font-medium">Choose a Category</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value)
            }}
            className="text-md cursor-pointer rounded border-2 border-gray-200 p-2 capitalize outline-none lg:p-4"
          >
            {topics.map((topic) => {
              return (
                <option
                  key={topic.name}
                  className="text-md bg-white p-2 capitalize text-gray-700 outline-none hover:bg-slate-300"
                  value={topic.name}
                >
                  {topic.name}
                </option>
              )
            })}
          </select>
          <div className="mt-10 flex gap-6">
            <button
              onClick={() => {}}
              type="button"
              className="text-md w-28 rounded border-2 border-gray-300 p-2 font-medium outline-none lg:w-44"
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type="button"
              className="text-md w-28 rounded bg-[#F51997] p-2 font-medium text-white outline-none lg:w-44"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload
