import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("userId");

    return Response.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch(error) {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }
}
