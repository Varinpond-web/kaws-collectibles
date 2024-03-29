"use client";

import { useRouter } from "next/navigation";
import React ,{ useState, ChangeEvent, useEffect } from 'react';
import { useSession } from "next-auth/react"
import axios from 'axios';
import { Buffer } from 'buffer';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import prisma from "@/app/prisma";
import Link from "next/link";
import SearchItem from "@/components/layout/searchcollection";
export default function PostComponent() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { data: session, status } = useSession()
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [imageId, setimageId] = useState<string | null>(null);
    const [collection, setCollection] = useState('');
    const [uploadResponse, setUploadResponse] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState("");

    const handleTitle = (title:any) => {
      setCollection(title);
    }
    const [file, setFile] = useState<string | null>(null);
    useEffect(() => {
      const fetchUpload = async () => {
        if (imageId) {
          console.log("title:", title);
          console.log("content:", content);
          console.log("userName:", session?.user?.name);
          console.log("pictureImage:", imageId.toString());
          console.log("published:", 1);
          const upload = await fetch(`/api/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                userName: session?.user?.name,
                pictureImage: imageId.toString(),
                collection: collection,
                published: true,
                userimage: session?.user?.image,
            }),
          });
          setUploadResponse(await upload.json());
          console.log("END________:",upload);
        }
      }
      console.log("call fetchUpload");
      fetchUpload();
    }, [imageId, title, content, session?.user?.name]); // Only re-run the effect if imageId changes

    const update = async (e: React.FormEvent<HTMLFormElement>) => {
      if (base64Image) {
        console.log("c1");
        const AZURE_STORAGE_CONNECTION_STRING = 'BlobEndpoint=https://varinstorage.blob.core.windows.net/;QueueEndpoint=https://varinstorage.queue.core.windows.net/;FileEndpoint=https://varinstorage.file.core.windows.net/;TableEndpoint=https://varinstorage.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-06T18:47:27Z&st=2023-05-16T10:47:27Z&spr=https,http&sig=3VpVJpWO9PFYTKo1hUtuPhuPk8l7SildoJIw0J1ESRU%3D'; // truncated for brevity
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('image');
        console.log("c2");
        const randomFileName = `${uuidv4()}.jpeg`;
        setimageId(randomFileName);
        const blockBlobClient = containerClient.getBlockBlobClient(randomFileName);
        const base64Image_re = base64Image.replace(/^data:image\/\w+;base64,/, "");
        console.log("in base64Image_re:",base64Image_re);
        const buffer = Buffer.from(base64Image_re, 'base64');
        console.log("Buffer:",buffer);
        const options = {
            blobHTTPHeaders: {
              blobContentType: 'image/jpeg'
            }
        };
        const uploadBlobResponse = await blockBlobClient.uploadData(buffer, options);
        console.log("uploadBlobResponse:", uploadBlobResponse);
      }
    };
    //image upload
    
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedImage(event.target.files[0]);
        
        const reader = new FileReader();
        reader.onloadend = () => {
          // The result attribute contains the data as a base64 encoded string
          const base64 = reader.result as string;
          setFile(base64);
          setBase64Image(base64)
        };
        
        // Start reading the file
        // This will trigger the onloadend event when done
        reader.readAsDataURL(event.target.files[0]);
      }
    };

  
    return (
      <div className="animate-fade-up bg-gradient-to-br px-28 from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
  style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
  <h1 className="text-3xl font-bold mb-5">Create Post from {session?.user?.name}</h1>
  <div className="flex">
    <div className="w-1/3 p-4">
      <div className="img-area w-full">
        <div className="flex justify-center">
          <label htmlFor="image">
            <img
              src={file || 'https://varinstorage.blob.core.windows.net/image/Browseforfiles.png'}
              className="cursor-pointer rounded-xl shadow-md"
              style={{ width: "400", height: "100%" }}
              alt="file post"
            />
          </label>
        </div>
        <input onChange={handleImageChange} type="file" accept="image/*" id="image" name="image"/>
      </div>
    </div>

    <div className="w-1/3 p-4">
      <form onSubmit={(e) => update(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" >Title</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" >Content</label>
          <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="content" placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
    <div className="w-1/3 p-4">
      <div className="mb-6">
            <label className="block text-black-600 mb-2" >Collection<Link href="/request"
                className="lg:inline-block text-blue-600 lg:mt-0 hover:text-blue-800 mr-8"
              >
              &nbsp;(no collection?)
              </Link></label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter Collection" value={collection} onChange={(e) => setCollection(e.target.value)}/>
            <div className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <ul>
                        <SearchItem search={collection} onTitleClick={handleTitle}/>
                      </ul>
                    </div> 
              </div>
          </div>
      </div>
  </div>  
</div>


    );
  }

