import { connectDatabase } from '@/app/db';
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const { title } = await request.json();
  console.log("titles:",title);
  const db = await connectDatabase();
  const postsCollection = db.collection('Collection');
  const posts = await postsCollection.find({ title: { $regex: `^${title}`, $options: 'i' }})
  .sort({ _id: -1 })
  .limit(4)
  .toArray();
  console.log("posts:",posts);
  return NextResponse.json(posts);
}