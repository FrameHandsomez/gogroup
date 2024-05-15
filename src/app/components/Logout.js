import React from 'react'
import { cookies } from "next/headers";

const Logout = () => {
    const cookieStore = cookies();
    const user = cookieStore.get("user");
    const loginText = user?.value ? "ออกจากระบบ" : "เข้าสู่ระบบ";
  return (
    <div>
      <h1>{loginText}</h1>
    </div>
  )
}

export default Logout
