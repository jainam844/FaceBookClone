import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import DisplayPost from "../../components/Section/DisplayPost/DisplayPost";
import TotalFriend from "./TotalFriend";
import { Ipost, PostClass } from "../../Models/Post";
import { UserData } from "../../Models/User";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { getPostByUserId } from "../../services/API/SocialActivityApi";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface Friend {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  fromUserId: number;
  isFriend: boolean;
  isRejected: boolean;
  requestType: string;
  RequestType1: string;
  status: string;
  avatarUrl: string;
  toUserName: string;
  createdAt: string;
  toUserId: number;
  toAvatar: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface Props {
  value: number;

  handleChange: (event: React.SyntheticEvent, newValue: number) => void;

  userData: UserData;

  friends: Friend[];
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
const ProfileTabs: React.FC<Props> = ({
  value,
  handleChange,
  userData,
  friends,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageSize = 10;
  const [postData, setPostData] = useState<Ipost[]>([]);

  const [newPost, setNewPost] = useState<Ipost>(new PostClass());
  const onChangePost = (post: Ipost) => {
    setNewPost(post);
  };
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
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

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await getPostByUserId(pageNumber, pageSize, true);

        if (Array.isArray(response.records)) {
          const data: Ipost[] = response.records;
          const updatedData = await Promise.all(
            data.map(async (post) => {
              return { ...post };
            })
          );

          setPostData((prevData) => [...prevData, ...updatedData]);

          setHasMore(response.records.length > 0);
          setLoading(false);
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };

    fetchPosts();
  }, [pageNumber]);

  const removeDeletedPost = (postId: number) => {
    setPostData((prevData) =>
      prevData.filter((post) => post.postId !== postId)
    );
  };

  useEffect(() => {
    if (newPost.postId) {
      setPostData((prevData) => [newPost, ...prevData]);
    }
  }, [newPost]);

  return (
    <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Post" {...a11yProps(0)} />
            <Tab label="About" {...a11yProps(1)} />
            <Tab label="Friends" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ flex: "1", width: "100%" }}>
            {postData.map((post, index) => {
              if (postData.length === index + 1) {
                return (
                  <DisplayPost
                    key={post.postId}
                    post={post}
                    reference={lastPostRef}
                    onClearPost={removeDeletedPost}
                  />
                );
              } else {
                return (
                  <DisplayPost
                    key={post.postId}
                    post={post}
                    onClearPost={removeDeletedPost}
                  />
                );
              }
            })}
            {loading && (
              <CircularProgress sx={{ display: "block", margin: "auto" }} />
            )}
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Hi I m {userData.firstName + " " + userData.lastName}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {friends.map((friend, index) => (
            <React.Fragment key={index}>
              <TotalFriend
                friend={friend}
                RequestType={friends.requestType}
                sx={{ width: "calc(33% - 1rem)" }}
              />
              {index !== friends.length - 1 && (
                <hr style={{ borderTop: "1px solid #b8b8b8" }} />
              )}
            </React.Fragment>
          ))}
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};

export default ProfileTabs;
