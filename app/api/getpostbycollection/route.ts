import { connectDatabase } from '@/app/db';
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const {title} = await request.json();
  const db = await connectDatabase();
  const postsCollection = db.collection('Post');

  // add a query filter to the find operation
  const posts = await postsCollection.find({ collection: title }).sort({ _id: -1 }).toArray();
  
  return NextResponse.json(posts);
}
