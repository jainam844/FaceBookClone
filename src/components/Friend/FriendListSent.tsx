import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getUserMutual } from "../../services/API/UserDataApi";
import { getUserCancelReq } from "../../services/API/UserREquestApi";
import { getAvatarImage } from "../../services/API/AccountApi";
import defaultimg from "../../assets/images.jpg";

interface Friend {
  toUserName: string;
  toAvatar: string;
  requestId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
  toUserId: number;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const FriendListSent: React.FC<FriendListProps> = ({ friend }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [isRequestCanceled, setIsRequestCanceled] = useState(false);
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
              let avatarUrl = null;
              if (friend.avatar) {
                avatarUrl = await getAvatarImage(friend.avatar);
              }
              return { ...friend, avatarUrl };
            })
          );

          setFriends(updatedData);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await getUserCancelReq(friend.requestId);
      setIsRequestCanceled(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <React.Fragment>
      <Card
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: 345,
          margin: "1rem",
        }}
      >
        <CardMedia
          component="img"
          height="220"
          sx={{ borderRadius: "10px 10px 0 0" }}
          image={avatar || friend?.toAvatar || defaultimg}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: 550,
            }}
          >
            {friend.toUserName}
          </Typography>

          {friends.length > 0 ? (
            <>
              <Divider sx={{ marginTop: "0.3rem", marginBottom: "0.5rem" }} />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {friends.slice(0, 3).map((friend, index) => (
                  <Avatar
                    key={index}
                    src={friend.avatarUrl}
                    sx={{
                      border: "2px solid white",
                      zIndex: 100 - index,
                      marginLeft: `${index * -12}px`,
                      width: 32,
                      height: 32,
                    }}
                  />
                ))}
                {friends.length > 0 && (
                  <Typography
                    sx={{
                      fontSize: ["12px", "15px"],
                      color: "gray",
                      ml: 1,
                      fontWeight: 700,
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
            </>
          ) : (
            <Typography
              sx={{
                fontSize: ["12px", "15px"],
                color: "gray",
                marginTop: "0.5rem",
                fontWeight: 700,
              }}
            >
              No mutual friends
            </Typography>
          )}

          <Box sx={{ marginTop: "1rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: isRequestCanceled
                      ? "#1fb72a"
                      : "#f52525b9",
                    color: "white",
                    "&:hover": {
                      backgroundColor: isRequestCanceled
                        ? "#6edf80"
                        : "#fcc5c9ba",
                      color: "black",
                    },
                    width: "100%",
                    borderRadius: "50px",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s ease, color 0.2s ease",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onClick={() => handleDelete()}
                >
                  {isRequestCanceled ? (
                    <span>
                      Request Canceled
                      <span
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(to right, #1fb72a, #6edf80)",
                          top: 0,
                          left: 0,
                          zIndex: -1,
                          opacity: 0.5,
                          transform: "translateX(-100%)",
                          transition: "transform 0.3s ease",
                        }}
                      ></span>
                    </span>
                  ) : (
                    <span>
                      Cancel Request
                      <span
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(to right, #f3212fbd, #fcc5c9ba)",
                          top: 0,
                          left: 0,
                          zIndex: -1,
                          opacity: 0.5,
                          transform: "translateX(-100%)",
                          transition: "transform 0.3s ease",
                        }}
                      ></span>
                    </span>
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default FriendListSent;
