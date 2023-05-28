import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {username} = await request.json();
    const post_ = await prisma.post.findMany({
        where: {
            userName: username
        }
    });
    return NextResponse.json(post_)
}
