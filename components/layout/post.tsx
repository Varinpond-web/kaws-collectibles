'use client'
import { useState, useEffect } from 'react';
import prisma from "@/app/prisma";
import DeleteButton from "./deletebutton";
import React from 'react';
import getImageUrl from 'azureBlobStorage';
import { ImagePost } from './imagepost';
import { useSession } from "next-auth/react"
import { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  collection: string;
  userimage: string;
  // Include any other fields that a Post object might have
}

export default function PostObject({ session }: { session: Session | null }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [Admin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const name = await session?.user?.name;
      if (session){
        await fetch('/api/checkadmin', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        })
        .then(response => response.json())
        .then(data => setIsAdmin(data.isAdmin));
      }
      await fetch('/api/getpost', {method: "POST",headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({}),})
        .then(response => response.json())
        .then(data => setPosts(data));
    }
    fetchData();
    console.log("Admin",Admin);
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  // put image in here
  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      {posts.map((post, index) => (
          // <li key={index} className="bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10">
          //     <h2 className="text-lg">Title: {post.title}</h2>
          //     <p className="text-sm">{post.content}</p>
          //     <ImagePost blobName={post.pictureId} width={500} height={300}/>
          //     <Link href={`/collections/${post.collection}`}><p className="text-sm">Collection: {post.collection}</p></Link>
          //     <p className="text-sm">by {post.userName}</p>
          //     {session?.user?.name === post.userName || Admin ? (<DeleteButton id={post.id} />):(<></>) } 
          // </li>
            <div key={index} className="pb-2 justify-center mb-20 max-w-lg container bg-white rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
              <div className='pt-2'>
                <h1 className="text-2xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100">{post.title}</h1>
                <Link href={`/collections/${post.collection}`}><p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">#{post.collection}</p></Link>
              </div>
              <ImagePost blobName={post.pictureId} width={500} height={300}/>
              {/* <img className="w-full cursor-pointer" src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="" /> */}
              <div className="flex p-4 justify-between">
                <div className="flex items-center space-x-2">
                <Image
                  alt="userimage"
                  src={post.userimage || "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"}
                  width={40}
                  height={40}
                  className="w-10 rounded-full"
                />
                  {/* <img className="w-10 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" /> */}
                  <Link href={`/profile/${post.userName}`}><h2 className="text-gray-800 font-bold cursor-pointer">{post.userName}</h2></Link>
                </div>
                <div className="flex space-x-2">
                  <div className="flex space-x-1 items-center">
                    <span>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg> */}
                    </span>
                    <span>22</span>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <span>
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500 hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg> */}
                    </span>
                    <span>20</span>
                  </div>
                </div>
              </div>
              <p className="ml-4 mt-0 mb-2 text-sm text-gray-700">{post.content}</p>
            </div>
      ))}
      </div>
  );
}