import prisma from "@/app/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const {title, content} = await req.json();
    const post_ = await prisma.post.create({
        data: {
            title: title,
            content: content,
            published: true,
        },
    });
    return NextResponse.json({ message: "Created", post_})
}