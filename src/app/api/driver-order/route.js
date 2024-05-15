import { PrismaClient } from "@prisma/client"; // ใช้สำหรับการเชื่อมต่อและดึงข้อมูลจากฐานข้อมูล Prisma
import { cookies } from "next/headers"; //  ใช้สำหรับการอ่านข้อมูลจากคุกกี้ (cookie) ของผู้ใช้
import { NextResponse } from "next/server"; // ใช้สำหรับการตอบสนอง (response) ของ API route

const prisma = new PrismaClient(); // สร้างตัวแปร prisma เป็นอินสแตนซ์ของ PrismaClient เพื่อเชื่อมต่อกับฐานข้อมูล

export async function GET(req) { // ฟังก์ชันนี้จะทำงานเมื่อมีการเรียก API route ด้วย method GET
    const cookieStore = cookies(req.headers); // สร้างตัวแปร cookieStore เพื่อเก็บข้อมูลคุกกี้ ใช้ cookies จาก req.headers เพื่อเข้าถึงข้อมูลคุกกี้ของผู้ใช้
    const userId = cookieStore.get("userId"); // ใช้ cookieStore.get("userId") เพื่อดึงค่าของคุกกี้ที่มีชื่อว่า "userId"

    try { // ใช้ try...catch เพื่อจัดการกรณีที่เกิดข้อผิดพลาด
        const data = await prisma.location2.findMany({ // ใช้ prisma.location2.findMany เพื่อดึงข้อมูลตำแหน่งหลายรายการจากตาราง location2
            where: { // กำหนดเงื่อนไขการค้นหา (where) คือ driverId ต้องตรงกับค่าที่แปลงเป็นตัวเลขจากคุกกี้ userId
                driverId: parseInt(userId.value)
            },
            include: { // ใช้ include: { cus: true } เพื่อดึงข้อมูลของตาราง cus ที่เกี่ยวข้องกับแต่ละตำแหน่ง (น่าจะเป็นข้อมูลของลูกค้า)
                cus: true 
            }
        });
        if (data) {
            return NextResponse.json(data); // ดึงข้อมูลสำเร็จ ใช้ NextResponse.json(data) เพื่อส่งข้อมูล data (ตำแหน่ง) ที่ดึงมาจากฐานข้อมูลเป็นรูปแบบ JSON กลับไปยังผู้เรียกใช้ API
        } else {
            return NextResponse.error(new Error("Data not found"), { status: 404 }); 
        } //// ดึงข้อมูลไม่สำเร็จ ใช้ NextResponse.error(new Error("Data not found"), { status: 404 }) เพื่อส่ง Error message "Data not found" พร้อมกับสถานะ 404 (Not Found) กลับไปยังผู้เรียกใช้ API
    } catch (err) {
        console.error(err);
        return NextResponse.error(err, { status: 500 });
    }
}