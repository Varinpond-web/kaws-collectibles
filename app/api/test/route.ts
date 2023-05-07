import prisma from "@/app/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
    console.log("create");
    res.status(200).json({ message: "Updated" });
}