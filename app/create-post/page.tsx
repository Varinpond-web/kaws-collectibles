"use client";

import { useRouter } from "next/navigation";
import React ,{ useState, ChangeEvent } from 'react';
import { useSession } from "next-auth/react"
import axios from 'axios';
import { Buffer } from 'buffer';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

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
    //image upload
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedImage(event.target.files[0]);
        console.log("selectedImage:")
        console.log(selectedImage)
        const reader = new FileReader();
        reader.onloadend = () => {
          // The result attribute contains the data as a base64 encoded string
          const base64 = reader.result as string;
          setBase64Image(base64)
        };
    
        // Start reading the file
        // This will trigger the onloadend event when done
        reader.readAsDataURL(event.target.files[0]);
      }
    };
  
    const handleImageUpload = async () => {
      if (base64Image) {

        const AZURE_STORAGE_CONNECTION_STRING = 'BlobEndpoint=https://varinstorage.blob.core.windows.net/;QueueEndpoint=https://varinstorage.queue.core.windows.net/;FileEndpoint=https://varinstorage.file.core.windows.net/;TableEndpoint=https://varinstorage.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-06T18:47:27Z&st=2023-05-16T10:47:27Z&spr=https,http&sig=3VpVJpWO9PFYTKo1hUtuPhuPk8l7SildoJIw0J1ESRU%3D';
        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient('image'); // Replace with your container name
        const randomFileName = `${uuidv4()}.jpeg`;
        const blockBlobClient = containerClient.getBlockBlobClient(randomFileName);
        const base64Image_re = base64Image.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Image_re, 'base64');
        console.log("Buffer:", buffer);
        const options = {
            blobHTTPHeaders: {
              blobContentType: 'image/jpeg'
            }
          };
        const uploadBlobResponse = await blockBlobClient.uploadData(buffer, options);
      }

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
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </div>

    );
  }

