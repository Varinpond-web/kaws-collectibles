import { BlobServiceClient } from '@azure/storage-blob';

async function getImageUrl(containerName: string, blobName: string): Promise<string> {
  const cs = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONNECTION_STRING
  if (typeof cs === 'undefined') {
    throw new Error('Azure Storage connection string not found in environment variables');
  }
  const blobServiceClient = BlobServiceClient.fromConnectionString(cs);
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  const url = blobClient.url;
  return url;
}

export default getImageUrl;
