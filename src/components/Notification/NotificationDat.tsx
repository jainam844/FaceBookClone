import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClearIcon from "@mui/icons-material/Clear";
import { getCommentNotification } from "../../services/API/SocialActivityApi";
import { getLikeNotification } from "../../services/API/SocialActivityApi";
import { getNewPostNotification } from "../../services/API/SocialActivityApi";
import { getAddStoryNotification } from "../../services/API/StoryApi";
import { getUserReqNotification } from "../../services/API/UserREquestApi";
import { getAvatarImage } from "../../services/API/AccountApi";
import { NotificationType } from "../Utils/Path";
import { getReadNotification } from "../../services/API/NotificationApi";
import { getClearNotification } from "../../services/API/NotificationApi";
import { getPostImage } from "../../services/API/AccountApi";

interface NotificationItemProps {
  notification: Notification;
  onClearNotification: (notificationId: number) => void;
  onDeleteNotification: (notificationId: number) => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface Notification extends NotificationData {
  byUser?: string;
}

interface NotificationData {
  notificationId: number;
  activityType: number;
  activityId: number;
  activityTypeName: string;
  isRead: number;
  createdAt: string;
}

const defaultAvatar = "/path/to/default/avatar.png";

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClearNotification,
  onDeleteNotification,
}) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [postImage, setPostImage] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchData();
  }, [notification.activityType, notification.activityId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReadNotification = async () => {
    try {
      await getReadNotification(notification.notificationId);

      notification.isRead = 1;
      handleClose();

      onClearNotification(notification.notificationId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearNotification = async () => {
    try {
      await getClearNotification(notification.notificationId);
      onDeleteNotification(notification.notificationId);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    let avatarUrl = null;
    let postData = null;

    switch (notification.activityTypeName) {
      case NotificationType.Comment:
        try {
          const getNotifData = await getCommentNotification(
            notification.activityId
          );
          setUsername(getNotifData.userName);
          avatarUrl = await getAvatarImage(getNotifData.avatar);
          postData = await getNewPostNotification(getNotifData.postId);
          const ImageData = await getPostImage(postData.path);
          setPostImage([ImageData]);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.PostLike:
        try {
          const getLikeNotif = await getLikeNotification(
            notification.activityId
          );

          setUsername(getLikeNotif.userName);

          avatarUrl = await getAvatarImage(getLikeNotif.avatar);

          postData = await getNewPostNotification(getLikeNotif.postId);

          const ImageData = await getPostImage(postData.path);
          setPostImage([ImageData]);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.NewPost:
        try {
          const getNewPostNotif = await getNewPostNotification(
            notification.activityId
          );

          setUsername(getNewPostNotif.userName);

          avatarUrl = await getAvatarImage(getNewPostNotif.avatar);

          postData = await getNewPostNotification(getNewPostNotif.postId);

          const ImageData = await getPostImage(postData.path);
          setPostImage([ImageData]);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.Acceptreq:
        try {
          const getUserReqNotifi = await getUserReqNotification(
            notification.activityId
          );

          setUsername(getUserReqNotifi.toUserName);

          avatarUrl = await getAvatarImage(getUserReqNotifi.toAvatar);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.RejectReq:
        try {
          const getUserReqNotifi = await getUserReqNotification(
            notification.activityId
          );

          setUsername(getUserReqNotifi.toUserName);

          avatarUrl = await getAvatarImage(getUserReqNotifi.toAvatar);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.AddStory:
        try {
          const getUserReqNotifi = await getAddStoryNotification(
            notification.activityId
          );

          setUsername(getUserReqNotifi.userName);

          avatarUrl = await getAvatarImage(getUserReqNotifi.avatar);
        } catch (error) {
          console.log(error);
        }
        break;

      case NotificationType.SendReq:
        try {
          const getUserReqNotifi = await getUserReqNotification(
            notification.activityId
          );

          setUsername(getUserReqNotifi.fromUserName);

          avatarUrl = await getAvatarImage(getUserReqNotifi.fromAvatar);
        } catch (error) {
          console.log(error);
        }
        break;

      default:
        break;
    }
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }
  };

  const renderNotificationItem = () => {
    let notificationText = "";
    let postImageElement = null;

    switch (notification.activityTypeName) {
      case NotificationType.Comment:
        notificationText = `${username} Commented on Your Post`;
        postImageElement = postImage.length > 0 && (
          <Avatar
            src={postImage[0]}
            sx={{
              marginLeft: "20px",
              width: "50px",
              height: "50px",
              borderRadius: "10px",
            }}
          />
        );
        break;

      case NotificationType.PostLike:
        notificationText = `${username} Liked Your Post`;
        postImageElement = postImage.length > 0 && (
          <Avatar
            src={postImage[0]}
            sx={{
              marginLeft: "20px",
              width: "50px",
              height: "50px",
              borderRadius: "10px",
            }}
          />
        );
        break;

      case NotificationType.NewPost:
        notificationText = `${username} Added a New Post`;
        postImageElement =
          postImage.length > 0 ? (
            <Avatar
              src={postImage[0]}
              sx={{
                marginLeft: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Avatar
              src="default-image-url.jpg"
              sx={{
                marginLeft: "20px",
                width: "50px",
                height: "50px",
                borderRadius: "10px",
              }}
            />
          );
        break;

      case NotificationType.Acceptreq:
        notificationText = `${username} Accepted Your Request`;
        break;

      case NotificationType.RejectReq:
        notificationText = `${username} Rejected Your Request`;
        break;

      case NotificationType.SendReq:
        notificationText = `${username} Sent You Request`;
        break;

      case NotificationType.AddStory:
        notificationText = `${username} Added New Story`;
        break;

      default:
        return null;
    }

    const createdAt = new Date(notification.createdAt);
    const timeDiff = Math.round(
      (currentDateTime.getTime() - createdAt.getTime()) / 1000
    );

    let timeAgo = "";
    if (timeDiff < 60) {
      timeAgo = `${timeDiff} seconds ago`;
    } else if (timeDiff < 3600) {
      const minutes = Math.floor(timeDiff / 60);
      timeAgo = `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (timeDiff < 86400) {
      const hours = Math.floor(timeDiff / 3600);
      timeAgo = `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      const days = Math.floor(timeDiff / 86400);
      timeAgo = `${days} ${days === 1 ? "day" : "days"} ago`;
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "20px",
        }}
      >
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: "10px" }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: "10px" }} />
        )}
        <Typography
          variant="body1"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: notification.isRead ? "gray" : "initial",
          }}
        >
          {notificationText}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{ marginLeft: "auto", ml: "10px" }}
        >
          {timeAgo}
        </Typography>
        {postImageElement}
      </Box>
    );
  };

  return (
    <>
      {renderNotificationItem()}
      <Button
        aria-controls="notification-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {!notification.isRead && (
          <MenuItem onClick={handleReadNotification}>
            <Typography>Read</Typography>
            <VisibilityIcon sx={{ marginLeft: "auto", cursor: "pointer" }} />
          </MenuItem>
        )}
        <MenuItem onClick={handleClearNotification}>
          Delete
          <ClearIcon sx={{ marginLeft: "auto", cursor: "pointer" }} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default NotificationItem;
