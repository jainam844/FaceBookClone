//Request.ts
import request from "./Request";
import React, { useState, useContext } from "react";
import UserContext from "../components/Context/UserContext";
export const ForUserLogin = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await request.post(
      "/Account/Login",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getUserData = async (id: number, token: string) => {
  try {
    const response = await request.get(`/User/UserbyId?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    const userData = response.data;

    // Call getAvatarImage
    const avatarImage = userData.avatar;

    if (avatarImage) {
      await getAvatarImage(avatarImage);
    }
    console.log(typeof avatarImage);
    return userData;
  } catch (err) {
    throw err;
  }
};

export const getAvatarImage = async (imageName: string) => {
  try {
    const response = await request.get(`/Account/GetAvatarImage/${imageName}`, {
      headers: {},
      withCredentials: false,
      responseType: "blob",
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

// export const addPost = async (description: string, file: File | null) => {
//   const userData = useContext(UserContext);
//   try {
//     const formData = new FormData();

//     formData.append("UserId", userData.userId);
//     formData.append("Description", description);
//     if (file) {
//       formData.append("Images", file);
//     }

//     const response = await request.post("/SocialActivity/AddPost", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         "ngrok-skip-browser-warning": "69420",
//       },
//       withCredentials: false,
//     });

//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const addPost = async (formData: FormData) => {
  try {
    const response = await request.post("/SocialActivity/AddPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
