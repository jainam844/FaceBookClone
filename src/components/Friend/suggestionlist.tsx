import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { getAvatarImage } from "../../services/API/AccountApi";
import { getUserRequestSend } from "../../services/API/UserREquestApi";
import { getUserMutual } from "../../services/API/UserDataApi";
import defaultimg from "../../assets/images.jpg";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
interface Friend {
  firstName: string;
  lastName: string;
  avatar: string;
  requestId: number;
  userId: number;
  avatarUrl: string;
  toUserId: number;
  fromUserId: number;
}
type FriendListProps = {
  friend: Friend;
  sx?: React.CSSProperties;
  reference?: (node: HTMLDivElement) => void;
};
const Suggestionlist: React.FC<FriendListProps> = ({ friend, reference }) => {
  const [avatar, setAvatar] = useState<string | null>(null);

  const [friends, setFriends] = useState<Friend[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const getAvatar = async () => {
      const avatarUrl = await getAvatarImage(friend.avatar);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserMutual(1, 100, friend.userId);

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

  const handleConfirm = async () => {
    try {
      const response = await getUserRequestSend(friend.userId);
      console.log("API response:");
      setTimeout(() => {
        setIsVisible(false);
      }, 800);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log("Deleted friend with id:");
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
        ref={reference}
        sx={{
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          maxWidth: 345,
          margin: "1rem",
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
            sx={{ color: "black",   fontWeight: 700,}}
          >
            {friend.firstName} {friend.lastName}
          </Typography>

          {friends.length > 0 ? (
            <>
              <Divider sx={{ marginTop: "0.3rem", marginBottom: "0.5rem" }} />
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
        </CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "0.8rem",
            marginBottom: "1rem",
            marginX:'1rem'
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 600,
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
                <PersonAddAlt1Icon sx={{ marginLeft: "1rem" }} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  borderColor: "#DDDDDD",
                  fontWeight: 600,
                  color: "#202020",
                  width: "100%",
                  "&:hover": {
                    borderColor: "#999999",
                    color: "#554242",
                  },
                }}
                onClick={() => handleDelete()}
              >
                Remove Friend
                <PersonRemoveIcon sx={{ marginLeft: "2rem" }} />
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </React.Fragment>
  );
};
export default Suggestionlist;
