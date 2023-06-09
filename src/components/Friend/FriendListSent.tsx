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
import {
  getAvatarImage,
  getUserCancelReq,
  getUserMutual,
} from "../../services/Response";
import { getUserRequestRespond } from "../../services/Response";
import CardMedia from "@mui/material/CardMedia";
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
const FriendListSent: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);

  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.toAvatar);
      if(avatarUrl){
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


    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: "1rem", maxWidth: 345 ,minHeight:'400px' }}>
        <CardMedia
          component="img"
          height="194"
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
                  variant="outlined"
                  sx={{
                    borderRadius: "5px",
                    borderColor: "gray",
                    color: "white",
                    backgroundColor: "gray",
                    "&:hover": {
                      backgroundColor: "darkgray",
                      borderColor: "gray",
                    },
                    width: "100%",
                  }}
                  onClick={() => handleDelete()}
                >
                  Cancel Request
                  <ClearIcon sx={{ marginLeft: "1rem" }} />
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
