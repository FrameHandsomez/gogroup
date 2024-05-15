"use client"

import React, { useEffect } from 'react';

import HistoryTable from '@/app/components/HistoryTable';
import UserProfile from '@/app/components/UserProfile';
import { useRouter } from 'next/navigation';

function Driverpage() {
    const router = useRouter();

    // Check role on component mount
    const checkRole = async () => {
      // Get role from cookie
      const roleCookie = document.cookie.split('; ').find(row => row.startsWith('role='));
      if (!roleCookie || roleCookie.split('=')[1] !== 'Driver') {
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
           <HistoryTable />
        </div>
    );
}

export default Driverpage;
