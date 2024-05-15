import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'

const prisma = new PrismaClient(); // Ensure this is initialized outside the POST function

export async function POST(req) {
  try {
    const { Email, Password } = await req.json();
    console.log("Email:", Email); // Log the extracted email

    // Validate required fields
    if (!Email || !Password) {
      return NextResponse.json({ message: "Missing required fields (Email, Password)" }, { status: 400 });
    }

    // Find user by Email //เปลี่ยนจาก findUnique เป็น findFirst
    const user = await prisma.user.findFirst({
      where: { Email: Email },
    });

    console.log("User:", user); // Log the retrieved user object (or null)

    // Check if user exists
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Securely compare password using bcrypt
    if (user) {
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      // Handle incorrect password
      if (!passwordMatch) {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
      }
    }

    // Login successful
    if (user) {
      cookies().set('userId', user.Id)
      cookies().set('role', user.UserType)
      return NextResponse.json({ message: "Login successful", user });
    } else {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.error("An error occurred while processing your request", 500);
  }
}
