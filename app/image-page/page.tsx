import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import getImageUrl from 'azureBlobStorage';
import Image from 'next/image';

export default async function ImagePage() {
  const containerName = 'image';
  const blobName = 'sample1.jpg';
  const imageUrl = await getImageUrl(containerName, blobName);

  return (
    <div className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text font-display tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm"
    style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        <img src={imageUrl} alt="Image" width={500} height={500}></img>
    </div>)
};
