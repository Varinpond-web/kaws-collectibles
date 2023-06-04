import prisma from "@/app/prisma";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const {username} = await request.json();

    const users = await prisma.user.findMany({
        where: {
            name: {
                startsWith: username
            },
        },
        orderBy: {
            id: 'desc',
        },
        take: 4
    });

    return NextResponse.json(users);
}