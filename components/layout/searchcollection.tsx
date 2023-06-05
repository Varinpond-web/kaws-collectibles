'use client'
import { useState, useEffect } from 'react';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { ImagePost } from './imagepost';
interface Post {
    id:  string;
    title: string;
    pictureId: string;
  }

export default function SearchItem({search}:{search: string}) {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        fetch('/api/getsearchcollection', {method: "POST",headers: {
          "Content-Type": "application/json",
        },body: JSON.stringify({title:search}),})
          .then(response => response.json())
          .then(data => setPosts(data));
      }, [search]);
    
    return(
    <div>
        {posts.map((post, index) => (
            <div key={index}>
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    <div className="flex items-center">
                        <ImagePost blobName={post.pictureId} />
                        <p>{post.title}</p>
                    </div>
                </li>
            </div>
        ))}
    </div>
    )

}
