import axiosInstance from "../Request";
import { getAvatarImage } from "./AccountApi";
export const getUserData = async (id: number, token: string) => {
  try {
    const response = await axiosInstance.get(`/User/GetById/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });

    const userData = response.data;

    const avatarImage = userData.avatar;

    if (avatarImage) {
      await getAvatarImage(avatarImage);
    }

    return userData;
  } catch (err) {
    throw err;
  }
};

export const getUserMutual = async (
  pageNumber: number,
  pageSize: number,
  userId: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      userId: userId,
    };
    const response = await axiosInstance.post(`/User/Mutual`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getUserSuggestion = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const response = await axiosInstance.post(`/User/Suggestion`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getUserCityList = async (pageNumber: number, pageSize: number) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const response = await axiosInstance.post(`/User/CityList`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getUserCountryList = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const response = await axiosInstance.post(`/User/CountryList`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const UserRegistration = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/User/Upsert", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
