import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import FriendList from "./FriendList";
import { getUserRequest } from "../../services/Response";

export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}

export enum RequestType {
  Sent = 1,
  Received = 2,
}

const Friend = () => {
  const [friends, setFriends] = useState([]);

  const subGridStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid lightgray",
  };

  const mainGridStyle = {
    background: "white",
    borderRadius: 2,
    padding: 2,
    marginBottom: 3,
  };

  const buttonStyle = {
    background: "#e5e5e5",
    color: "black",
    borderRadius: 5,
    "&:hover": {
      background: "#c9c7c7",
    },
    margin: 2,
    padding: "5px 10px",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          10,
          FilterStatus.PENDING,
          RequestType.Received
        );
        console.log(response.records);
        setFriends(response.records);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        // maxHeight: '100vh'  ,
        paddingTop: [0, 2],
        margin: ["0", "0 30px"],
      }}
    >
      <Box
        sx={{
          background: ["white", "transparent"],
          borderRadius: [0, 3],
          padding: "20px 0",
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
            <Button sx={buttonStyle}>
              <Typography sx={{ textTransform: "none" }}>
                Suggestions
              </Typography>
            </Button>
            <Button sx={buttonStyle}>
              <Typography sx={{ textTransform: "none" }}>
                Your Friends
              </Typography>
            </Button>
          </Grid>
        </Grid>

        {friends.map((friend) => (
          <FriendList friend={friend} />
        ))}
      </Box>
    </Box>
  );
};

export default Friend;
