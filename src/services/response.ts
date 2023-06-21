//Request.ts
import request from "./Request";
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
    const avatarImage = userData.avatarImage;

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
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      withCredentials: false,
    });

    return response;
  } catch (err) {
    throw err;
  }
};
