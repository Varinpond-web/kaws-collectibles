'use client'
import { useState, useEffect } from 'react';
import DeleteButton from "./deletebutton";
import React from 'react';
import { ImagePost } from './imagepost';
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  // Include any other fields that a Post object might have
}

interface PostObjectProps {
    username: string | null | undefined;
  }

export default function PostObject({username}: PostObjectProps) {
  const [posts, setPosts] = useState<Post[]>([]);
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
  }, []);

  if (posts.length === 0) {
    return <div>Loading...</div>;
  }

  // put image in here
  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <div className='bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10 grid grid-cols-3 gap-4'>
        {posts.map((post) => (
          <ImagePost blobName={post.pictureId}/>
        ))}
      </div>

      {/* <div className='bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10'>
      {posts.map((post) => (
          <li key={post.id} className="">
              <h2 className="text-lg">Title: {post.title}</h2>
              <p className="text-sm">{post.content}</p>
              <ImagePost blobName={post.pictureId}/>
              <p className="text-sm">by {post.userName}</p>
              <DeleteButton id={post.id} />
          </li>
      ))}
      </div> */}
    </div>
  );
}