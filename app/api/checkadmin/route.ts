import { connectDatabase } from '@/app/db';
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  try {
    const { name } = await request.json();
    const db = await connectDatabase();
    const postsCollection = db.collection('Admin-role');
    console.log("name",name);  
    const user = await postsCollection.findOne({ name: name });
    if (!user) {
        return NextResponse.json({ isAdmin: false });
    }
    if (user.role === 'Super Admin') {
        return NextResponse.json({ isAdmin: true });
    }else{
        return NextResponse.json({ isAdmin: false });
    }
    
  } catch (e) {
    console.log(e);
    return NextResponse.json({ isAdmin: false });
  }
}
