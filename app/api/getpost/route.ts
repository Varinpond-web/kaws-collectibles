import { connectDatabase } from '@/app/db';
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const db = await connectDatabase();
  const postsCollection = db.collection('Post');
  console.log("postsCollection",postsCollection);
  const posts = await postsCollection.find().sort({ _id: -1 }).toArray();
  console.log("posts",posts);
  return NextResponse.json(posts);
}


// import prisma from "@/app/prisma";
// import { NextResponse } from "next/server";

// export async function POST(request: any) {
//     const post_ = await prisma.post.findMany({
//         orderBy: [
//             {
//               id: 'desc',
//             },]
//     }
//     );
//     console.log(post_);
//     return NextResponse.json(post_)
// }
