"use client"

import { Table, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderTable from '../components/OrderTable';
import UserProfile from '../components/UserProfile';
import { useRouter } from 'next/navigation';

function Driverpage() {
   
    
    const router = useRouter();

    // Check role on component mount
    const checkRole = async () => {
      // Get role from cookie
      const roleCookie = document.cookie.split('; ').find(row => row.startsWith('role='));
      if (!roleCookie || roleCookie.split('=')[1] !== 'Driver' || roleCookie === null) {
        // If role is not Customer, redirect to '/'
        router.push('/');
      }
    };
  
    useEffect(() => {
      checkRole();
    }, [router]);

    return (
        <div className="container mx-auto">
            <UserProfile />
            <OrderTable />
        </div>
    );
}

export default Driverpage;
