'use client'
import { useState, useEffect } from 'react';
import prisma from "@/app/prisma";
import DeleteButton from "./deletebutton";

interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
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

  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <h1 className="text-3xl font-bold mb-5">Create Post</h1>
      {posts.map((post) => (
          <li key={post.id}>
              <h2 className="text-lg">{post.id} </h2>
              <h2 className="text-lg">{post.title}</h2>
              <p className="text-sm">{post.content}</p>
              <p className="text-sm">{post.userName}</p>
              <DeleteButton id={post.id} />
          </li>
      ))}
      </div>
  );
}