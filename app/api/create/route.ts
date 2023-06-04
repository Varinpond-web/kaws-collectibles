import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { title, content, userName, pictureImage, published } = await request.json();
    const db = await connectDatabase();
    const postsCollection = db.collection('Post');
    const post = {
      title: title,
      content: content,
      userName: userName,
      pictureId: pictureImage,
      published: true,
    };
    const insertedPost = await postsCollection.insertOne(post);

    return NextResponse.json({ message: 'Created', post: insertedPost.ops[0] });
  } catch (e) {
    console.log(e);
    return 0;
  }
}
