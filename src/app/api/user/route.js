import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

const prisma = new PrismaClient();

export async function GET(req) {
    const cookieStore = cookies(req.headers);
    const userId = cookieStore.get("userId");

    try {
        const data = await prisma.user.findMany({
            where: {
                Id: parseInt(userId.value)
            }        
        });
        return NextResponse.json(data);
    } catch (err) {
        console.error(err);
        return NextResponse.error(err, { status: 500 });
    }
}

export async function PUT(req) {
    const cookieStore = cookies(req.headers);
    const userId = cookieStore.get("userId");

    const { Email, Name, Phone } = await req.json();

    try {
        const updatedUser = await prisma.user.update({
            where: {
                Id: parseInt(userId.value)
            },
            data: {
                Email,
                Name,
                Phone,
            }
        });
        return NextResponse.json(updatedUser);
    } catch (err) {
        console.error(err);
        return NextResponse.error(err, { status: 500 });
    }
}