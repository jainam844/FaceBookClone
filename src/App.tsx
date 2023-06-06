import React from 'react';
import Header from './components/Header/index';
import SideBar from './components/Sidebar/side';
import Widget from './components/Widget/Widget';
import Box from '@mui/material/Box'
const App = () => {
  return (
    <div>
      <Header />
      <Box sx={{display:'flex'}}>
      <SideBar  />
      <Widget/>
      </Box>
    </div>
  );
};

export default App;

