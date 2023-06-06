import React from 'react'
import Header from './components/Header/index'
import SideBar from './components/Sidebar/side'
import Widget from './components/Widget/Widget'
import Box from '@mui/material/Box'
import Story from './Story/storyraw'
import StoryReel from './Story/story'
const App = () => {
  return (
    <div>
      <Header />
      <Box sx={{ display: 'flex' }}>
        <SideBar />
        <Widget />
        <StoryReel/>
      </Box>
    </div>
  )
}

export default App
