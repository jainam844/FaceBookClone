import axiosInstance from "../Request";

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

export const getPostDelete = async (postId: number) => {
  try {
    const response = await axiosInstance.post(
      `/SocialActivity/DeletePost/${postId}`
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getCommentDelete = async (commentId: number) => {
  try {
    const response = await axiosInstance.post(
      `/SocialActivity/DeleteComment/${commentId}`
    );
    console.log("jainam", response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// getPostDelete(10073);
