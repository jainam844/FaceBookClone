import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import FriendList from "./FriendList";
import { getUserRequest } from "../../services/Response";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// import * as React from 'react';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FriendListSent from "./FriendListSent";
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}

export enum RequestType {
  Sent = 1,
  Received = 2,
}

export const FriendBox = () => {
  const [friends, setFriends] = useState([]);
  const [sentFriends, setSentFriends] = useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const subGridStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid lightgray",
  };

  // const mainGridStyle = {
  //   // width: "67vw",
  //   borderRadius: 2,
  //   padding: 2,
  //   marginBottom: 3,
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          100,
          FilterStatus.PENDING,
          RequestType.Sent
        );
        // console.log(response.records);
        setSentFriends(response.records);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          100,
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
  const sentCount = sentFriends.length;
  const requestCount = friends.length;

  return (
    <>
      <Box
        sx={{
          paddingTop: 0,
          marginTop: 0,
          margin: "0 30px",
          width: "67vw",
        }}
      >
        {/* <Grid sx={mainGridStyle}> */}
          {/* <Grid sx={subGridStyle}>
            <Typography variant="h5" color="initial">
              Friends
            </Typography>
          </Grid> */}
        {/* </Grid> */}

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={`Sent (${sentCount})`} {...a11yProps(0)} />
              <Tab label={`Received (${requestCount})`} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Grid container spacing={2} justifyContent="start">
              {sentFriends.map((sentfriends) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <FriendListSent
                    friend={sentfriends}
                    sx={{ width: "calc(33% - 1rem)" }}
                  />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Grid container spacing={2} justifyContent="start">
              {friends.map((friend) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <FriendList
                    friend={friend}
                    sx={{ width: "calc(33% - 1rem)" }}
                  />
                </Grid>
              ))}
            </Grid>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
};
