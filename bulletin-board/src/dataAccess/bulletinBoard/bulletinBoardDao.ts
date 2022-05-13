import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findMany(): Promise<Post[]> {
    return await prisma.post.findMany();
}