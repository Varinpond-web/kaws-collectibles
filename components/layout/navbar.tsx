"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import SearchItem from "./searchitem";
export default function NavBar({ session }: { session: Session | null }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);
  const [showMenu, setShowMenu] = useState(false);
  const [searchbar, setSearchbar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const handleFocus = () => {
    setSearchbar(true);
  }

  const handleBlur = () => {
    setTimeout(() => {
      setSearchbar(false);
    }, 300);
  }

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  }
  return (
    <>
      <SignInModal />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="ml-5 flex h-16 max-w-screen-xl items-center  xl:mx-auto">
        {!searchbar ? (
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Kaws logo"
              width="100"
              height="100"
              className="mr-2 rounded-sm"
            ></Image>
          </Link>):
        (<></>)}
        <div className="text-sm w-50 ml-5">
              <div className="relative text-gray-800">
                  <input
                    type="text"
                    placeholder="Search"
                    className="mg-20 bg-gray-000 rounded-full py-2 pl-10 pr-4 block w-full appearance-none leading-normal focus:outline-none focus:border-black-800"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleText}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-3">
                    <SearchIcon className="h-5 w-5" />
                  </div>
              </div>
              {searchbar ? (
              <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <ul>
                        <SearchItem search={searchText}/>
                      </ul>
                    </div> 
              </div>):(<></>)}
            </div>
          <div
            className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
              showMenu ? "block" : "hidden"
            }`}
          >
            <div className="ml-auto">
              <Link
                href="/create-post"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-8"
              >
                Create post
              </Link>
              <Link
                href="/myfeed"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-8"
              >
                My feed
              </Link>
              <Link
                href="/my-collectibles"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-800 hover:text-black mr-8"
              >
                My collectibles
              </Link>
            </div>
          </div>
          <div className="ml-auto block lg:hidden">
            <button
              className="ml-auto flex items-end px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-black hover:border-black"
              onClick={toggleMenu}
            >
              <svg
                className="h-3 w-3 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div>
            {session ? (
              <UserDropdown session={session} />
            ) : (
              <button
                className="mr-4 rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                onClick={() => setShowSignInModal(true)}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
