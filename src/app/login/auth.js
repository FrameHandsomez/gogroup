import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/navigation';

const prisma = new PrismaClient();

export async function verifyPassword(plainPassword, hashedPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Error in password verification:', error);
    return false;
  }
}

export async function authenticateUser(email, password) {
  const router = useRouter();
  try {
    const user = await prisma.user.findUnique({
      where: {
        Email: email,
      },
    });

    if (!user) {
      return null; // User not found
    }

    const isPasswordValid = await verifyPassword(password, user.Password);

    if (!isPasswordValid) {
      return null; // Invalid password
    }

    return user; // Authentication successful
  } catch (error) {
    console.error('Error in user authentication:', error);
    return null;
  }
}