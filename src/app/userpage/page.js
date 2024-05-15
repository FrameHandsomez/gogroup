'use client'
import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import CustomerProfile from '../components/CustomerProfile';
import Navbar from '../components/Navbar';
import HistoryCustomer from '../components/HistoryCustomer';
import ReserveTable from '../components/ReserveTable';

import { useRouter } from 'next/navigation';


const { TabPane } = Tabs;

function Userpage() {
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

    return (
        <div>
            <Navbar />
            <CustomerProfile />
            <div className='container mx-auto'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Reserve" key="1">
                        <ReserveTable />
                    </TabPane>
                    <TabPane tab="History" key="2">
                        <HistoryCustomer />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Userpage;
