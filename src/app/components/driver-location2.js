'use client'
import { Form, Input, Spin, DatePicker, Select, Button, Modal  } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DriverProfile from "../components/DriverProfile";



export default function DriverLocation2({ params }) {
    const [form] = Form.useForm();

    const [loader, setLoader] = useState(false);



    
    const DoSubmit = async (formValue) => {
        setLoader(true);
        
        try {
            const response = await axios.post('/api/driver-location2', formValue);
            if(response.status === 200){
                Swal.fire({
                    title: "บันทึกข้อมูลเรียบร้อย",
                    text: "",
                    icon: ""
                }).then(() => {
                    setLoader(false); 
                    form.resetFields();
                });
            }
        } catch (error) {
            console.error(error); // Log the error to the console
        } 
    };

    const personlist = [
        { value: 'female', label: 'เพศหญิง เท่านั้น' },
        { value: 'male', label: 'เพศชาย เท่านั้น' },
        { value: 'all', label: 'ได้ทุกเพศ' },
    ];

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    return (
        <div className="flex justify-center my-10 ">
            <Spin spinning={loader}>
                <Form {...layout} form={form} onFinish={DoSubmit} className="max-w-lg bg-white p-8 rounded-lg shadow-mg">
                    <h1 className="text-3xl font-bold mb-8 text-center">เลือกสถานที่</h1>

                    <Form.Item label="ที่อยู่ปัจจุบัน" name="start">
                        <Input className="rounded-md " />
                    </Form.Item>

                    <Form.Item label="สถานที่ปลายทาง" name="end">
                        <Input className="rounded-md" />
                    </Form.Item>

                    <Form.Item label="เวลาในการเดินทาง" name="datetime">
                        <DatePicker showTime />
                    </Form.Item>

                    <Form.Item label="ผู้ร่วมเดินทาง" name="personSelect">
                        <Select
                            options={personlist}
                            showSearch
                            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        />
                    </Form.Item>

                    <Form.Item label="ราคาต่อที่นั่ง" name="fare">
                        <Input type="number" suffix="บาท" />
                    </Form.Item>

                    <Form.Item name="introduction" label="สถานที่เพิ่มเติม">
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                        <Button type="primary" htmlType="submit">ยืนยัน</Button>
                    </Form.Item>
                </Form>
              
            </Spin>
        </div>
    );
}
