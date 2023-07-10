import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import { getAvatarImage, getUserMutual } from "../../services/Response";
import { getUserRequestRespond } from "../../services/Response";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
interface Friend {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  fromUserId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
type FriendListProps = {
  receivcefriends: Friend;
  sx?: React.CSSProperties;
};
const ReceiveReq: React.FC<FriendListProps> = ({ receivcefriends, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [receivcefriend, setreceiveFriend] = useState<
    { friend: Friend; length: number }[]
  >([]);

  console.log("hii", receivcefriends);
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(receivcefriends.fromAvatar);
      setAvatar(avatarUrl);
    };
    getAvatar();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 100, receivcefriends.fromUserId);
        console.log(response);
        if (Array.isArray(response.records)) {
          const data = response.records;
          console.log(data);
          const updatedData = await Promise.all(
            data.map(async (receivcefriends: Friend) => {
              console.log(receivcefriends);
              let avatarUrl = null;
              if (receivcefriends.avatar) {
                avatarUrl = await getAvatarImage(receivcefriends.avatar);
                console.log(avatarUrl);
              }
              return { ...receivcefriends, avatarUrl };
            })
          );
          console.log(updatedData);
          setreceiveFriend(
            updatedData.map((friend) => ({
              friend,
              length: updatedData.length - 1,
            }))
          );

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
              src={avatar ? avatar : receivcefriends.fromUserName}
            />
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
              {receivcefriends.fromUserName}
            </Typography>

            <Box sx={{ display: "flex", marginTop: "0.3rem" }}>
              {receivcefriend.slice(0, 3).map((friend, index) => (
                <Avatar
                  key={index}
                  src={friend.friend.avatarUrl}
                  sx={{
                    border: "2px solid white",
                    zIndex: 100 - index,
                    marginLeft: `${index * -12}px`,
                    position: "relative",
                  }}
                />
              ))}

              {receivcefriend.length > 0 ? (
                <Typography
                  sx={{
                    fontSize: ["12px", "15px"],
                    color: "gray",
                    marginTop: "0.5rem",
                  }}
                >
                  {`${receivcefriend[0].friend.firstName} ${receivcefriend[0].friend.lastName}`}
                  {receivcefriend.length > 1
                    ? ` and ${receivcefriend.length - 1} other mutual friend${
                        receivcefriend.length !== 2 ? "s" : ""
                      }`
                    : " is a mutual friend"}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: ["12px", "15px"],
                    color: "gray",
                    marginTop: "0.5rem",
                  }}
                >
                  No mutual friends
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </List>
    </React.Fragment>
  );
};

export default ReceiveReq;
