import React from 'react'
import Header from '../components/Header/Header'
import SideBar from '../components/Sidebar/side'
import Widget from '../components/Widget/Widget'
import Box from '@mui/material/Box'
import { BrowserRouter as Router, Outlet } from 'react-router-dom'
import HeaderIcons from '../components/Header/HeaderIcons'
const HomeApp = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div className='header'>
          <Header />
          <Box
            sx={{
              display: ['flex', 'flex', 'none'],
              boxShadow: ['0px 5px 7px -7px rgba(0, 0, 0, 0.75)'],
              justifyContent: 'center',
              margin: '0rem 1rem',
              padding: ' 0.3rem 0.5rem',
              position: ['sticky', 'sticky', 'sticky'],
              top: 0,
              zIndex: 100
            }}
          >
            <HeaderIcons />
          </Box>
        </div>
      </Box>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SideBar />
        <Box sx={{ width: '64%', bgcolor: '#f0f2f5' }}>
          <Outlet />
        </Box>
        <Widget />
      </Box>
    </React.Fragment>
  )
}

export default HomeApp
