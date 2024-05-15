import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function GET(req) {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    try {
        let data;
        if (id) {
            data = await prisma.user.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
        } else {
            data = await prisma.user.findMany();
        }
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.error("An error occurred while processing your request", 500);
    }
}

export async function POST(req) {
    try {
      const obj = await req.json();
      const saltRounds = 10; // ระดับความซับซ้อนในการ hash รหัสผ่าน (10 เป็นค่ามาตรฐาน)
      const hashedPassword = await bcrypt.hash(obj.Password, saltRounds);
  
      const data = await prisma.user.create({
        data: {
          Name: obj.Name,
          Email: obj.Email,
          Password: hashedPassword, // บันทึกรหัสผ่านที่ถูก hash แล้ว
          UserType: obj.UserType,
          Phone: obj.Phone,
        },
      });
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error in POST request:', error);
      return NextResponse.error('An error occurred while processing your request', 500);
    }
  }

  export async function PUT(rq) {
    try {
      const obj = await rq.json();
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(obj.Password, saltRounds);
  
      const data = await prisma.user.update({
        where: { key: obj.key },
        data: {
          Name: obj.Name,
          Email: obj.Email,
          Password: hashedPassword,
          UserType: obj.UserType,
          Phone: obj.Phone,
        },
      });
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error in PUT request:', error);
      return NextResponse.error('An error occurred while processing your request', 500);
    }
  }

  export async function DELETE(rq){ //ลบ
    const obj = await rq.json();
    const data = await prisma.user.delete({
        where:{
            key: obj.key
        },
    })
        return NextResponse.json(true)
}
