"use client";

import { useState, useEffect } from 'react';
import React from 'react';
import { ImagePost } from '@/components/layout/imagepost';

  
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  collection: string;
  // Include any other fields that a Post object might have
}



export default function Page({ params }: { params: { title: string }}) {
  const [posts, setPosts] = useState<Post[]>([]);
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
      setPosts(data);
    }

    fetchPosts(title);
  }, [params.title]);

  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <h1 className="text-4xl font-bold mb-8">Collection: {title_}</h1>
      <ul>
        {posts.map((post, index) => (
            <li key={index} className="bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10">
                <h2 className="text-lg">Title: {post.title}</h2>
                <p className="text-sm">{post.content}</p>
                <ImagePost blobName={post.pictureId} width={500} height={300}/>
                <p className="text-sm">Collection: {post.collection}</p>
                <p className="text-sm">by {post.userName}</p>
            </li>
        ))}
      </ul>
      </div>
  )
}