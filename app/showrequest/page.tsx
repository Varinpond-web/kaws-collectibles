"use client"
import { useState, useEffect } from 'react';
import React from 'react';
import { Session } from "next-auth";
import DeleteButtonRequest from "@/components/layout/deleterequestbutton";
import { Int32 } from 'mongodb';
interface Post {
    id: Int32; // or string, depending on your data structure
    content: string;
}

export default function PostObject() {
  const [requests, setRequest] = useState<Post[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch('/api/getrequest', {method: "POST",headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({}),})
        .then(response => response.json())
        .then(data => setRequest(data));
    }
    fetchData();
  }, []);


  // put image in here
  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
      <h1 className="text-3xl font-bold mb-5">Request Collection</h1>
      <ul>
        {/* {requests.map((request, index) => (
            <li key={index} className="bg-white border border-gray-200 shadow-lg p-6 text-black mb-10">
                <p className="text-sm mb-5">{request.content}</p>
                <DeleteButtonRequest id={request.id} />
            </li>
        ))} */}
      </ul>
      
      </div>
  );
}