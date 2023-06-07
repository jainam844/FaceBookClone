import React from 'react'
import Header from './components/Header/index'
import SideBar from './components/Sidebar/side'
import Widget from './components/Widget/Widget'
import Box from '@mui/material/Box'
import Story from './Section/Story/story'
import BasicCard from './Section/PostStory/SharePost'
const App = () => {
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <SideBar/>
        <Box sx={{width:["100%","100%","85%","70%"]}}> <Story/>
        <BasicCard/>
        </Box> 

        <Widget />
   
      </Box>
    </div>
  )
}

export default App
