import React from 'react'
import Header from './components/Header/index'
import SideBar from './components/Sidebar/side'
import Widget from './components/Widget/Widget'
import Box from '@mui/material/Box'
import Story from './Section/Story/story'
import BasicCard from './Section/AddComment/comment'
import Post from './Section/PostStory/PostStory'
const App = () => {
  return (
    <div>
    <Box sx={{minHeight:'10vh'}}> <Header /></Box> 
      <Box sx={{ display: 'flex' }}>
        <SideBar/>
        <Box sx={{width:["100%","100%","85%","70%"]}}> <Story/>
        <BasicCard/>
        <Post/>
        </Box> 

        <Widget />
   
      </Box>
    </div>
  )
}

export default App
