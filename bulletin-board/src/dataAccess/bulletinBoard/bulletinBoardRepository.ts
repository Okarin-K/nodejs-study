import { PrismaClient } from "@prisma/client";
import { PostInfo } from "../../businessLogic/bulletinBoard/post";

const prisma = new PrismaClient();

export async function create(post: Readonly<PostInfo>): Promise<void> {
    await prisma.post.create({
        data: {
            content: post.content,
            postedBy: post.postedBy,
            trackingCookie: post.trackingCookie
        }
    });
}