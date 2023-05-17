import { BlobServiceClient } from '@azure/storage-blob';
import prisma from "@/app/prisma";
import { NextResponse } from "next/server";
import { Buffer } from 'buffer';

export async function POST(request: any) {

    const post_ = await prisma.post.findMany();
    const AZURE_STORAGE_CONNECTION_STRING = 'BlobEndpoint=https://varinstorage.blob.core.windows.net/;QueueEndpoint=https://varinstorage.queue.core.windows.net/;FileEndpoint=https://varinstorage.file.core.windows.net/;TableEndpoint=https://varinstorage.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-10-06T18:47:27Z&st=2023-05-16T10:47:27Z&spr=https,http&sig=3VpVJpWO9PFYTKo1hUtuPhuPk8l7SildoJIw0J1ESRU%3D';
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient('image'); // Replace with your container name
    const blockBlobClient = containerClient.getBlockBlobClient('my-image.jpeg');
    const base64Image = request.body.image.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64Image, 'base64');
    const options = {
        blobHTTPHeaders: {
          blobContentType: 'image/jpeg'
        }
      };
    const uploadBlobResponse = await blockBlobClient.uploadData(buffer, options);
    return NextResponse.json(post_)
}

    