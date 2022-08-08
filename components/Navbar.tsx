import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { googleLogout, GoogleLogin } from '@react-oauth/google'
import { IoMdAdd } from 'react-icons/io'
import Logo from '../utils/tiktik-logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore()

  return (
    <div className="flex w-full items-center justify-between border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tikTop"
            layout="responsive"
          />
        </div>
      </Link>
      <div>SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href={'/upload'}>
              <button className="text-md flex items-center gap-2 border-2 px-2 font-semibold md:px-4">
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/`}>
                <>
                  <Image
                    width={40}
                    height={40}
                    className="cursor-pointer rounded-full"
                    src={userProfile.image}
                    alt="profit"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser)
            }}
            onError={() => {}}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
