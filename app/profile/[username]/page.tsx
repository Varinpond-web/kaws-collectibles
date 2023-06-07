"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import React from "react";
import {
  ImagePost,
  ImagePostForCollection,
} from "@/components/layout/imagepost";
interface Post {
  id: number; // or string, depending on your data structure
  title: string;
  content: string;
  userName: string;
  pictureId: string;
  collection: string;
  userimage: string;
  // Include any other fields that a Post object might have
}
interface PostProps {
  posts: Post[];
}

export default function Page({ params }: { params: { username: string } }) {
  var { username } = params;
  username = username.replace(/%20/g, " ");
  const [posts, setPosts] = useState<Post[]>([]);
  const [email, setEmail] = useState<string>();
  const [image, setImage] = useState<string>();
  const [showPopup, setShowPopup] = useState(false);
  const [popupPost, setPopupPost] = useState<Post | null>(null);
  console.log("username:", username);

  useEffect(() => {
    fetch("/api/getmypost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setPosts(data));

    fetch("/api/getemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setEmail(data.email));

    fetch("/api/getemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((response) => response.json())
      .then((data) => setImage(data.image));
  }, [username]);

  return (
    <div
      className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display "
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
    >
      {showPopup && popupPost && (
        <div
          className="flex items-center justify-center" // This outer div takes up the whole screen and centers its children.
          onClick={() => setShowPopup(false)} // Stop the propagation to prevent the outer div's onClick from firing when this div is clicked.
        >
          <div
            className="container mt-20 absolute inset-0 z-50 max-w-lg rounded-xl bg-white pb-2 text-left shadow-2xl"
            style={{
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              height: "fit-content",
            }}
          >
            <div className="pt-2">
              <h1 className="ml-4 mt-2 cursor-pointer text-2xl font-bold text-gray-800 transition duration-100 hover:text-gray-900">
                {popupPost.title}
              </h1>
              <Link href={`/collections/${popupPost.collection}`}>
                <p className="mb-2 ml-4 mt-1 cursor-pointer text-gray-700 hover:underline">
                  #{popupPost.collection}
                </p>
              </Link>
            </div>
            <div className="item-center flex max-w-md justify-center object-contain">
              <ImagePost
                blobName={popupPost.pictureId}
                width={300}
                height={200}
              />
            </div>
            {/* <img className="w-full cursor-pointer" src="https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="" /> */}
            <div className="flex justify-between p-4">
              <div className="flex justify-between space-x-2">
                <Image
                  alt="userimage"
                  src={
                    popupPost.userimage ||
                    "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
                  }
                  width={40}
                  height={40}
                  className="w-10 rounded-full"
                />
                {/* <img className="w-10 rounded-full" src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg" alt="sara" /> */}
                <h2 className="cursor-pointer font-bold text-gray-800">
                  {popupPost.userName}
                </h2>
              </div>
              <div className="flex space-x-2">
                <div className="flex items-center space-x-1">
                  <span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg> */}
                  </span>
                  <span></span>
                </div>
                <div className="flex items-center space-x-1">
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
            <p className="mb-2 ml-4 mt-0 text-sm text-gray-700">
              {popupPost.content}
            </p>
          </div>
        </div>
      )}
      <div
        className="mb-100 rounded border border-gray-200 bg-white p-6 text-black shadow-lg"
        style={{
          justifyContent: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "top",
            marginBottom: "20px",
          }}
        >
          <Image
            alt={email || "profile"}
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={110}
            height={110}
          />
          <h2 style={{ marginLeft: "10px" }}>
            {username}
            <p className="text-left">{posts.length} posts</p>
          </h2>
        </div>
        <div />

        <div className="mt-30 grid grid-cols-2 gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={index}
              className=""
              onClick={() => {
                setPopupPost(post);
                setShowPopup(true);
              }}
            >
              <ImagePostForCollection key={index} blobName={post.pictureId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Modal = ({ children }: any) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
