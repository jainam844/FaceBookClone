import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { getAvatarImage, getUserCancelReq } from "../../services/Response";
import { getUserRequestRespond } from "../../services/Response";
import CardMedia from "@mui/material/CardMedia";
import defaultimg from "../../assets/images.jpg";
interface Friend {
  toUserName: string;
  toAvatar: string;
  requestId: number;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const FriendListSent: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  console.log("hii", friend);
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.toAvatar);
      console.log(friend.toAvatar);
      setAvatar(avatarUrl);
    };
    getAvatar();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await getUserCancelReq(friend.requestId);

      console.log("Deleted friend with id:", response);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <React.Fragment>
      <Card sx={{ marginBottom: "1rem", maxWidth: 345 }}>
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
          <Box
            sx={{
              display: "flex",
              marginTop: "0.8rem",
              alignItems: "center",
            }}
          >
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />{" "}
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />{" "}
            <Avatar
              src={avatar ? avatar : undefined}
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />
            <Typography sx={{ fontSize: "15px", color: "gray" }}>
              Friend are Members
            </Typography>
          </Box>
          <Box sx={{ marginTop: "0.8rem" }}>
            <Grid container spacing={1}>
              {/* <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "5px", width: "100%" }}
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </Button>
              </Grid> */}
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
