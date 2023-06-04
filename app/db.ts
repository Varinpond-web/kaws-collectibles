import { MongoClient } from 'mongodb';

const { MONGODB_URI } = process.env as any;
const client = new MongoClient(MONGODB_URI);

let cachedDb: any = null;

export async function connectDatabase() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db();
  }
  return cachedDb;
}
