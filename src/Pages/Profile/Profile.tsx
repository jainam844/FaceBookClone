import React, { useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import UserContext from "../../components/Context/UserContext";
import { getUserRequest } from "../../services/API/UserREquestApi";
import ProfileHeader from "./ProfileHeader";
import { getAvatarImage } from "../../services/API/AccountApi";
import ProfileHeaderSection from "./ProfileImageSection";
import ProfileTabs from "./ProfileTabs";
import EditProfile from "./EditProfile";
import Header from "../../components/Header/Header";
import Box from "@mui/material/Box";
import HeaderIcons from "../../components/Header/HeaderIcons";
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
        settotalFriend(response.totalCount);

        const avatarPromises = response.records.map(
          async (friend: totalFriend) => {
            const avatarUrl = await getAvatarImage(friend.fromAvatar);
            return { ...friend, avatarUrl };
          }
        );
        const friendDataWithAvatar = await Promise.all(avatarPromises);
        console.log(response.totalCount);
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

        setFriends((prevRecords) => [...prevRecords, ...response.records]);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="header">
          <Header />

          <Box
            sx={{
              display: ["flex", "flex", "none"],
              boxShadow: ["0px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
              justifyContent: "center",
              margin: "0.1rem 0rem",
              backgroundColor: "white",
              padding: " 0.3rem 0.5rem",
              position: ["sticky", "sticky", "sticky"],
              top: 0,
              zIndex: 100,
            }}
          >
            <HeaderIcons />
          </Box>
        </div>
      </Box>
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
          userData={userData}
          friends={friends}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
