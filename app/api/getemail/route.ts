import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {username} = await request.json();
    const post_ = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    return NextResponse.json({email:post_?.email, image:post_?.image})
}
