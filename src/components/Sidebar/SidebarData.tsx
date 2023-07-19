import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import { Path } from "../Utils/Path";
import SidebarItem from "./SideInterface";
const data: SidebarItem[] = [
  {
    logo: <HomeIcon />,
    title: "Home",
    route: Path.Home,
  },
  { logo: <EmojiFlagsIcon />, title: "Pages", route: Path.Flag },
  { logo: <PeopleIcon />, title: "Friends", route: Path.Friend },
  {
    logo: <NotificationsActiveIcon />,
    title: "Notification",
    route: Path.Notification,
  },
  {
    logo: <StorefrontIcon />,
    title: "Market Place",
    route: Path.MarketPlace,
  },
  {
    logo: <VideoLibraryIcon />,
    title: "Videos",
    route: Path.Subscription,
  },
];

export default data;
