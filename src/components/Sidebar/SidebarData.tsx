import SidebarItem from './SideInterface'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import StorefrontIcon from '@mui/icons-material/Storefront'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'

const data: SidebarItem[] = [
  {
    logo: <LocalHospitalIcon />,
    title: 'Covid-19 Information Center',
    route: '/home'
  },
  { logo: <EmojiFlagsIcon />, title: 'Pages', route: '/home/flag' },
  { logo: <PeopleIcon />, title: 'Friends', route: '/home/friend' },
  { logo: <ChatIcon />, title: 'Messenger', route: '/home' },
  {
    logo: <StorefrontIcon />,
    title: 'Market Place',
    route: '/home/marketplace'
  },
  { logo: <VideoLibraryIcon />, title: 'Videos', route: '/home/subscription' }
]

export default data
