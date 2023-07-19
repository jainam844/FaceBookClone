import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Grid from "@mui/material/Grid";
import { getUserMutual } from "../../services/API/UserDataApi";
import { getAvatarImage } from "../../services/API/AccountApi";
import { getUserRequestRespond } from "../../services/API/UserREquestApi";
import CardMedia from "@mui/material/CardMedia";
import defaultimg from "../../assets/images.jpg";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import { RequestStatus } from "../Utils/Path";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Friend {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  avatar: string;
  toUserId: number;
  fromUserId: number;
}

type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const FriendList: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.fromAvatar);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
    };
    getAvatar();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 100, friend.fromUserId);

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
          // setAvatar(avatarUrl);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchData();
  }, []);
  const handleConfirm = async () => {
    try {
      const response = await getUserRequestRespond(friend.requestId, true);
      toast.success(RequestStatus.ACCEPTED);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await getUserRequestRespond(friend.requestId, false);
      toast.error(RequestStatus.REJECTED);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
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
          image={avatar || (friend && friend.fromAvatar) || defaultimg}
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
            {friend.fromUserName}
          </Typography>
          {friends.length > 0 ? (
            <>
              <Divider sx={{ marginTop: "0.3rem", marginBottom: "0.5rem" }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "0.3rem",
                }}
              >
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
                      marginLeft: "0.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {`${friends[0].firstName} ${friends[0].lastName}`}{" "}
                    {friends.length > 1
                      ? `and ${friends.length - 1} other mutual friend${
                          friends.length !== 2 ? "s" : ""
                        }`
                      : "is a mutual friend"}
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
          <Box sx={{ marginTop: "0.8rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
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
                  onClick={handleConfirm}
                >
                  Confirm
                  <HowToRegIcon sx={{ marginLeft: "1rem", color: "white" }} />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  sx={{
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
                  onClick={handleDelete}
                >
                  Delete
                  <PersonRemoveIcon sx={{ marginLeft: "1rem" }} />
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default FriendList;
