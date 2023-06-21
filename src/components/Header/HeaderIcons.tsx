import React from "react";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StorefrontIcon from "@mui/icons-material/Storefront";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";

const commonButtonStyles = {
  color: "gray",
  margin: { xs: "0rem 0.3rem", sm: "0rem 0.3rem", xl: "0.5rem 1rem" },
  padding: { xs: "0.5rem 0.5rem", sm: "0.5rem 0.5rem", xl: "1rem 1rem" },
  "&:hover": {
    color: "#2e81f4",
  },
};

const activeButtonStyles = {
  borderBottom: "2px solid #2e81f4",
  color: "#2e81f4",
};

const HeaderIcons: React.FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === "/layout/home/feed"
            ? activeButtonStyles
            : {}),
        }}
        component={Link}
        to="/layout/home/feed"
      >
        <HomeIcon sx={{ fontSize: "1.8rem" }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === "/layout/home/flag"
            ? activeButtonStyles
            : {}),
        }}
        component={Link}
        to="/layout/home/flag"
      >
        <FlagIcon sx={{ fontSize: "1.8rem" }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === "/layout/home/subscription"
            ? activeButtonStyles
            : {}),
        }}
        component={Link}
        to="/layout/home/subscription"
      >
        <SubscriptionsIcon sx={{ fontSize: "1.8rem" }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === "/layout/home/marketplace"
            ? activeButtonStyles
            : {}),
        }}
        component={Link}
        to="/layout/home/marketplace"
      >
        <StorefrontIcon sx={{ fontSize: "1.8rem" }} />
      </Button>

      <Button
        sx={{
          ...commonButtonStyles,
          ...(location.pathname === "/layout/home/userfriend"
            ? activeButtonStyles
            : {}),
        }}
        component={Link}
        to="/layout/home/userfriend"
      >
        <GroupsRoundedIcon sx={{ fontSize: "1.8rem" }} />
      </Button>
    </React.Fragment>
  );
};

export default HeaderIcons;
