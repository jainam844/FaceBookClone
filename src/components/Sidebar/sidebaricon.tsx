import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Collapse, Typography } from "@mui/material";
import { Slide } from "@mui/material";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import data from "./SidebarData";
import UserContext from "../Context/UserContext";
import fbImgLogo from "../../assets/BharatBook1.png";
import { Path } from "../Utils/Path";

const SidebarIcons = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { userData, userimageUrl } = useContext(UserContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const sidebarIconStyle = {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f0f2f5",
    },
  };

  return (
    <React.Fragment>
      <List sx={{ marginTop: "10px", }}>
        <ListItem sx={sidebarIconStyle} component={Link} to={Path.Profile}>
          <ListItemAvatar>
            <Avatar src={userimageUrl} />
          </ListItemAvatar>
          <ListItemText
            sx={{ fontWeight: "600", color: "black" }}
            primary={userData.firstName + " " + userData.lastName}
          />
        </ListItem>

        {data.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            to={item.route} // Update the route using enum value
            sx={{ ...sidebarIconStyle }}
            selected={selectedIndex === index}
            onClick={(event) => handleListItemClick(event, index)}
          >
            <ListItemAvatar>
              <Avatar sx={{ color: "#2e81f4", background: "none" }}>
                {item.logo}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              sx={{ fontWeight: "600", color: "black" }}
            />
          </ListItem>
        ))}

        <ListItemButton sx={{ ...sidebarIconStyle }} onClick={handleClick}>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar sx={{ color: "#2e81f4", background: "none" }}>
                <ExpandMoreIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary="Expand More" />
          {open ? <ExpandLess /> : <ExpandMoreIcon />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <List>
              <ListItem
                sx={{ ...sidebarIconStyle }}
                component={Link}
                to={Path.UserFriend} 
                selected={selectedIndex === data.length}
                onClick={(event) => handleListItemClick(event, data.length)}
              >
                <ListItemAvatar>
                  <Avatar sx={{ color: "#2e81f4", background: "none" }}>
                    <GroupsRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: "600", color: "black" }}
                  primary="Groups"
                />
              </ListItem>
              <ListItem sx={{ ...sidebarIconStyle }}>
                <ListItemAvatar>
                  <Avatar sx={{ color: "#2e81f4", background: "none" }}>
                    <DeleteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: "600", color: "black" }}
                  primary="Delete"
                />
              </ListItem>
            </List>
          </Slide>
        </Collapse>

        <Divider />

        <ListItem sx={{ ...sidebarIconStyle }} onClick={handleLogout}>
          <ListItemAvatar>
            <Avatar sx={{ background: "none" }}>
              <LogoutIcon sx={{ color: "#2e81f4" }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="LogOut" sx={{ color: "black" }} />
        </ListItem>
      </List>
      <Typography sx={{ marginTop: "3rem", marginLeft: "1rem" }}>
        <img src={fbImgLogo} height={40} alt="fb logo" />
      </Typography>
    </React.Fragment>
  );
};

export default SidebarIcons;
