import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { title, PublishedDate, Price, pictureImage} = await request.json();
    const db = await connectDatabase();
    const postsCollection = db.collection('Collection');
    
    // Get the highest existing id
    const highestIdDocument = await postsCollection.findOne({}, { sort: { id: -1 } });
    const highestId = highestIdDocument?.id ?? 0;
    
    // Assign the new id
    const newId = highestId + 1;
    
    const post = {
      id: newId,
      title: title,
      pictureId: pictureImage,
      publishedDate: PublishedDate,
      price: Price,
    };
    
    const insertedPost = await postsCollection.insertOne(post);

    return NextResponse.json({ message: 'Created', post: insertedPost.ops[0] });
  } catch (e) {
    console.log(e);
    return 0;
  }
}
