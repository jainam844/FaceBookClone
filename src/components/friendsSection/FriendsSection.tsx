import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import parentBoxStyle from "../commonStyle/Style";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import FrndReqCard from "./FrndReqCard";
import FrndReqGridMob from "./FrndReqGridMob";

const FriendsSection: React.FC = () => {
  const childBoxStyle: React.CSSProperties = {
    background: ["white", "transparent"],
    borderRadius: [0, 3],
    padding: "20px 0",
  };

  const parentGridStyle: React.CSSProperties = {
    padding: 2,
    background: "white",
    borderRadius: 2,
    marginBottom: [0, 3],
  };

  const subGridStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid lightgray",
  };

  const buttonStyle: React.CSSProperties = {
    background: "#e5e5e5",
    color: "black",
    borderRadius: 5,
    "&:hover": {
      background: "#c9c7c7",
    },
    margin: [1, 2],
    padding: "5px 10px",
  };

  const actionTextStyle: React.CSSProperties = {
    textTransform: "none",
  };

  const reqParentGridStyle: React.CSSProperties = {
    padding: 2,
    background: "white",
    borderRadius: 2,
    marginBottom: 3,
  };

  const reqSubGridStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const reqHeadingStyle: React.CSSProperties = {
    paddingBottom: 1.5,
    fontSize: [18, 24],
    fontWeight: [700, "none"],
    marginRight: 2,
  };

  const reqCountStyle: React.CSSProperties = {
    background: "#f7dcdc",
    width: [25, 30],
    height: [25, 30],
    borderRadius: "50%",
    textAlign: "center",
    fontSize: [18, 22],
  };

  return (
    <React.Fragment>
      <Box sx={parentBoxStyle}>
        <Box sx={childBoxStyle}>
          <Grid sx={parentGridStyle}>
            <Grid sx={subGridStyle}>
              <Typography
                variant="h5"
                color="initial"
                sx={{ fontSize: [18, 24], fontWeight: [700, "none"] }}
              >
                Friends
              </Typography>
              <IconButton>
                <Avatar sx={{ width: [30, 40], height: [30, 40] }}>
                  <SearchIcon />
                </Avatar>
              </IconButton>
            </Grid>
            <Grid sx={{ paddingTop: 2 }}>
              <Button sx={buttonStyle}>
                <Typography sx={actionTextStyle}>Suggestions</Typography>
              </Button>
              <Button sx={buttonStyle}>
                <Typography sx={actionTextStyle}>Your friends</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid sx={reqParentGridStyle}>
            <Grid
              sx={{
                borderBottom: "1px solid lightgray",
              }}
            >
              <Grid item sx={reqSubGridStyle}>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="h5" color="initial" sx={reqHeadingStyle}>
                    Friend requests
                  </Typography>
                  <Typography variant="h5" color="red" sx={reqCountStyle}>
                    2
                  </Typography>
                </Box>
                <Typography sx={{ color: "#1877f2", cursor: "pointer" }}>
                  See all
                </Typography>
              </Grid>
            </Grid>
            <Grid sx={{ margin: "30px 0 0", padding: "0 10px" }}>
              <Grid container justifyContent="start" spacing={2}>
                <FrndReqCard />
                <FrndReqGridMob sx={{ display: ["flex", "none"] }} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default FriendsSection;
