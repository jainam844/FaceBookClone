import React, { useEffect, useState,  } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { getUserData, getAvatarImage } from "../services/Response";
import UserContext from "../components/Context/UserContext";

const HomeLayout = () => {
  const [userData, setUserData] = useState<any>("");
  const [userimageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userInfo") ?? "");
        const userId = userData.userId;
        const token = userData.token;
        const data = await getUserData(parseInt(userId), token);
        setUserData(data);
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
          setImageUrl(imgUrl);
        } catch (error) {
          console.error("Error fetching avatar image:", error);
        }
      };

      fetchProfileImage();
    }
  }, [userData]);

  return (
    <React.Fragment>
      <UserContext.Provider value={{ userData, userimageUrl }}>
        <Outlet />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default HomeLayout;
