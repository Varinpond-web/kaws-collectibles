import React, { useEffect, useState } from 'react';
import getImageUrl from 'azureBlobStorage';
import Image from "next/image";
interface ImagePostProps {
  blobName: string;
  width: number;
  height: number;
}

interface ImagePostPropsCollection {
  blobName: string;
}

export const ImagePost: React.FC<ImagePostProps> = ({ blobName, width, height }) => {
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
        <img className='item-center justify-center' src={imageUrl} alt="Image" width={width || 20} height={height || 20}></img>
  );
};

export const ImagePostForCollection: React.FC<ImagePostPropsCollection> = ({ blobName}) => {
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
        <img className='object-cover h-96 w-96 rounded-lg' src={imageUrl} alt="Image"></img>
  );
};