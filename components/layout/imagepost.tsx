import React, { useEffect, useState } from 'react';
import getImageUrl from 'azureBlobStorage';
import Image from "next/image";
interface ImagePostProps {
  blobName: string;
}

export const ImagePost: React.FC<ImagePostProps> = ({ blobName }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const containerName = 'image';
      console.log("blobName: " + blobName);
      const url = await getImageUrl(containerName, blobName);
      setImageUrl(url);
    };
    fetchData();
  }, [blobName]);

  if (!imageUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        <img src={imageUrl} alt="Image" width={200} height={200}></img>
    </div>
  );
};