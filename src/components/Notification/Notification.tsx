import React, { useEffect, useState } from "react";
import { getUserNotification } from "../../services/Response";

interface Notification {
  notificationId: number;
  activityTypeName: string;
  // Add other properties from the API response
}

const Notification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserNotification(6); // Call the API with the desired userId
        setNotifications(response); // Update the notifications state with the API response
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Notification</h1>
      {notifications.map((notification) => (
        <div key={notification.notificationId}>
          <p>{notification.activityTypeName}</p>
        </div>
      ))}
    </>
  );
};

export default Notification;
