import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://pond:mkLSSuDerzKcpM5U@database.drnsz71.mongodb.net/");

let cachedDb: any = null;

export async function connectDatabase() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db();
  }
  return cachedDb;
}
