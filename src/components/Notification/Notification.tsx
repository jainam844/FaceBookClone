import { useEffect, useState, useContext } from "react";
import {
  getClearAllNotification,
  getUserNotification,
} from "../../services/Response";
import UserContext from "../Context/UserContext";
// import NotificationItem from "./NotificationDat";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NotificationItem from "./NotificationDat";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
interface Notification extends NotificationData {
  byUser?: string;
}

interface NotificationData {
  notificationId: number;
  activityType: number;
  activityId: number;
  activityTypeName: string;
  isRead: number;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { userData } = useContext(UserContext);
  const subGridStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid black",
  };

  const mainGridStyle = {
    // background: "white",
    borderRadius: 2,
    padding: 2,
    marginBottom: 3,
  };

  const handleClearNotification = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.notificationId !== notificationId
      )
    );
  };

  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const notificationData = await getUserNotification(1, 30);

        // Reorder the notifications based on the "isRead" property
        const sortedNotifications = [...notificationData.records];
        sortedNotifications.sort((a, b) => a.isRead - b.isRead);

        setNotifications(sortedNotifications);
      } catch (e) {
        console.log(e);
      }
    };
    if (userData.userId) {
      getAllNotification();
    }
  }, [userData.userId]);
  const handleClearAllNotification = async () => {
    try {
      await getClearAllNotification();
      setNotifications([]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Box
        sx={{
          background: ["white", "transparent"],
          borderRadius: [0, 3],
          padding: "20px 0",
        }}
      >
        <Grid
          sx={{
            borderRadius: 2,
            padding: 2,
            marginBottom: 3,
            background: "white", // Uncomment this line if you want a white background
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid black",
              px: 2, // Adjust the left and right padding here
            }}
          >
            <Typography
              variant="h4"
              color="initial"
              sx={{ ml: "1rem" }} // Use shorthand property for margin left
            >
              Notifications
            </Typography>
            <Button
              onClick={handleClearAllNotification}
              sx={{
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#F0F8FF", // Remove the background color on hover
                  borderBottom: "none", // Remove the border on hover
                },
              }}
            >
              <Typography sx={{ mr: "5px", mt: "5px" }}>Clear All</Typography>
              <DeleteOutlineIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Grid>
        {notifications.map((notification) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid
              container
              key={notification.notificationId}
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "16px",
                backgroundColor: notification.isRead ? "#F0F8FF" : "#FFFFFF",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                gap: "12px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#F0F8FF",
                },
                width: "600px",
              }}
            >
              <NotificationItem
                onClearNotification={handleClearNotification}
                notification={notification}
                setNotifications={setNotifications} // Pass the setNotifications function as a prop
              />
            </Grid>
          </div>
        ))}
      </Grid>
    </>
  );
};

export default Notification;
