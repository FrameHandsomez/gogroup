'use client'
import { Form, Input, Spin, DatePicker, Select, Button, Modal  } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import DriverProfile from "../components/DriverProfile";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Location2page({ params }) {
    const [form] = Form.useForm();
    const [orderId, setOrderId] = useState(null);
    const [order, setOrder] = useState([]);
    const [loader, setLoader] = useState(false);
    const [fetchIntervalId, setFetchIntervalId] = useState(null); // State to hold the interval ID
    const [sweetAlertShown, setSweetAlertShown] = useState(false); // State to track if SweetAlert has been shown
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

  // Check role on component mount
  const checkRole = async () => {
    // Get role from cookie
    const roleCookie = document.cookie.split('; ').find(row => row.startsWith('role='));
    if (!roleCookie || roleCookie.split('=')[1] !== 'Customer') {
      // If role is not Customer, redirect to '/'
      router.push('/driver');
    }
  };

  useEffect(() => {
    checkRole();
  }, [router]);

    const handleOk = () => {
      setIsModalOpen(false);
      router.push('/userpage');
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      router.push('/userpage');
    };

    //ฟังก์ชันดึงข้อมูลการเรียกรถ
    const fetchOrderStatus = async () => {
        try {
            if (orderId) {

                const response = await axios.get(`/api/location2?id=${orderId}`); //เรียก Endpoint เพื่อค้นหารายการโดยใช้ไอดี
                const orderData = response.data;
                setOrder(orderData); //เซ็ตค่าให้ตัวแปร order

                if (orderData.statusId === 1) { //ถ้าสถานะของรายการเท่่ากับหนึ่ง ให้ Loader ทำงาน
                    setLoader(true);

                } else if (orderData.statusId === 2) {
                    setLoader(false);
                    clearInterval(fetchIntervalId);
                    setSweetAlertShown(true);
                    Swal.fire({
                        title: "มีคนขับตอบรับแล้ว",
                        text: "รอสักครู่ คนขับกำลังไปหาคุณ !! ",
                        icon: "success"
                    }).then(() => {
                        setIsModalOpen(true); 
                    });

                } else {
                    setLoader(false);
                    clearInterval(fetchIntervalId); // Clear interval
                    setSweetAlertShown(true); // Set flag to true when SweetAlert is shown
                    Swal.fire({
                        title: "คนขับปฏิเสธการเดินทางของคุณ",
                        text: "กรุณาเรียกรถใหม่ อีกครั้ง",
                        icon: "error"
                    });
                }
            } else {
                console.log('Order ID is null or undefined');
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        // Fetch order status initially
        fetchOrderStatus();
    
        // Fetch order status every 10 seconds
        const intervalId = setInterval(() => {
            if (orderId && !sweetAlertShown) { // Check if SweetAlert has been shown
                fetchOrderStatus();
            }
        }, 10000);
    
        // Set interval ID to state
        setFetchIntervalId(intervalId);
    
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [orderId, sweetAlertShown]); 
    
    const DoSubmit = async (formValue) => {
        setLoader(true);
        
        try {
            const response = await axios.post('/api/location2', formValue);
            setOrderId(response.data); // Assuming response.data contains the key
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
      <div className="flex justify-center w-full items-center h-screen flex-col">
        <Link href="/">
          <img src="/images/logo.png" className=" w-40 mb-10"></img>
        </Link>
        <Spin spinning={loader}>
          <Form
            {...layout}
            form={form}
            onFinish={DoSubmit}
            className="max-w-lg bg-white p-8 rounded-lg shadow-mg"
          >
            <h1 className="text-3xl font-bold mb-8 text-center">
              เลือกสถานที่
            </h1>

            <Form.Item label="ที่อยู่ปัจจุบัน" name="start">
              <Input />
            </Form.Item>

            <Form.Item label="สถานที่ปลายทาง" name="end">
              <Input />
            </Form.Item>

            <Form.Item label="เวลาในการเดินทาง" name="datetime">
              <DatePicker showTime />
            </Form.Item>

            <Form.Item label="ผู้ร่วมเดินทาง" name="personSelect">
              <Select
                options={personlist}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>

            <Form.Item name="introduction" label="สถานที่เพิ่มเติม">
              <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                เรียกรถ!!
              </Button>
            </Form.Item>
          </Form>

          <Modal
            title="Driver Profile"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <DriverProfile orderId={orderId} />
          </Modal>
        </Spin>
      </div>
    );
}
