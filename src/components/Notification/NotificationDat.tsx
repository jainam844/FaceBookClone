import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  getCommentNotification,
  getLikeNotification,
  getNewPostNotification,
  getAvatarImage,
  getCommentByPostId,
  getPostImage,
  getUserNotification,
} from "../../services/Response";
import Avatar from "@mui/material/Avatar";

interface NotificationItemProps {
  notification: Notification;
}

enum NotificationType {
  Comment = "CommentOnPost",
  PostLike = "PostLike",
  NewPost = "AddNewPost",
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
const defaultAvatar = "/path/to/default/avatar.png";
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [postImage, setPostImage] = useState<string[]>([]);
  useEffect(() => {
    const getUserdata = async () => {
      switch (notification.activityTypeName) {
        case NotificationType.Comment:
          try {
            const getNotifData = await getCommentNotification(
              notification.activityId
            );
  
            console.log(getNotifData);
            const postData = await getNewPostNotification(getNotifData.postId);
            console.log(postData);
  
            const ImageData = await getPostImage(postData.path);
            console.log(postData.path);
  
            setPostImage([ImageData]); // Wrap ImageData in an array
  
            setUsername(getNotifData.userName);
  
            const avatarUrl = await getAvatarImage(getNotifData.avatar);
  
            setAvatar(avatarUrl);
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
            const avatarUrl = await getAvatarImage(getLikeNotif.avatar);
            setAvatar(avatarUrl);
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
            const avatarUrl = await getAvatarImage(getNewPostNotif.avatar);
            setAvatar(avatarUrl);
          } catch (error) {
            console.log(error);
          }
          break;
        default:
          break;
      }
    };
    getUserdata();
  }, [notification.activityType, notification.activityId]);

  if (notification.activityTypeName === NotificationType.Comment) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: "10px" }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: "10px" }} />
        )}
        <p>{username} Commented on Your Post</p>
        {postImage.length > 0 && (
        <Avatar src={postImage[0]} sx={{ marginLeft: "50px" }} />
      )}
      </Box>
    );
  } else if (notification.activityTypeName === NotificationType.PostLike) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: "10px" }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: "10px" }} />
        )}
        <p>{username} Liked Your Post</p>
      </Box>
    );
  } else if (notification.activityTypeName === NotificationType.NewPost) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        {avatar ? (
          <Avatar src={avatar} sx={{ marginRight: "10px" }} />
        ) : (
          <Avatar src={defaultAvatar} sx={{ marginRight: "10px" }} />
        )}
        <p>{username} Added a New Post</p>
      </Box>
    );
  } else {
    return null;
  }
};
export default NotificationItem;
