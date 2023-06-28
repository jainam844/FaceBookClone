import { useEffect, useState, useContext } from "react";
import { getUserNotification } from "../../services/Response";
import UserContext from "../Context/UserContext";
import { Box } from "@mui/material";
import NotificationItem from "./NotificationDat";
import Grid from "@mui/material/Grid";

interface Notification extends NotificationData {
  byUser?: string;
}

interface NotificationData {
  notificationId: number;
  activityType: number;
  activityId: number;
  activityTypeName: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { userData } = useContext(UserContext);

  useEffect(() => {
    const getAllNotification = async () => {
      try {
        const notificationData = await getUserNotification(userData.userId);
        setNotifications(notificationData);
      } catch (e) {
        console.log(e);
      }
    };
    if (userData.userId) {
      getAllNotification();
    }
  }, [userData.userId]);

  return (
    <>
      <h1>Notifications</h1>

      <Grid container spacing={2}>
        {notifications.map((notification, index) => (
          <Grid item xs={12} sm={6} key={notification.notificationId}>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "16px",
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                gap: "12px",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: "#F0F8FF",
                },
              }}
            >
              <NotificationItem notification={notification} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Notification;
