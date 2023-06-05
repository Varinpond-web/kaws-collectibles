"use client";

import React ,{ useState, ChangeEvent, useEffect } from 'react';

export default function Request() {
    const [content, setContent] = useState('');
    const update = async () => {
        await fetch(`/api/createrequest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
            }),
          });
    }
    return(
        <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
  style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
            <form onSubmit={() => update()}>
                <h1 className="text-3xl font-bold mb-5">Request Collection</h1>
                <div className="mb-6">
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Enter description" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Send request
                </button>
            </form>
        </div>
    )
    
}