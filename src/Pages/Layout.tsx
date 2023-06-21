import React, { useEffect, useState, useContext } from "react";

import Section from "../components/Section/Section";
import Flag from "../components/Flag/flag";
import Subscription from "../components/Subscription/Subscription";
import MarketPlace from "../components/MarketPlace/MarketPlace";
import UserFriend from "../components/Group/Groups";
import Friend from "../components/Friend/Friends";
import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "../Pages/Profile";
import { getUserData } from "../services/Response";
import UserContext from "../components/Context/UserContext";
const HomeLayout = () => {
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userInfo") ?? "");
        const userId = userData.userId;
        const token = userData.token;
        const data = await getUserData(parseInt(userId), token);
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);
  return (
    <React.Fragment>
      <UserContext.Provider value={userData}>
        <Outlet />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default HomeLayout;