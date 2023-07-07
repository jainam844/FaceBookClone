import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { getAvatarImage, getUserRequestSend } from "../../services/Response";
import defaultimg from "../../assets/images.jpg";
interface Friend {
  firstName: string;
  lastName: string;
  avatar: string;
  requestId: number;
  userId:number;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const Suggestionlist: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  console.log("hello", friend);
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.avatar);

      setAvatar(avatarUrl);
    };
    getAvatar();
  }, []);
  const handleConfirm = async () => {
    try {
      const response = await getUserRequestSend(friend.userId);
      console.log("API response:");
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleted friend with id:");
    } catch (error) {
      console.error("API error:", error);
    }
  };

  return (
    <React.Fragment>
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
          alt="green iguana"
          height="220"
          image={avatar !== null ? avatar : defaultimg}
          sx={{ borderRadius: "10px" }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ color: "black", fontWeight: "bold" }}
          >
            {friend.firstName} {friend.lastName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "0.8rem",
            }}
          >
            <Avatar
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />
            <Avatar
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />
            <Avatar
              sx={{
                border: "2px solid white",
                zIndex: 100,
                width: 30,
                height: 30,
                marginLeft: "-15px",
              }}
            />
            <Typography
              sx={{ fontSize: "15px", color: "gray", marginLeft: "0.5rem" }}
            >
              Friends are Members
            </Typography>
          </Box>
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.8rem",
            marginBottom: "1rem",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "5px",
                  width: "100%",
                  background: "linear-gradient(to right, #6C63FF, #5850EC)",
                  color: "white",
                  "&:hover": {
                    background: "linear-gradient(to right, #5850EC, #6C63FF)",
                  },
                }}
                onClick={() => handleConfirm()}
              >
                Add Friend
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  borderColor: "#DDDDDD",
                  color: "#202020",
                  width: "100%",
                  "&:hover": {
                    borderColor: "#999999",
                    color: "#554242",
                  },
                }}
                onClick={() => handleDelete()}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </React.Fragment>
  );
};
export default Suggestionlist;
