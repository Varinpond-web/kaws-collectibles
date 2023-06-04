import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';
export async function POST(request: any) {
    const { id } = await request.json();
    const number = parseInt(id, 10);
    
    try {
      const db = await connectDatabase();
      const postsCollection = db.collection('Collection');
      const deletedPost = await postsCollection.findOneAndDelete({ id: number });
  
      return NextResponse.json({ message: 'Deleted', post: deletedPost.value });
    } catch (e) {
      console.log(e);
      return 0;
    }
}
