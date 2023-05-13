import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const { id } = await request.json();
    const number = parseInt(id, 10);
    console.log(number);
    const post_ = await prisma.post.delete({
        where: {
            id: number,
        },
    });
    return NextResponse.json({ message: "Deleted", post_})
}
