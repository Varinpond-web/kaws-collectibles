import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("get in",req.method);
  if (req.method === "POST") {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.status(201).json(post);
  } else {
    console.log("get in",req.method);
    // res.status(405).json({ message: "Method not allowed" });
  }
}
