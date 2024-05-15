'use client'
import { Checkbox, Form, Input, Select, Spin } from "antd"
import { useState, useEffect } from "react";
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link";

export default function RegisterPage({params}) {
  const [data, setData] = useState()
  const [form] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    axios.get('/api/register?key='+params.id)
      .then(res => {
        setData(res.data)
        form.setFieldsValue(res.data)
      })
  }, [form])

  const DoSubmit = async (formvalue) => {
    const dataUpdate = {...data, ...formvalue};
    if (dataUpdate.key) {
      axios.put('/api/register', dataUpdate).then(res => {
        setData(res.data);
        form.setFieldsValue(res.data)
      })
    } else {
      axios.post('/api/register', dataUpdate).then(res => {
        setData(res);
        form.setFieldsValue(res.data)
      })
    }
    router.push('/login')
    alert('สมัครสมาชิกสำเร็จ');
  }

  const [isAgree, setIsAgree] = useState(false)
  const DoCheck = (v) => {
    setIsAgree(v.target.checked)
  }

  return (
    <>
      <div className="flex justify-center w-full items-center h-screen flex-col">
      <Link href="/">
        <img src="/images/logo.png" className=" w-40 mb-10"></img>
        </Link>
        <Form onFinish={DoSubmit} layout="vertical" className="w-[500px] bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>
          <Form.Item label="Name" name={'Name'} rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name={'Email'} rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name={'Password'} rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
            <Input.Password />
          </Form.Item>
          <Form.Item label="Phone" name={'Phone'} rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="ประเภทผู้ใช้งานระบบ" name="UserType" rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
            <Select options={[
              {value:'Driver', label:'คนขับ'},
              {value:'Customer', label:'ผู้ใช้บริการ'}
            ]} />
          </Form.Item>
          <div className="mb-5">
            <Checkbox onChange={DoCheck}/> ฉันเห็นด้วยกับข้อกำหนดและความเป็นส่วนตัว
          </div>
          <button className="btn btn-primary" disabled={!isAgree} >สมัครสมาชิก</button>
        </Form>
      </div>
    </>
  )
}