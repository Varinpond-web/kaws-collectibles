import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import getImageUrl from 'azureBlobStorage';

interface ImagePageProps {
  imageUrl: string;
}

const ImagePage: React.FC<ImagePageProps> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Image" />;
};

export default ImagePage;

export const getServerSideProps: GetServerSideProps<ImagePageProps> = async () => {
  const containerName = 'image';
  const blobName = 'sample1.jpg';

  const imageUrl = await getImageUrl(containerName, blobName);

  return {
    props: {
      imageUrl,
    },
  };
};
