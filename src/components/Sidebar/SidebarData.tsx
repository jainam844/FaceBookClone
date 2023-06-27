import SidebarItem from "./SideInterface";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
const data: SidebarItem[] = [
  {
    logo: <LocalHospitalIcon />,
    title: "Covid-19 Information Center",
    route: "/layout/home",
  },
  { logo: <EmojiFlagsIcon />, title: "Pages", route: "/layout/home/flag" },
  { logo: <PeopleIcon />, title: "Friends", route: "/layout/home/friend" },
  {
    logo: <NotificationsActiveIcon />,
    title: "Notification",
    route: "/layout/home/Notification",
  },
  {
    logo: <StorefrontIcon />,
    title: "Market Place",
    route: "/layout/home/marketplace",
  },
  {
    logo: <VideoLibraryIcon />,
    title: "Videos",
    route: "/layout/home/subscription",
  },
];

export default data;
