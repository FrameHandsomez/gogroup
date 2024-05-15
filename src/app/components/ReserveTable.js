"use client"
import { Table, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function ReserveTable() {
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
                    <Button type="primary" onClick={() => handleAccept(record)}>ร่วมเดินทาง</Button>
                </span>
            ),
        },
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/cus-reserve');
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
            await axios.put('/api/cus-reserve', { id: record.Id, action: 'accept'});
            // Refresh data after update
            fetchOrders();
            // Show success message using SweetAlert
            Swal.fire({
                title: 'จองสำเร็จ',
                text: 'ระบบได้บันทึกคำขอของคุณแล้ว !',
                icon: 'success',
            });
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div>
            <h2>หารถล่วงหน้า</h2>
            <Table dataSource={dataSource} columns={columns} className='drop-shadow-sm rounded-lg' />
        </div>
    );
}

export default ReserveTable;

