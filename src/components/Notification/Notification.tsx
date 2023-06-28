import { useEffect, useState, useContext } from "react";
import {
  getUserNotification,
  getCommentNotification,
  getLikeNotification,
} from "../../services/Response";
import UserContext from "../Context/UserContext";
import { Box } from "@mui/material";
import NotificationItem from "./NotificationDat";

enum NotificationType {
  Comment = "CommentOnPost",
  PostLike = "PostLike",
}

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

        const updatedNotificationData = await Promise.all(
          notificationData.map(async (notification: Notification) => {
            switch (notification.activityTypeName) {
              case NotificationType.Comment:
                try {
                  const getNotifData = await getCommentNotification(
                    notification.activityId
                  );

                  notification.byUser = getNotifData.userName;
                } catch (error) {
                  console.log(error);
                }
                break;
              case NotificationType.PostLike:
                try {
                  const getLikeNotif = await getLikeNotification(
                    notification.activityId
                  );

                  notification.byUser = getLikeNotif.userName;
                } catch (error) {
                  console.log(error);
                }
                break;
              default:
                break;
            }
            return notification;
          })
        );

        console.log(updatedNotificationData);
        setNotifications(updatedNotificationData);
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

      {notifications.map((notification) => (
        <Box
          key={notification.notificationId}
          sx={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "16px",
            marginBottom: "16px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "background-color 0.3s",
            "&:hover": {
              backgroundColor: "#ebebeb",
            },
          }}
        >
          <NotificationItem notification={notification} />
        </Box>
      ))}
    </>
  );
};

export default Notification;
