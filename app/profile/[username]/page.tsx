"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import React from 'react';
import { ImagePost } from '@/components/layout/imagepost';
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  // Include any other fields that a Post object might have
}



export default function Page({ params }: { params: { username: string }}) {
  var { username } = params;
  username = username.replace(/%20/g, " ");
  const [posts, setPosts] = useState<Post[]>([]);
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<string>();
  console.log("username:",username);

  useEffect(() => {
    fetch('/api/getmypost', {method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: username,
    }),})
      .then(response => response.json())
      .then(data => setPosts(data));

    fetch('/api/getemail', {method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username: username,
      }),})
        .then(response => response.json())
        .then(data => setEmail(data.email));

    fetch('/api/getemail', {method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username: username,
      }),})
        .then(response => response.json())
        .then(data => setImage(data.image));
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <div
        className="mb-10 rounded border border-gray-200 bg-white p-6 text-black shadow-lg"
        style={{
        justifyContent: "center",
        width: "80vw",
        height: "100vh",
        }}
      >
        <div
        style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "top",
        }}
        >
            <Image
                alt={email || "profile"}
                src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
                width={110}
                height={110}
            />
            <p style={{ marginLeft: "10px" }}>{username}</p>
        </div>
      <div/>
      <div className='bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10 grid grid-cols-3 gap-4'>
        {posts.map((post) => (
          <ImagePost blobName={post.pictureId}/>
        ))}
      </div>
    </div>
  </div> 
  )
}