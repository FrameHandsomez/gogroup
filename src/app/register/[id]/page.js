'use client'

import { Form, Input } from "antd"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RegisterForm({params}){
    const [data,setData] = useState()
    const [form] = Form.useForm();
    const router = useRouter();
    useEffect(()=>{
        axios.get('/api/register?id='+params.id)
            .then(res=>{
                setData(res.data)
                form.setFieldsValue(res.data)
            })
    },[form])

    const Submit =async(formvalue)=>{
        const dataUpdate = {...data,...formvalue};
        if(dataUpdate.key){
            axios.put('/api/register',dataUpdate).then(
                res=>{
                    setData(res.data);
                    form.setFieldsValue(res.data)
                }
            )
        }else{
            axios.post('/api/register',dataUpdate).then(
                res=>{
                    setData(res);
                    form.setFieldsValue(res.data)
                }
            )
        }
        router.push('/register')
    }
    return(
        <>
        <Form form={form} onFinish={Submit}>
            <Form.Item label="ชื่อ" name={'Name'}>
                <Input />
            </Form.Item>
            <Form.Item label="อีเมล" name={'Email'}>
                <Input />
            </Form.Item>
            <Form.Item label="รหัส" name={'Password'}>
                <Input />
            </Form.Item>
            <button className="btn btn-secondary" onClick={(item)=>Submit(item.key)}>บันทึก</button>
        </Form>
        </>
    )
}
