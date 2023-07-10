import SidebarItem from './SideInterface'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags'
import PeopleIcon from '@mui/icons-material/People'
import ChatIcon from '@mui/icons-material/Chat'
import StorefrontIcon from '@mui/icons-material/Storefront'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import HomeIcon from '@mui/icons-material/Home'
import { Path } from '../Utils/Path'
const data: SidebarItem[] = [
  {
    logo: <HomeIcon />,
    title: 'Home',
    route: Path.Home
  },
  { logo: <EmojiFlagsIcon />, title: 'Pages', route: Path.Flag },
  { logo: <PeopleIcon />, title: 'Friends', route: Path.Friend },
  {
    logo: <NotificationsActiveIcon />,
    title: 'Notification',
    route: Path.Notification
  },
  {
    logo: <StorefrontIcon />,
    title: 'Market Place',
    route: Path.MarketPlace
  },
  {
    logo: <VideoLibraryIcon />,
    title: 'Videos',
    route: Path.Subscription
  }
]

export default data
