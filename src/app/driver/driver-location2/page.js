'use client'
import UserProfile from '@/app/components/UserProfile'
import DriverLocation2 from '@/app/components/driver-location2'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function DriverLoc2Page() {
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
   <DriverLocation2 />
</div>
  )
}

export default DriverLoc2Page
