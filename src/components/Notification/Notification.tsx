import { useEffect, useState, useContext, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UserContext from "../Context/UserContext";
import NotificationItem from "./NotificationDat";
import { getClearAllNotification ,getUserNotification} from "../../services/API/NotificationApi";

interface Notification {
  notificationId: number;
  activityType: number;
  activityId: number;
  activityTypeName: string;
  isRead: number;
  createdAt: string;
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const { userData } = useContext(UserContext);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastNotificationRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);

    const getAllNotification = async () => {
      try {
        const notificationData = await getUserNotification(pageNumber, 100);

        const sortedNotifications = [...notificationData.records];
        sortedNotifications.sort((a, b) => a.isRead - b.isRead);

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...sortedNotifications,
        ]);

        setHasMore(sortedNotifications.length > 0);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    if (userData.userId) {
      getAllNotification();
    }
  }, [pageNumber, userData.userId]);

  const handleClearNotification = (notificationId: number) => {
    setNotifications((prevNotifications) => {
      const index = prevNotifications.findIndex(
        (notification) => notification.notificationId === notificationId
      );

      if (index !== -1) {
        const updatedNotifications = prevNotifications.filter(
          (_, i) => i !== index
        );

        updatedNotifications.push(prevNotifications[index]);

        return updatedNotifications;
      }

      return prevNotifications;
    });
  };  
  


  const handleDeleteNotification = (notificationId: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.notificationId !== notificationId
      )
    );
  };

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
            background: "white",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid black",
              px: 2,
            }}
          >
            <Typography variant="h4" color="initial" sx={{ ml: "1rem" }}>
              Notifications
            </Typography>
            <Button
              onClick={handleClearAllNotification}
              sx={{
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#F0F8FF",
                  borderBottom: "none",
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
        {notifications.map((notification, index) => {
          if (notifications.length === index + 1) {
            return (
              <div
                ref={lastNotificationRef}
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
                    backgroundColor: notification.isRead
                      ? "#F0F8FF"
                      : "#FFFFFF",
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

                    onDeleteNotification={handleDeleteNotification}
                    notification={notification}
                    setNotifications={setNotifications}
                  />
                </Grid>
              </div>
            );
          } else {
            return (
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
                    backgroundColor: notification.isRead
                      ? "#F0F8FF"
                      : "#FFFFFF",
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
                    setNotifications={setNotifications}
                    onDeleteNotification={handleDeleteNotification}
                  />
                </Grid>
              </div>
            );
          }
        })}
      </Grid>
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      )}
    </>
  );
};

export default Notification;
