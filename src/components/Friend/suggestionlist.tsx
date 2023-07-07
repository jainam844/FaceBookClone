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
import { getAvatarImage } from "../../services/Response";
import defaultimg from "../../assets/images.jpg";
interface Friend {
  firstName: string;
  lastName: string;
  avatar: string;
  requestId: number;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
};
const Suggestionlist: React.FC<FriendListProps> = ({ friend, sx }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.avatar);

      setAvatar(avatarUrl);
    };
    getAvatar();
  }, []);
  const handleConfirm = async () => {
    try {
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
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ marginBottom: "1rem", maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="300"
            image={avatar !== null ? avatar : defaultimg}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {friend.firstName} {friend.lastName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                marginTop: "0.8rem",
                alignItems: "center",
              }}
            >
              <Avatar
                // src={avatar ? avatar : undefined}
                sx={{
                  border: "2px solid white",
                  zIndex: 100,
                  width: 30,
                  height: 30,
                  marginLeft: "-15px",
                }}
              />{" "}
              <Avatar
                // src={avatar ? avatar : undefined}
                sx={{
                  border: "2px solid white",
                  zIndex: 100,
                  width: 30,
                  height: 30,
                  marginLeft: "-15px",
                }}
              />{" "}
              <Avatar
                // src={avatar ? avatar : undefined}
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
          </CardContent>

          <Box
            sx={{
              marginTop: "0.8rem",
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ borderRadius: "5px", width: "100%" }}
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
                  Remove
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    </React.Fragment>
  );
};
export default Suggestionlist;
