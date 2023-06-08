import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'

import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import StorefrontIcon from '@mui/icons-material/Storefront'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import LogoutIcon from '@mui/icons-material/Logout'
import { Divider } from '@mui/material'

const data = [
  { logo: <LocalHospitalIcon />, title: 'Covid-19 Information Center' },
  { logo: <EmojiFlagsIcon />, title: 'Pages' },
  { logo: <PeopleIcon />, title: 'Friends' },
  { logo: <ChatIcon />, title: 'Messenger' },
  { logo: <StorefrontIcon />, title: 'Market Place' },
  { logo: <VideoLibraryIcon />, title: 'Videos' },
  { logo: <ExpandMoreIcon />, title: 'More' }
]

const SidebarIcons = () => {
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
        <ListItem sx={{ cursor: 'pointer' }}>
          <ListItemAvatar>
            <Avatar src='https://source.unsplash.com/bh4LQHcOcxE/600x300'></Avatar>
          </ListItemAvatar>
          <ListItemText primary='Jainam shah' />
        </ListItem>
        {data.map((item, index) => (
          <ListItem key={index} sx={{ cursor: 'pointer' }}>
            <ListItemAvatar>
              <Avatar sx={{ color: '#2e81f4', backgroundColor: '#e3dede' }}>
                {item.logo}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.title} sx={{ fontWeight: '600' }} />
          </ListItem>
        ))}
        <Divider />
        <ListItem sx={{ cursor: 'pointer' }}>
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
