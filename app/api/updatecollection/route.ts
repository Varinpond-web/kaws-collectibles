import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { id, title, publishedDate, price } = await request.json();
    if (id === undefined) {
      throw 'id field is required to update a post.';
    }
    
    const db = await connectDatabase();
    const postsCollection = db.collection('Collection');

    const updatedPost = {
      id: id,
      title: title,
      // pictureId: pictureImage,
      publishedDate: publishedDate,
      price: price,
    };

    const updateResult = await postsCollection.updateOne({ id: id }, { $set: updatedPost });

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json({ message: 'No post found to update' });
    }

    return NextResponse.json({ message: 'Updated', post: updatedPost });
  } catch (e) {
    console.log(e);
    return 0;
  }
}
