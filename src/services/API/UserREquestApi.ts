import axiosInstance from "../Request";

export const getUserRequest = async (
  pageNumber: number,
  pageSize: number,
  filter: number,
  requestType: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      filter: filter,
      requestType: requestType,
    };
    const response = await axiosInstance.post(
      `/UserRequest/GetByUserId`,
      requestData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getUserCancelReq = async (requestId: number) => {
  try {
    const response = await axiosInstance.post(
      `/UserRequest/CancleOrRemove/${requestId}`
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getUserRequestSend = async (toUserId: number) => {
  try {
    const response = await axiosInstance.post(`/UserRequest/Send/${toUserId}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getUserReqNotification = async (requestId: number) => {
  try {
    const response = await axiosInstance.get(
      `/UserRequest/GetById/${requestId}`,
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
export const getUserRequestRespond = async (
  requestId: number,
  isAccepted: boolean
) => {
  try {
    const requestData = {
      requestId: requestId,
      isAccepted: isAccepted,
    };
    const response = await axiosInstance.post(
      `/UserRequest/Respond`,
      requestData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
