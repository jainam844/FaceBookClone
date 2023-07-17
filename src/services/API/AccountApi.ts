import axiosInstance from "../Request";

export const getAccountForgot = async (email: string) => {
  try {
    const response = await axiosInstance.post("/Account/Forgot", email);
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getVerifyToken = async (email: string, token: string) => {
  try {
    const requestData = {
      email: email,
      token: token,
    };

    const response = await axiosInstance.post(
      "/Account/VerifyToken",
      requestData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getResetPassword = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/Account/Reset", formData);
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const ForUserLogin = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(
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

export const getStoryImage = async (imageName: string) => {
  try {
    if (imageName.length > 0) {
      const blobData = await getBlobData(`/Account/Story/${imageName}`);
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
      // const imgUrl = `data:image/png;base64, ${profileImage}`;
      return profileImage;
    } else {
      throw new Error("Image name is empty");
    }
  } catch (err) {
    throw err;
  }
};

export const getPostImage = async (imageName: string) => {
  try {
    if (imageName.length > 0) {
      const blobData = await getBlobData(`/Account/Post/${imageName}`);
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
      return imgUrl;
    } else {
      throw new Error("Image name is empty");
    }
  } catch (err) {
    throw err;
  }
};

export const getAvatarImage = async (imageName: string) => {
  try {
    if (imageName.length > 0) {
      const blobData = await getBlobData(`/Account/Avatar/${imageName}`);
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
      return imgUrl;
    }
  } catch (err) {
    throw err;
  }
};
const getBlobData = async (url: string) => {
  try {
    const response = await axiosInstance.get(url, {
      headers: {},
      withCredentials: false,
      responseType: "blob",
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
