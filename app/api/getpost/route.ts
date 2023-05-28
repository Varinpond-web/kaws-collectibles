import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const post_ = await prisma.post.findMany({
        orderBy: [
            {
              id: 'desc',
            },]
    }
    );
    return NextResponse.json(post_)
}
