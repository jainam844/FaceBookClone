import { Outlet } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getUserData } from "../services/API/UserDataApi";
import UserContext from "../components/Context/UserContext";

import { getAvatarImage } from "../services/API/AccountApi";
const HomeLayout = () => {
  const { userData, updateUserData, updateImageUrl } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userInfo") ?? "");

        const userId = userData.userId;
        const token = userData.token;
        const data = await getUserData(parseInt(userId), token);
        updateUserData(data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      const fetchProfileImage = async () => {
        try {
          const imgUrl = await getAvatarImage(userData.avatar);
          if (imgUrl) {
            updateImageUrl(imgUrl);
          }
        } catch (error) {
          console.error("Error fetching avatar image:", error);
        }
      };

      fetchProfileImage();
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
};

export default HomeLayout;
