import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
    const reqStatus = 1;
    try {
        const data = await prisma.location2.findMany({
            where: {
                statusId: reqStatus
            },
            include: {
                cus: true // Include the associated driver information
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

export async function PUT(req) {
    const cookieStore = cookies(req.headers);
    const userId = cookieStore.get("userId");
    
    const reqData = await req.json();
    try {
        let statusId;
        if (reqData.action === "accept") {
            statusId = 2; // Set statusId to 2 for accept action
        } else if (reqData.action === "deny") {
            statusId = 3; // Set statusId to 3 for deny action
        } else {
            return NextResponse.json({ message: "Invalid action" }, { status: 400 });
        }

        await prisma.location2.update({
            where: {
                Id: reqData.id
            },
            data: { 
                statusId,
                fare: parseInt(reqData.fare),
                driverId: parseInt(userId.value)
                
             },
        });

        return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error({ message: "Failed to save data" }, { status: 500 });
    }
}
