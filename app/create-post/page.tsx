"use client";

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useSession } from "next-auth/react"

export default function PostComponent() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { data: session, status } = useSession()

    const update = async () => {
      console.log(title, content);
      await fetch(`/api/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
            content: content,
            userName: session?.user?.name,
            published: true,
        }),
      });
       router.refresh();
    };
  
    return (
      <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        <h1 className="text-3xl font-bold mb-5">Create Post from {session?.user?.name}</h1>
            <form onSubmit={() => update()}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" >Title</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" >Content</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
  }

