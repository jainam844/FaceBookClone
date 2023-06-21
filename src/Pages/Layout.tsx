import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Profile from "../Pages/Profile";
import { getUserData, getAvatarImage } from "../services/Response";
import UserContext from "../components/Context/UserContext";

const HomeLayout = () => {
  const [userData, setUserData] = useState("");
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
    const fetchProfileImage = async () => {
      const {userData} = useContext(UserContext);
      try {
        const blobData = await getAvatarImage(
          userData.avatar
        );

        const fileReader = new FileReader();

        const base64Promise = new Promise<string>((resolve, reject) => {
          fileReader.onloadend = () => {
            const base64Data = fileReader.result as string;
            const base64String = base64Data.split(",")[1]; // Extract base64 data
            resolve(base64String);
          };

          fileReader.onerror = reject;
        });

        fileReader.readAsDataURL(blobData);

        const profileImage = await base64Promise;
        const imgUrl = `data:image/png;base64, ${profileImage}`;
        setImageUrl(imgUrl);
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <React.Fragment>
      <UserContext.Provider value={{ userData, userimageUrl }}>
        <Outlet />
      </UserContext.Provider>
    </React.Fragment>
  );
};

export default HomeLayout;
