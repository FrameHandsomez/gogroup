"use client"
import { Table, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderTable() {
    const [dataSource, setDataSource] = useState([]);
    const [fareInputs, setFareInputs] = useState({}); // State to store input values for each row
      
    const columns = [

        {
            title: 'เวลา',
            dataIndex: 'datetime',
            key: 'datetime',
            render: (datetime) => new Date(datetime).toLocaleString(),
        },

        {
            title: 'ที่อยู่ปัจจุบัน',
            dataIndex: 'start',
            key: 'start',
        },

        {
            title: 'สถานที่ปลายทาง',
            dataIndex: 'end',
            key: 'end',
        },

        {
            title: 'หมายเหตุ',
            dataIndex: 'introduction',
            key: 'introduction',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, record) => (
                <span className='flex gap-4 items-center'>
                    <Input
                        type="text"
                        className='w-24'
                        placeholder='ระบุค่าโดยสาร'
                        value={fareInputs[record.Id] || ''}
                        onChange={(e) => handleFareInputChange(e.target.value, record.Id)}
                    />
                    <Button type="primary" onClick={() => handleAccept(record)}>รับงาน</Button>
                    <Button danger onClick={() => handleDeny(record)}>ปฎิเสธ</Button>
                </span>
            ),
        },
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/driver');
            const data = response.data; // Assuming response structure matches what you provided
            setDataSource(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch driver information initially
        fetchOrders();
    }, []); 

    const handleAccept = async (record) => {
        try {
            await axios.put('/api/driver', { id: record.Id, action: 'accept', fare: fareInputs[record.Id] });
            // Refresh data after update
            fetchOrders();
            // Clear input after action
            setFareInputs({ ...fareInputs, [record.Id]: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeny = async (record) => {
        try {
            await axios.put('/api/driver', { id: record.Id, action: 'deny', fare: fareInputs[record.Id] });
            // Refresh data after update
            fetchOrders();
            // Clear input after action
            setFareInputs({ ...fareInputs, [record.Id]: '' });
        } catch (error) {
            console.error(error);
        }
    };

    const handleFareInputChange = (value, orderId) => {
        setFareInputs({ ...fareInputs, [orderId]: value });
    };

    return (
        <div>
            <h2>ออเดอร์ของคุณ :</h2>
            <Table dataSource={dataSource} columns={columns} className='drop-shadow-sm rounded-lg' />
        </div>
    );
}

export default OrderTable;

