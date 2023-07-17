import axiosInstance from "./Request";

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

export const addPost = async (formData: FormData) => {
  try {
    const response = await axiosInstance.post(
      "/SocialActivity/AddPost",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};
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
export const getPostByUserId = async (
  pageNumber: number,
  pageSize: number,
  isUser: boolean
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      isUser: isUser,
    };

    const response = await axiosInstance.post(
      `/SocialActivity/PostByUserId`,
      requestData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const addComment = async (
  UserId: number,
  PostId: number,
  comment: string
) => {
  try {
    const postdata = {
      userId: UserId,
      postId: PostId,
      text: comment,
    };
    const response = await axiosInstance.post(
      `/SocialActivity/AddComment`,
      postdata,

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

export const getCommentByPostId = async (
  pageNumber: number,
  pageSize: number,
  postId: number
) => {
  try {
    const requestData = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      postId: postId,
    };

    const response = await axiosInstance.post(
      `/SocialActivity/CommentByPostId`,
      requestData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getLikesByPost = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/LikeByPostId/${postId}`,
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

export const PostLike = async (
  UserId: number,
  PostId: number,
  Islike: boolean
) => {
  try {
    const postLikeData = {
      userId: UserId,
      postId: PostId,
      isLike: Islike,
    };
    const response = await axiosInstance.post(
      `/SocialActivity/AddPostLike`,
      postLikeData
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

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

export const getCommentNotification = async (commentId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/CommentById/${commentId}`,
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

export const getLikeNotification = async (postLikeId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/LikeById/${postLikeId}`,
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

export const getNewPostNotification = async (postId: number) => {
  try {
    const response = await axiosInstance.get(
      `/SocialActivity/PostById/${postId}`,
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
export const getUserRequestSend = async (toUserId: number) => {
  try {
    const response = await axiosInstance.post(`/UserRequest/Send/${toUserId}`);
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
export const getAddStoryNotification = async (storyId: number) => {
  try {
    const response = await axiosInstance.get(`/Story/GetById/${storyId}`);

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
    // console.log(response);
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
