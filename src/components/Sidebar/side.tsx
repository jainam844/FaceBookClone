import { Box } from '@mui/material'

import SidebarIcons from './sidebaricon'

const Sidebar = (): JSX.Element => {
  return (
    <Box
      sx={{
        boxShadow: '0px 5px 17px -7px rgba(0, 0, 0, 0.75)',
        height: '77vh',
        display: ['none', 'none', 'flex'],
        width:'15%',
      }}
    >
      <SidebarIcons />
    </Box>
  )
}
export default Sidebar
