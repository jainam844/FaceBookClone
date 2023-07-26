import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Grid from "@mui/material/Grid";
import UserContext from "../../components/Context/UserContext";
import { getUserRequest } from "../../services/API/UserREquestApi";
import ProfileHeader from "./ProfileHeader";
import { getAvatarImage } from "../../services/API/AccountApi";
import ProfileHeaderSection from "./ProfileImageSection";
import { getPostByUserId } from "../../services/API/SocialActivityApi";
import { Ipost, PostClass } from "../../Models/Post";
import ProfileTabs from "./ProfileTabs";
import EditProfile from "./EditProfile";

interface totalFriend {
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

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [avatarRecords, setAvatarRecords] = useState<any[]>([]);
  const [totalFriend, settotalFriend] = useState<totalFriend[]>([]);
  const [value, setValue] = React.useState(0);
  const [friends, setFriends] = useState<totalFriend[]>([]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(1, 100, 1, 0);

        const avatarPromises = response.records.map(
          async (friend: totalFriend) => {
            const avatarUrl = await getAvatarImage(friend.fromAvatar);
            return { ...friend, avatarUrl };
          }
        );

        const friendDataWithAvatar = await Promise.all(avatarPromises);

        settotalFriend(response.totalCount);
        setAvatarRecords(friendDataWithAvatar);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserRequest(1, 100, 1, 0);
        console.log(response);
        setFriends((prevRecords) => [...prevRecords, ...response.records]);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

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
    <React.Fragment>
      <Grid container sx={{ maxHeight: "100vh" }}>
        <Grid item xs={12} sm={12} md={9} sx={{ margin: "auto" }}>
          <ProfileHeader />
          <Grid container alignItems="center">
            <ProfileHeaderSection
              totalFriend={totalFriend}
              avatarRecords={avatarRecords}
            />
            <Grid
              item
              xs={12}
              sm={12}
              md={5}
              lg={12}
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row"],
                justifyContent: ["center", "center", "flex-end"],
                alignItems: ["center", "center", "flex-end"],
              }}
            >
              <EditProfile userData={userData} />
            </Grid>
          </Grid>
        </Grid>
        <ProfileTabs
          value={value}
          handleChange={handleChange}
          postData={postData}
          loading={loading}
          userData={userData}
          lastPostRef={lastPostRef}
          removeDeletedPost={removeDeletedPost}
          friends={friends}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
