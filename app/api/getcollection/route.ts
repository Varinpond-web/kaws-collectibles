import { connectDatabase } from '@/app/db';
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const db = await connectDatabase();
  const postsCollection = db.collection('Collection');
  console.log("postsCollection",postsCollection);
  const posts = await postsCollection.find().sort({ _id: -1 }).toArray();
  console.log("posts",posts);
  return NextResponse.json(posts);
}

