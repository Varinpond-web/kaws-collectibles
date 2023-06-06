'use client'
import { useState, useEffect, use } from 'react';
import prisma from "@/app/prisma";
import DeleteButton from "./deletebuttoncollection";
import EditButton from "./editbuttoncollection";
import React from 'react';
import getImageUrl from 'azureBlobStorage';
import { ImagePost } from './imagepost';
import { useSession } from "next-auth/react"
import { ObjectId } from 'mongodb';
interface Post {
  id:  string;
  title: string;
  pictureId: string;
  publishedDate: string;
  price: string;

  // Include any other fields that a Post object might have
}

export default function PostObject() {
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([]);
  const [edit, setEdit] = useState('');
  const [title, setTitle] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [price, setPrice] = useState('');
  const handleTitleChange = (e: any) => setTitle(e.target.value);
  const handlePublishedDateChange = (e: any) => setPublishedDate(e.target.value);
  const handlePriceChange = (e: any) => setPrice(e.target.value);
  useEffect(() => {
    fetch('/api/getcollection', {method: "POST",headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({}),})
      .then(response => response.json())
      .then(data => setPosts(data));
  }, []);
  const editPost = async (title: any, date: any, price: any) => {
    setTitle(title);
    setPublishedDate(date);
    setPrice(price);
  }

  const editfunc = (id:string, title: any, date: any, price: any) => {
    editPost(title, date, price)
    setEdit(id);
  }

  // put image in here
  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      {posts.map((post, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10">
            {edit === post.id ? (<>
              
              <div key={index} className="bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10">
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="text-lg"
                  />
                  <ImagePost width={500} height={300}  blobName={post.pictureId} />
                  <input
                    type="text"
                    value={publishedDate}
                    onChange={handlePublishedDateChange}
                    className="text-sm"
                  />
                  <input
                    type="text"
                    value={price}
                    onChange={handlePriceChange}
                    className="text-sm"
                  />
                  <EditButton id={post.id} title={title} publishedDate={publishedDate} price={price} setEdit={setEdit} />
                </div>


            </>
            ):(<>
              <h2 className="text-lg">{post.title}</h2>
              <ImagePost width={500} height={300} blobName={post.pictureId} />
              <p className="text-sm">published year: {post.publishedDate}</p>
              <p className="text-sm">price: {post.price}$</p>
              <DeleteButton id={post.id} />
              <button onClick={() => editfunc(post.id, post.title, post.publishedDate, post.price)} className="mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Edit
              </button>
            </>)}
            
        </div>

      ))}
      </div>
  );
}