import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(rq){ //ดึงข้อมูล
    try {
        const data = await prisma.location2.findMany({
            where: {
                statusId: 1,
                driverId: { not: null }
            }
        });
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.error(error, { status: 500 });
    }
}

export async function PUT(req) {
    const cookieStore = cookies(req.headers);
    const userId = cookieStore.get("userId");
    
    const reqData = await req.json();
    try {
        const statusId = 2;

        await prisma.location2.update({
            where: {
                Id: reqData.id
            },
            data: { 
                statusId,
                cusId: parseInt(userId.value)
             },
        });

        return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error({ message: "Failed to save data" }, { status: 500 });
    }
}