import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { Collapse } from '@mui/material'
import { Slide } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import StorefrontIcon from '@mui/icons-material/Storefront'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import { Divider } from '@mui/material'
import * as React from 'react'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ExpandLess from '@mui/icons-material/ExpandLess'
import DeleteIcon from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import { Link } from 'react-router-dom'

interface SidebarItem {
  logo: React.ReactElement
  title: string
  route: string
}

const data: SidebarItem[] = [
  {
    logo: <LocalHospitalIcon />,
    title: 'Covid-19 Information Center',
    route: '/'
  },
  { logo: <EmojiFlagsIcon />, title: 'Pages', route: '/flag' },
  { logo: <PeopleIcon />, title: 'Friends', route: '/' },
  { logo: <ChatIcon />, title: 'Messenger', route: '/' },
  { logo: <StorefrontIcon />, title: 'Market Place', route: '/marketplace' },
  { logo: <VideoLibraryIcon />, title: 'Videos', route: '/subscription' }
]

const sidebarIconStyle = {
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#f0f2f5'
  }
}

const SidebarIcons = () => {
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          marginTop: '10px'
        }}
      >
        <ListItem sx={sidebarIconStyle}>
          <ListItemAvatar>
            <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300' />
          </ListItemAvatar>
          <ListItemText primary='Jainam shah' />
        </ListItem>

        {data.map((item, index) => (
          <ListItem key={index}     component={Link}   to={item.route} sx={{ ...sidebarIconStyle }}>
            <ListItemAvatar>
              <Avatar sx={{ color: '#2e81f4', backgroundColor: '#e3dede' }}>
                {item.logo}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} sx={{ fontWeight: '600' }} />
          </ListItem>
        ))}

        <ListItemButton sx={{ ...sidebarIconStyle }} onClick={handleClick}>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar sx={{ color: '#2e81f4', backgroundColor: '#e3dede' }}>
                <ExpandMoreIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary='Expand More' />
          {open ? <ExpandLess /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <Slide direction='up' in={open} mountOnEnter unmountOnExit>
            <List>
              <ListItem sx={{ ...sidebarIconStyle }}>
                <ListItemAvatar>
                  <Avatar sx={{ color: '#2e81f4', backgroundColor: '#e3dede' }}>
                    <SaveIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ fontWeight: '600' }} primary='Save' />
              </ListItem>
              <ListItem sx={{ ...sidebarIconStyle }}>
                <ListItemAvatar>
                  <Avatar sx={{ color: '#2e81f4', backgroundColor: '#e3dede' }}>
                    <DeleteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText sx={{ fontWeight: '600' }} primary='Delete' />
              </ListItem>
            </List>
          </Slide>
        </Collapse>

        <Divider />

        <ListItem sx={{ ...sidebarIconStyle }}>
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: '#e3dede' }}>
              <LogoutIcon sx={{ color: '#2e81f4' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary='LogOut' />
        </ListItem>
      </List>
    </div>
  )
}

export default SidebarIcons
