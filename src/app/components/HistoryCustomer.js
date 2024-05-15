"use client"
import { Table, Button, Input, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HistoryCustomer() {
    const [dataSource, setDataSource] = useState([]);

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
            title: 'สถานะ',
            dataIndex: 'statusId',
            key: 'statusId',
            render: (statusId) => {
                let color = '';
                let text = '';
                switch (statusId) {
                    case 1:
                        color = 'default';
                        text = 'รอการตอบรับ';
                        break;
                    case 2:
                        color = 'success';
                        text = 'ตอบรับแล้ว';
                        break;
                    case 3:
                        color = 'error';
                        text = 'ถูกยกเลิก';
                        break;
                    default:
                        break;
                }
                return <Tag color={color}>{text}</Tag>;
            },
        },       

        {
            title: 'หมายเหตุ',
            dataIndex: 'introduction',
            key: 'introduction',
        },

        {
            title: 'ราคา',
            dataIndex: 'fare',
            key: 'fare',
            render: (text, record) => (
  <>
  <p>{parseFloat(text).toLocaleString()}{' '}บาท</p>
  </>
            ),
        },
        
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/cus-order');
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


    return (
        <div>
            <h2>ประวัติการเดินทาง</h2>
            <Table dataSource={dataSource} columns={columns} className='drop-shadow-sm rounded-lg' />
        </div>
    );
}

export default HistoryCustomer;
