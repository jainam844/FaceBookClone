import React from "react";

interface NotificationItemProps {
  notification: Notification;
}

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

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  if (notification.activityTypeName === NotificationType.Comment) {
    return <p>{notification.byUser} Commented on Your Post</p>;
  } else if (notification.activityTypeName === NotificationType.PostLike) {
    return <p>{notification.byUser} Liked Your Post</p>;
  } else {
    return null;
  }
};

export default NotificationItem;
