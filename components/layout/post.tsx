'use client'
import { useState, useEffect } from 'react';
import prisma from "@/app/prisma";
import DeleteButton from "./deletebutton";
import React from 'react';
import getImageUrl from 'azureBlobStorage';
import { ImagePost } from './imagepost';
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  // Include any other fields that a Post object might have
}

export default function PostObject() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/getpost', {method: "POST",headers: {
      "Content-Type": "application/json",
    },body: JSON.stringify({}),})
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
      {posts.map((post, index) => (
          <li key={index} className="bg-white border border-gray-200 rounded shadow-lg p-6 text-black mb-10">
              <h2 className="text-lg">Title: {post.title}</h2>
              <p className="text-sm">{post.content}</p>
              <ImagePost blobName={post.pictureId}/>
              <p className="text-sm">by {post.userName}</p>
              <DeleteButton id={post.id} />
          </li>
      ))}
      </div>
  );
}