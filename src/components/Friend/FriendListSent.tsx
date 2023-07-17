import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import ClearIcon from "@mui/icons-material/Clear";
import { getUserMutual } from "../../services/API/UserDataApi";
import { getUserCancelReq } from "../../services/API/UserREquestApi";
import { getAvatarImage } from "../../services/API/AccountApi";
import CardMedia from "@mui/material/CardMedia";
import defaultimg from "../../assets/images.jpg";
import DoneIcon from "@mui/icons-material/Done";
import { RequestStatus } from "../Utils/Path";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      setIsRequestCanceled(true); // Set the request canceled state to display the success message

      // Delay the execution of setIsVisible(false) by 3 seconds
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
      <ToastContainer />
      <Card
        sx={{
          background: "#f9f9f9",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: 345,
          margin: "1rem",
          padding: "1rem",
        }}
      >
        <CardMedia
          component="img"
           height="220"
          sx={{ borderRadius: "10px" }}
          image={
            avatar
              ? avatar
              : friend && friend.toAvatar
              ? friend.toAvatar
              : defaultimg
          }
        />
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {friend.toUserName}
          </Typography>

          {friends.length > 0 ? (
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

          <Box sx={{ marginTop: "0.8rem" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#f3212fbd;",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#fcc5c9ba",
                      color: "black",
                    },
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.7rem",
                    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
                  }}
                  onClick={() => handleDelete()}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      fontWeight: 500,
                      textTransform: "capitalize",
                      marginRight: "1rem",
                    }}
                  >
                    {isRequestCanceled
                      ? "Request canceled successfully"
                      : "Cancel Request"}
                  </Typography>
                  {isRequestCanceled ? <DoneIcon /> : <ClearIcon />}
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
