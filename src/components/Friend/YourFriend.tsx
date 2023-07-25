import React, { useEffect, useState, useRef, useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getUserRequest } from "../../services/API/UserREquestApi";
import SentReq from "./sentreq";
import ReceiveReq from "./ReceiveReq";
import { FilterStatus } from "../Utils/Path";
import { RequestType } from "../Utils/Path";
import CircularProgress from "@mui/material/CircularProgress";

interface receive {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  fromUserId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
interface sent {
  toUserName: string;
  toAvatar: string;
  requestId: number;
  toUserId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => (
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const YourFriend = () => {
  const [value, setValue] = React.useState(0);
  const [friends, setFriends] = useState<sent[]>([]);
  const [receivcefriends, setreceiveFriends] = useState<receive[]>([]);

  const SentrequestCount = friends.length;
  const ReceiverequestCount = receivcefriends.length;

  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const pageSize = 10;
  const [hasMore, setHasMore] = useState<boolean>(false);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastSuggestionListRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          pageNumber,
          pageSize,
          FilterStatus.ACCEPTED,
          RequestType.Sent
        );

        setFriends((prevRecords) => [...prevRecords, ...response.records]);
        setHasMore(response.records.length > 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(
          pageNumber,
          pageSize,
          FilterStatus.ACCEPTED,
          RequestType.Received
        );

        setreceiveFriends((prevRecords) => [
          ...prevRecords,
          ...response.records,
        ]);
        setHasMore(response.records.length > 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label={`Sent (${SentrequestCount})`} {...a11yProps(0)} />

            <Tab
              label={`Received (${ReceiverequestCount})`}
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          {friends.map((friend, index) => (
            <React.Fragment key={index}>
              <SentReq
                friend={friend}
                sx={{ width: "calc(33% - 1rem)" }}
                reference={lastSuggestionListRef}
              />
              {index !== friends.length - 1 && (
                <hr style={{ borderTop: "1px solid #b8b8b8" }} />
              )}
            </React.Fragment>
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {receivcefriends.length > 0 ? (
            receivcefriends.map((friend, index) => (
              <React.Fragment key={index}>
                <ReceiveReq
                  receivcefriends={friend}
                  reference={lastSuggestionListRef}
                  sx={{ width: "calc(33% - 1rem)" }}
                />
                {index !== receivcefriends.length - 1 && (
                  <hr style={{ borderTop: "1px solid #b8b8b8" }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <Typography>No received friends</Typography>
          )}
        </CustomTabPanel>
      </Box>
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
    </>
  );
};
export default YourFriend;
