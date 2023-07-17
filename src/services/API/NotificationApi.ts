import axiosInstance from "../Request";
export const getUserNotification = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    const response = await axiosInstance.post(`/Notification`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getReadNotification = async (notificationId: number) => {
  try {
    const response = await axiosInstance.post(
      `/Notification/Read/${notificationId}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getClearNotification = async (notificationId: number) => {
  try {
    const response = await axiosInstance.get(
      `/Notification/Clear/${notificationId}`
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getClearAllNotification = async () => {
  try {
    const response = await axiosInstance.get(`/Notification/ClearAll`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
