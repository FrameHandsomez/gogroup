"use client"

import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

function UserProfile() {
    const [dataUser, setDataUser] = useState([]);
    const navigate = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/user');
                const data = response.data; // Assuming response structure matches what you provided
                setDataUser(data); // Update state with fetched user data
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Empty array means this effect runs only once after the initial render

  
const handleLogout = async () => {
    try {
      await axios.post("/api/logout");
      setDataUser(null); // Clear user data after logout
      Swal.fire({
        title: "ออกจากระบบสำเร็จ",
        text: "กำลังไปสู่หน้า ล็อกอิน !",
        icon: "success",
      }).then((result) => { // Use .then() to handle user confirmation
        if (result.isConfirmed) {
          navigate.push('/'); // Navigate to the home page after logout
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <div className='bg-white my-12 p-6 drop-shadow-sm rounded-lg flex flex-row justify-between items-center'>

            <div>{/* item1 */}
            
            {dataUser && (
        <div>
          {dataUser.map((user) => (
            <div key={user.Id}>
            <p>หมายเลขคนขับ: {user.Id}</p>
            <p>อีเมล: {user.Email}</p>
            <p>ชื่อ: {user.Name}</p>
            <p>โทรศัพท์: {user.Phone}</p>
            <p>ตำแหน่ง: {user.UserType}</p>
        </div>
          ))}
        </div>
      )}

            </div>

            <div className='flex justify-center gap-2 items-center'> {/* item2 */}
                <Button onClick={() => navigate.push('/driver')}>หน้าหลักคนขับ</Button>
                <Button type='primary'onClick={() => navigate.push('/driver/driver-location2')}>เพิ่มการเดินทาง</Button>
                <Button type='primary'onClick={() => navigate.push('/driver/history')}>ประวัติ</Button>
                <Button danger onClick={handleLogout}>ออกจากระบบ</Button>
            </div>

        </div>
    );
}

export default UserProfile;
