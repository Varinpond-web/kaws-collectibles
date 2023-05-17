import type { NextApiRequest, NextApiResponse } from 'next';
import { BlobServiceClient } from '@azure/storage-blob';
import { NextResponse } from "next/server";
export async function POST(request: any) {

  request.status(200).send('Image uploaded successfully.')
}

import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { BlobServiceClient } from '@azure/storage-blob';

export async function POST(request: any) {
  try{
    console.log('Uploading image...!')
    const upload = multer({ dest: 'uploads/' });

    const containerName = 'image';
    const { path, originalname } = request.file as Express.Multer.File;

    const uniqueName = uuidv4(); // Generate a unique name using uuidv4()

    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueName); // Use the unique name as the blob name
    console.log('Image uploaded successfully.');

    request.status(200).send('Image uploaded successfully.');
    await blockBlobClient.uploadFile(path);
  }
  
  catch (error) {
    console.error('Error uploading image111111:', error);
    request.status(500).send('Error uploading image11111.');
  }
}