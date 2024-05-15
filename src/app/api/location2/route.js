import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function GET(rq){ //ดึงข้อมูล
    const {searchParams} = rq.nextUrl;
    const id = searchParams.get('id');
    if(id){
        const data = await prisma.location2.findUnique({
            where: {
                Id: parseInt(id)
            },
            include: {
                driver: true // Include the associated driver information
            }
        })
        return NextResponse.json(data)
    }
    else{
        const data = await prisma.location2.findMany()
    return NextResponse.json(data)
    }
    
}

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
                introduction: obj.introduction,
                cusId: parseInt(userId.value) // Assign userId to cusId
            }
        });

        return NextResponse.json(data.Id);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.error("Failed to save data", { status: 500 });
    }
}
    

export async function PUT(rq){ //Update Data
    const obj = await rq.json();
    const data = await prisma.location2.update({
        where:{
            key: obj.key
        },
        data:{
            start: obj.start,
            end: obj.end,
            datetime: obj.datetime,
            personSelect: obj.personSelect,
            introduction: obj.introduction,
        }
    })
    return NextResponse.json(true)
}

export async function DELETE(rq){ //ลบ
    const obj = await rq.json();
    const data = await prisma.location2.delete({
        where:{
            key: obj.key
        },
    })
        return NextResponse.json(true)
}        