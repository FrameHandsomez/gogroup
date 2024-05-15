"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "antd";
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [dataUser, setDataUser] = useState(null);
  const navigate = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user");
        const data = response.data;
        setDataUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setDataUser(null); // Clear user data after logout
      Swal.fire({
        title: "ออกจากระบบสำเร็จ",
        text: "กำลังไปสู่หน้า ล็อกอิน !",
        icon: "success",
      }).then((result) => {
        // Use .then() to handle user confirmation
        if (result.isConfirmed) {
          navigate.push("/"); // Navigate to the home page after logout
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-between items-center mx-16 my-6">
      <Link href="/">
      <img src="/images/logo.png" className="w-36" alt="Logo"></img>
      </Link>
      {dataUser && (
        <div>
          {dataUser.map((user) => (
            <div key={user.Id}>
              <p className="text-xl font-bold">
                <span className="text-gray-500">ยินดีต้อนรับคุณ</span> {user.Name}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between gap-8 text-2xl items-center">
        {dataUser ? (
          <>
            <Link href="/userpage">
              <Button type="primary" size='large'>ข้อมูลส่วนตัว</Button>
            </Link>
            
            <Button danger onClick={handleLogout} size='large'>
              ออกจากระบบ
            </Button>
            
          </>
        ) : (
          <>
            <div className="flex justify-between gap-6">
              <Link href="/">
                <div>
                  <h1>หน้าหลัก</h1>
                </div>
              </Link>
              <Link href="/register">
                <div>
                  <h1>สมัครสมาชิก</h1>
                </div>
              </Link>
            </div>
            <Link href="/login">
              <Button type="primary" size='large'>เข้าสู่ระบบ</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
