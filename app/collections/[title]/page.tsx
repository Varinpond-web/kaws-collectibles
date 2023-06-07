"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import { ImagePost } from '@/components/layout/imagepost';
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
interface Collection {
  id:  string;
  title: string;
  pictureId: string;
  publishedDate: string;
  price: string;

  // Include any other fields that a Post object might have
}


export default function Page({ params }: { params: { title: string }}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [collection, setCollection] = useState<Collection[]>([]);
  const [title_, settitle] = useState('');
  useEffect(() => {
    var { title } = params;
    title = title.replace(/%20/g, " ");
    settitle(title);
    const fetchPosts = async (title:any) => {
      const response = await fetch('/api/getpostbycollection', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });
      const data = await response.json();
      const responseC = await fetch('/api/getsearchcollection', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
        }),
      });
      const dataC = await responseC.json();
      setPosts(data);
      setCollection(dataC);
    }

    fetchPosts(title);
  }, [params.title]);

  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <h1 className="text-4xl font-bold mb-8">Collection: </h1>
      {collection.map((collection_, index) => (
          <div key={index} className="mb-10 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <Image className="object-cover w-full rounded-t-lg h-30 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={"https://varinstorage.blob.core.windows.net/image/"+collection_.pictureId} width={1000} height={1000} alt=""/>
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{collection_.title}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">published year: {collection_.publishedDate}</p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">price: {collection_.price}$</p>
              </div>
          </div>
      ))}
      
      <ul>
        {posts.map((post, index) => (
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
                  <h2 className="text-gray-800 font-bold cursor-pointer">{post.userName}</h2>
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
      </ul>
      </div>
  )
}