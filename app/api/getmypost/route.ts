import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const { username } = await request.json();
  const db = await connectDatabase();
  const postsCollection = db.collection('Post');
  const posts = await postsCollection.find({ userName: username }).toArray();

  return NextResponse.json(posts);
}
