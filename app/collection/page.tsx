"use client";

import { useRouter } from "next/navigation";
import React ,{ useState, ChangeEvent, useEffect } from 'react';
import { useSession } from "next-auth/react"
import { Buffer } from 'buffer';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { ImagePost } from '@/components/layout/imagepost';
import Balancer from "react-wrap-balancer";
import Collection from "@/components/layout/Collectionforuser";
interface Post {
  id:  string;
  title: string;
  pictureId: string;
  publishedDate: string;
  price: string;

  // Include any other fields that a Post object might have
}

interface PostProps {
  posts: Post[];
}
export default function PostComponent() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [price, setPrice] = useState('');
    const { data: session, status } = useSession()
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [imageId, setimageId] = useState<string | null>(null);
    const [uploadResponse, setUploadResponse] = useState(null);
    const [collection, setCollection] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupPost, setPopupPost] = useState<Post | null>(null);
    useEffect(() => {
      fetch('/api/getsearchcollection', {method: "POST",headers: {
        "Content-Type": "application/json",
      },body: JSON.stringify({title:collection}),})
        .then(response => response.json())
        .then(data => setPosts(data));
    }, [collection]);

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
          setBase64Image(base64)
        };
        
        // Start reading the file
        // This will trigger the onloadend event when done
        reader.readAsDataURL(event.target.files[0]);
      }
    };

  
    return (
      <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
      style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        <h1 className="text-3xl font-bold mb-5">Public Collection</h1>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter Collection" value={collection} onChange={(e) => setCollection(e.target.value)}/>
            <ul>
            <div style={{columnCount: 3}} className="column-gap-4">
            {posts.map((post, index) => (
                <div key={index} className="w-full bg-white rounded-lg shadow mb-4 break-inside" onClick={() => { setPopupPost(post); setShowPopup(true); }}>
                    <ImagePost blobName={post.pictureId} width={300} height={300}/>
                    <h2 className="text-lg p-2 text-black">{post.title}</h2>
                </div>
            ))}
            {showPopup && popupPost &&
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-white bg-opacity-75">
                    <div className="popup bg-white text-black p-5 rounded shadow-lg flex flex-col items-center">
                        <h3 className="text-2xl mb-4">{popupPost.title}</h3>
                        <ImagePost blobName={popupPost.pictureId} width={390} height={100}/>
                        <p className="mb-2">Publish Date: {popupPost.publishedDate}</p>
                        <p className="mb-4">Price: {popupPost.price}$</p>
                        <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            }
            </div>
            </ul>

        </div>

    );
  }

