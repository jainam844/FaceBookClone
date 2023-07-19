import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { getAvatarImage } from "../../services/API/AccountApi"; 
import { getUserMutual } from "../../services/API/UserDataApi";
interface Friend {
  toUserName: string;
  toAvatar: string;
  requestId: number;
  toUserId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const SentReq: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [friends, setFriends] = useState<Friend[]>([]);

  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.toAvatar);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 100, friend.toUserId);

        if (Array.isArray(response.records)) {
          const data = response.records;

          const updatedData = await Promise.all(
            data.map(async (friend: Friend) => {
              console.log(friend);
              let avatarUrl = null;
              if (friend.avatar) {
                avatarUrl = await getAvatarImage(friend.avatar);
              }
              return { ...friend, avatarUrl };
            })
          );

          setFriends(updatedData);
          // setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <List>
        <Grid
          container
          spacing={2}
          columns={16}
          sx={{ margin: "20px 0", padding: ["10px", 0] }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ width: [70, 80], height: [70, 80] }}
              src={avatar ? avatar : friend.toUserName}
            ></Avatar>
          </Grid>
          <Grid
            item
            xs={12}
            sm={9}
            md={9}
            lg={5}
            sx={{
              display: "flex",
              justifyContent: ["center", "flex-start"],
              alignItems: "center",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <Typography
              color="initial"
              sx={{ fontSize: [14, 18], fontWeight: 700, marginTop: 0.5 }}
            >
              {friend.toUserName}
              <Box sx={{ display: "flex", marginTop: "0.3rem" }}>
                {friends.slice(0, 3).map((friend, index) => (
                  <Avatar
                    key={index}
                    src={friend.avatarUrl}
                    sx={{
                      border: "2px solid white",
                      zIndex: 100 - index,
                      marginLeft: `${index * -12}px`,
                      position: "relative",
                    }}
                  />
                ))}

                {friends.length > 0 && (
                  <Typography
                    sx={{
                      fontSize: ["12px", "15px"],
                      color: "gray",
                      marginTop: "0.5rem",
                    }}
                  >
                    {`${friends[0].firstName} ${friends[0].lastName}`}
                    {friends.length > 1
                      ? ` and ${friends.length - 1} other mutual friend${
                          friends.length !== 2 ? "s" : ""
                        }`
                      : " is a mutual friend"}
                  </Typography>
                )}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </List>
    </React.Fragment>
  );
};

export default SentReq;
