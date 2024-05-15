'use client'
import { Checkbox, Form, Input, Select, Spin } from "antd"
import { useState, useEffect } from "react";
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link";
import Swal from "sweetalert2";

export default function LoginPage() {

  
  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Send a POST request to the /api/logout route using Axios
        const response = await axios.post("/api/logout");
  
        // Check if the response was successful
        if (response.status === 200) {
          // Handle successful logout (e.g., redirect to login page)
          console.log("Logged out successfully");
        } else {
          // Handle error
          console.error("Failed to log out");
        }
      } catch (error) {
        console.error("Error occurred during logout:", error);
      }
    };
  
    logoutUser();
  }, []); 



  const [data, setData] = useState();
  const [form] = Form.useForm();
  const router = useRouter();

  const DoSubmit = async (formValue) => {
    const { Email, Password } = formValue;

    try {
      const response = await axios.post('/api/login', { Email, Password });
      if (response.data.message === 'Login successful') {
        console.log(response.data)
        Swal.fire({
          title: 'เข้าสู่ระบบสำเร็จ',            
          icon: 'success',
      }).then((result) => {
        // Use .then() to handle user confirmation
        if (result.isConfirmed) {
          if(response.data.user.UserType === 'Driver'){
          router.push("/driver");
          }
       else if (response.data.user.UserType === "Customer"){
        router.push("/");
       }
      }
      });
      } else {
        Swal.fire({
          title: 'เข้าสู่ระบบล้มเหลว',          
          icon: 'error',
      });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'เข้าสู่ระบบล้มเหลว',          
        icon: 'error',
    });
    }
  };

  return (
    <>
      <div className="flex justify-center w-full items-center h-screen flex-col">
        <Link href="/">
        <img src="/images/logo.png" className=" w-40 mb-10"></img>
        </Link>
        <Form
          onFinish={DoSubmit}
          layout="vertical"
          className="w-[500px] bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <Form.Item
            label="Email"
            name={'Email'}
            rules={[{ required: true, message: 'กรอกข้อมูลด้วยครับ' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Password"
            name={'Password'}
            rules={[{ required: true, message: 'กรอกข้อมูลด้วยครับ' }]}
          >
            <Input.Password />
          </Form.Item>
          <button className="btn btn-primary">เข้าสู่ระบบ</button>
        </Form>
      </div>
    </>
  )
}