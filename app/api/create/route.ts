import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    try{
        const {title, content, userName, pictureImage, published} = await request.json();
        const post_ = await prisma.post.create({
            // data: {
            //     title: title,
            //     content: content,
            //     userName: userName,
            //     pictureId: pictureId,
            //     published: true,
            // },
            data: {
                title: title,
                content: content,
                userName: userName,
                pictureId: pictureImage,
                published: true,
            },
            
        });
        return NextResponse.json({ message: "Created", post_})
    }catch(e){
        console.log(e);
        return 0;
    }
    
    
}