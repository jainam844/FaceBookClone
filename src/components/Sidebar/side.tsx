import * as React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import ImageIcon from '@mui/icons-material/Image'
import WorkIcon from '@mui/icons-material/Work'
import BeachAccessIcon from '@mui/icons-material/BeachAccess'
import {
  LocalHospital as MedicalServicesIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  ExitToApp as ExitToAppIcon,
  Flag as FlagIcon,
  Subscriptions as SubscriptionsIcon,
  Storefront as StorefrontIcon,
  SupervisedUserCircle as SupervisedUserCircleIcon,
  Search as SearchIcon,
  PersonOutline as PersonOutlineIcon,
  Chat as ChatIcon,
  VideoLibrary as VideoLibraryIcon,
  ExitToApp as LogoutIcon
} from '@material-ui/icons'
export default function FolderList () {
  return (
    <List sx={{ width: '100%', position:'static',maxWidth: 360, bgcolor: 'background.paper', alignItems: 'flex-start' }}>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <MedicalServicesIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Photos' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <FlagIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Work'  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <SupervisedUserCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Vacation' />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <ChatIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Vacation'  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <StorefrontIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Vacation'  />
      </ListItem>{' '}
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <VideoLibraryIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Vacation' />
      </ListItem>  <ListItem>
        <ListItemAvatar>
         <Avatar sx={{ bgcolor: 'white',color:'blue' }}>
            <LogoutIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary='Vacation'  />
      </ListItem>
    </List>
  )
}
