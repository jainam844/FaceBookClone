import React, { useState, useContext } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Collapse } from "@mui/material";
import { Slide } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import data from "./SidebarData";
import UserContext from "../Context/UserContext";

const SidebarIcons = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const userData = useContext(UserContext);
  console.log(typeof userData);
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
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          marginTop: "10px",
        }}
      >
        <ListItem sx={sidebarIconStyle} component={Link} to={"/layout/Profile"}>
          <ListItemAvatar>
            <Avatar src="https://source.unsplash.com/bh4LQHcOcxE/600x300" />
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
            to={item.route}
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
                to="/layout/home/userfriend"
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
    </React.Fragment>
  );
};

export default SidebarIcons;
