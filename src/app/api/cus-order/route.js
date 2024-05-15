import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    const cookieStore = cookies(req.headers);
    const userId = cookieStore.get("userId");

    try {
        const data = await prisma.location2.findMany({
            where: {
                cusId: parseInt(userId.value)
            },
            include: {
                cus: true, // Include the associated driver information
                status: true
            }
        });
        if (data) {
            return NextResponse.json(data);
        } else {
            return NextResponse.error(new Error("Data not found"), { status: 404 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.error(err, { status: 500 });
    }
}