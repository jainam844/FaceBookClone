import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FriendListSent from "./FriendListSent";
import FriendList from "./FriendList";
import { getUserRequest } from "../../services/API/UserREquestApi"; 
import { FilterStatus, RequestStatus } from "../Utils/Path";
import { RequestType } from "../Utils/Path";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const FriendBox = () => {
  const [friends, setFriends] = useState([]);
  const [sentFriends, setSentFriends] = useState([]);
  const [value, setValue] = React.useState(0);
  const sentCount = sentFriends.length;
  const requestCount = friends.length;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          1,
          100,
          FilterStatus.PENDING,
          value === 0 ? RequestType.Sent : RequestType.Received
        );

        if (value === 0) {
          setSentFriends(response.records);
     
        } else {
          setFriends(response.records);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, [value]);

  return (
    <>

      <Box
        sx={{
          padding: 0,
          margin: "0",
          width: ["100%", "100%", "67vw"],
          maxWidth: ["100%", "100%", "100%"],
        }}
      >
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
                <Grid item xs={12} sm={6} md={12} lg={4}>
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
                <Grid item xs={12} sm={6} md={12} lg={4}>
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
