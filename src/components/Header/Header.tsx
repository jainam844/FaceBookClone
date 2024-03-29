import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Drawer } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";
import fbImgLogo from "../../assets/BharatBook.png";
import SidebarIcons from "../Sidebar/sidebaricon";
import UserContext from "../Context/UserContext";
import HeaderIcons from "./HeaderIcons";
import { getUserNotification } from "../../services/API/NotificationApi";
import { Path } from "../Utils/Path";

export default function PrimarySearchAppBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const drawerContent = <SidebarIcons />;
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { userData, userimageUrl } = useContext(UserContext);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [relatedSuggestions, setRelatedSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const notificationData = await getUserNotification(pageNumber, 100);

        setNotificationsCount(notificationData.records.length);
      } catch (e) {
        console.log(e);
      }
    };

    if (userData.userId) {
      getAllNotification();
    }
  }, [userData.userId]);

  useEffect(() => {
    const predefinedSuggestions = [
      "notifications",
      "userfriend",
      "friend",
      "suggestion",
      "yourfriend",
    ];

    const trimmedQuery = searchQuery.trim().toLowerCase();

    if (trimmedQuery) {
      const filteredSuggestions = predefinedSuggestions.filter((suggestion) =>
        suggestion.includes(trimmedQuery)
      );
      setRelatedSuggestions(filteredSuggestions);
    } else {
      setRelatedSuggestions([]);
    }
  }, [searchQuery]);

  const styles = {
    suggestionList: {
      listStyle: "none",
      padding: "0",
      margin: "0",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      background: "#ffffff",
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
    },
    suggestionItem: {
      padding: "12px 16px",
      borderBottom: "1px solid #f0f0f0",
      color: "#333333",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    suggestionItemHover: {
      backgroundColor: "#f9f9f9",
    },
  } as const;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
    }
  };
  const handleSearch = (selectedSuggestion: string) => {
    const trimmedQuery = selectedSuggestion.trim().toLowerCase();
    setSearchQuery(trimmedQuery);
    setShowSuggestions(false);

    if (trimmedQuery === "notifications") {
      window.location.href = "/layout/home/Notification";
    } else if (trimmedQuery === "userfriend") {
      window.location.href = "/layout/home/userfriend";
    } else if (trimmedQuery === "friend") {
      window.location.href = "/layout/home/friend";
    } else if (trimmedQuery === "suggestion") {
      window.location.href = "/layout/home/friend/suggestion";
    } else if (trimmedQuery === "yourfriend") {
      window.location.href = "/layout/home/friend/yourfriend";
    } else {
      console.log("Invalid search query!");
    }

    setSearchQuery("");
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),

    border: `1px solid ${theme.palette.primary.main}`,
    marginLeft: 0,
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  const commonButtonStyles = {
    color: "gray",
    margin: { xs: "0rem 0.3rem", sm: "0rem 0.3rem", xl: "0.2rem 0.1rem" },
    padding: { xs: "0.5rem 0.5rem", sm: "0.5rem 0.5rem", xl: "0.1rem 0.5rem" },
    "&:hover": {
      color: "#2e81f4",
    },
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={notificationsCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Box sx={{}}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white", color: "black" }}
        >
          <Toolbar sx={{ marginTop: "4px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: ["flex", "flex", "none"] }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: ["none", "block"] }}
            >
              <Box sx={{ backgroundColor: "white", borderRadius: "20px" }}>
                <img src={fbImgLogo} height={40} alt="fb logo" />
              </Box>
            </Typography>

            <Search
              sx={{
                marginRight: "100px",
                borderRadius: "20px",
                border: "1px solid #000000",
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown} // Add keydown event listener
              />
            </Search>

            {showSuggestions && relatedSuggestions.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 90,
                  right: 0,
                  marginTop: "0rem",
                  padding: "0.5rem",

                  width: "200px",
                }}
              >
                <ul style={styles.suggestionList}>
                  {relatedSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      style={styles.suggestionItem}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: ["none", "none", "flex"] }}>
              <HeaderIcons />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                size="large"
                sx={{
                  display: ["none", "none", "none", "flex"],
                  ...commonButtonStyles,
                }}
                aria-label="show 17 new notifications"
                color="inherit"
              >
                {" "}
                <Avatar src={userimageUrl} />
                <Box
                  sx={{
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                    fontWeight: "600",
                    color: "black",
                    textDecoration: "none",
                  }}
                  component={Link}
                  to={Path.Profile}
                >
                  {userData.firstName + " " + userData.lastName}
                </Box>
              </Button>

              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Button
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
      <nav>
        <Drawer anchor={"left"} open={drawerOpen} onClose={handleDrawerToggle}>
          {drawerContent}
        </Drawer>
      </nav>
    </>
  );
}
