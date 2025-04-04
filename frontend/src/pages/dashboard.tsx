import { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import Rooms from '../components/Rooms';
import MyBookings from '../components/MyBookings';

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      padding={4}
    >
      <Typography
        variant='h4'
        gutterBottom
      >
        Dashboard
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
      >
        <Tab label='Rooms' />
        <Tab label='My Bookings' />
      </Tabs>

      {activeTab === 0 && <Rooms />}
      {activeTab === 1 && <MyBookings />}
    </Box>
  );
}

export default Dashboard;
