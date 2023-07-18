import axiosInstance from "../Request";

export const addStory = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post("/Story/Add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getAddStoryNotification = async (storyId: number) => {
  try {
    const response = await axiosInstance.get(`/Story/GetById/${storyId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getStorySeen = async (storyId: number) => {
  try {
    const response = await axiosInstance.post(`/Story/Seen/${storyId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getStoryViews = async (
  pageNumber: number,
  pageSize: number,
  storyId: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      storyId: storyId,
    };

    const response = await axiosInstance.post(`/Story/Views`, requestData);

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getStoryByUserId = async (
  pageNumber: number,
  pageSize: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };

    const response = await axiosInstance.post(
      `/Story/GetByUserId`,
      requestData
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getStoryDelete = async (storyId: number) => {
  try {
    const response = await axiosInstance.post(`/Story/Delete/${storyId}`);

    return response.data;
  } catch (err) {
    throw err;
  }
};
