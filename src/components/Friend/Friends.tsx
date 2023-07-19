import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import { Path } from "../Utils/Path";

const Friend = () => {
  const [activeButton, setActiveButton] = useState(Path.Friend);
  const subGridStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e0e0e0",
    padding: "10px 20px",
  };

  const mainGridStyle = {
    background: "white",
    borderRadius: 8,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: 10,
  };

  const buttonStyle = {
    color: "gray",
    margin: { xs: "0rem 0.3rem", sm: "0rem 0.3rem", xl: "0.5rem 1rem" },
    padding: { xs: "0.5rem 0.5rem", sm: "0.5rem 0.5rem", xl: "1rem 1rem" },
    "&:hover": {
      color: "#1571f3",
    },
  };
  const activeButtonStyles = {
    borderBottom: "2px solid #2e81f4",
    color: "#2e81f4",
  };

  return (
    <Box
      sx={{
        paddingTop: [0, 5],
        margin: ["0", "0 30px"],
      }}
    >
      <Box
        sx={{
          background: ["white", "transparent"],
          borderRadius: [0, 12],
          padding: ["10px 0", "20px 0"],
        }}
      >
        <Grid sx={mainGridStyle}>
          <Grid sx={subGridStyle}>
            <Typography variant="h5" color="initial">
              Friends
            </Typography>
            <IconButton>
              <Avatar>
                <SearchIcon />
              </Avatar>
            </IconButton>
          </Grid>
          <Grid>
            <Button
              sx={{
                ...buttonStyle,
                ...(activeButton === Path.Friend && activeButtonStyles),
              }}
              component={RouterLink}
              to={Path.Friend}
              onClick={() => setActiveButton(Path.Friend)}
            >
              <Typography sx={{ textTransform: "none" }}>Friend</Typography>
            </Button>
            <Button
              sx={{
                ...buttonStyle,
                ...(activeButton === Path.Suggestion && activeButtonStyles),
              }}
              component={RouterLink}
              to={Path.Suggestion}
              onClick={() => setActiveButton(Path.Suggestion)}
            >
              <Typography sx={{ textTransform: "none" }}>
                Suggestions
              </Typography>
            </Button>
            <Button
              sx={{
                ...buttonStyle,
                ...(activeButton === Path.YourFriend && activeButtonStyles),
              }}
              component={RouterLink}
              to={Path.YourFriend}
              onClick={() => setActiveButton(Path.YourFriend)}
            >
              <Typography sx={{ textTransform: "none" }}>
                Your Friends
              </Typography>
            </Button>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Outlet />{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default Friend;
