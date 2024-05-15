'use client'

import { DatePicker, Form, Input, InputNumber, Select, Spin } from "antd"
import { useState } from "react"

export default function Inputpage () {
    const DoSubmit = (fromvalue)=>{
        setLoader(true);
        console.log (fromvalue)
    }
    const addresslist = [
        {value:1, label:'บางสะพานใหญ่'},
        {value:1, label:'บางสะพานน้อย'},
        {value:1, label:'บางสะพานกลาง'},
    ]
    
    const [loader, setLoader] = useState(false);

    return (
        <>
        <div className="flex flex-col">
            <Spin spinning={loader}>
        <Form onFinish={DoSubmit} className="w-[350px]">
            
            <Form.Item label ="Text Iuput" name="textinput" 
            rules={[{required:true, message:'กรอกข้อมูลด้วยครับ'}]}>
                <Input/>
            </Form.Item>

           <Form.Item label ="Number Input" name="numberinput">
                <InputNumber />
                {/* ยังพิมพ์ตัวหนังสือได้ แต่จะหายไป */}
            </Form.Item>

            <Form.Item label ="Number Input" name="textnumberinput">
                <Input type="number" />
                {/* พิมพ์ตัวหนังสือไม่ได้ */}
            </Form.Item>
        
            <Form.Item label ="เลือกสถานที่" name="AddressSelect">
                <Select options={addresslist}
                showSearch
                filterOption={(input,option)=> (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                />
            </Form.Item>

            <Form.Item label ="เวลาในการเดินทาง" name="datetime">
                <DatePicker showTime/>
            </Form.Item>
            <button className="btn btn-primary">Submit</button>
        </Form>
            </Spin>
        </div>
        </>
    )
}