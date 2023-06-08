import Header from '../components/Header/index'
import SideBar from '../components/Sidebar/side'
import Widget from '../components/Widget/Widget'
import Box from '@mui/material/Box'
import Flag from '../components/Flag/flag'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Section from '../components/Section/Section'
import Subscription from '../components/Subscription/Subscription'
import MarketPlace from '../components/MarketPlace/MarketPlace'
import UserFriend from '../components/UserFriend/UserFriend'
const HomeApp = () => {
  return (
    <Router>
    
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="header">
          <Header />
          <Box
            sx={{
              // display: ["flex", "flex", "none"],
              display: ["flex", "flex", "none"],
              boxShadow: ["0px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
              justifyContent: "center",
              margin: "0rem 1rem",
              padding: " 0.3rem 0.5rem",
              position: ["sticky","sticky","sticky"],
              top: 0,
              zIndex: 100,
            }}
          >
           
          </Box>
        </div>
      </Box>
        <Box sx={{ display: 'flex',height: "85vh"  }}>
          <SideBar />
          <Box sx={{ width: '64%' }}>
            <Routes>
              <Route path='/' element={<Section />} /> 
               <Route path='/flag' element={<Flag />} />
               <Route path='/subscription' element={<Subscription />} />
               <Route path='/marketplace' element={<MarketPlace />} />
               <Route path='/userfriend' element={<UserFriend />} />
            </Routes>
          </Box>
         
          <Widget />
        </Box>

    </Router>
  )
}

export default HomeApp
