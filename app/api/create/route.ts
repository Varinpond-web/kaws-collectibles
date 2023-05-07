import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {title, content} = await request.json();
    const post_ = await prisma.post.create({
        data: {
            title: title,
            content: content,
            published: true,
        },
    });
    return NextResponse.json({ message: "Created", post_})
}