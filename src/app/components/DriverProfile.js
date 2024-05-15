import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DriverProfile({ orderId }) {
    const [driver, setDriver] = useState(null);
    const [order, setOrder] = useState(null);
    const fetchDriver = async () => {
        try {
            if (orderId) {
                const response = await axios.get(`/api/location2?id=${orderId}`);
                const data = response.data.driver;
                setOrder(response.data)
                setDriver(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch driver information initially
        fetchDriver();
    }, [orderId]); 

    return (
        <div>
            {driver && order && (
                <div>
                    <p><strong>ชื่อ:</strong> {driver.Name}</p>
                    <p><strong>อีเมล:</strong> {driver.Email}</p>
                    <p><strong>โทรศัพท์:</strong> {driver.Phone}</p>
                    <p><strong>ราคาต่อที่นั่ง:</strong> {parseFloat(order.fare).toLocaleString()}{' '}บาท</p>
                    {/* Render other driver details as needed */}
                </div>
            )}
        </div>
    );
}

export default DriverProfile;
