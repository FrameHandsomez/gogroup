import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(rq) { // Save Data
    const cookieStore = cookies();
    const userId = cookieStore.get("userId");
    // Check if userId is present
    if (!userId) {
        return NextResponse.error("User ID not found in cookies", { status: 400 });
    }

    try {
        const obj = await rq.json(); //

        // Create the Location2 entry with the userId
        const data = await prisma.location2.create({
            data: {
                start: obj.start,
                end: obj.end,
                datetime: obj.datetime,
                personSelect: obj.personSelect,
                fare: parseInt(obj.fare),
                introduction: obj.introduction,
                driverId: parseInt(userId.value) // Assign userId to cusId
            }
        });

        return NextResponse.json(data.Id);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error("Failed to save data", { status: 500 });
    }
}