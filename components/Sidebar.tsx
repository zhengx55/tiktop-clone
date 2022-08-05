import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

const Sidebar = () => {
  const [showSideBar, setshowSideBar] = useState(true)
  const userPorfile = false
  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#f51997] rounded'
  return (
    <div>
      <div
        className="m-2 ml-4 mt-3 block text-xl xl:hidden"
        onClick={() => setshowSideBar((prev) => !prev)}
      >
        {showSideBar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSideBar && (
        <div className="mb-10 flex w-20 flex-col justify-start border-r-2 border-gray-100 p-3 xl:w-400 xl:border-0">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="hidden text-xl xl:block">For you</span>
              </div>
            </Link>
          </div>
          {!userPorfile && (
            <div className="hidden px-2 py-4 xl:block">
              <p className="text-gray-400">
                login to like your perfered videos
              </p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => {
                    return (
                      <button
                        className="mt-3 w-full cursor-pointer rounded-md border-[1px] border-[#f51997] bg-white px-6 py-3 text-lg font-semibold text-[#f51997] outline-none hover:bg-[#F51997] hover:text-white"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        Log In
                      </button>
                    )
                  }}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Sidebar
