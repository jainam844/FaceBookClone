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
    const response = await request.get(url, {
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
    const blobData = await getBlobData(`/Account/GetAvatarImage/${imageName}`);
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
  } catch (err) {
    throw err;
  }
};
export const getPostImage = async (imageName: string) => {
  try {
    const blobData = await getBlobData(`/Account/GetPostImage/${imageName}`);
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
  } catch (err) {
    throw err;
  }
};

export const addPost = async (formData: FormData) => {
  try {
    const response = await request.post("/SocialActivity/AddPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    throw err;
  }
};
export const getPostByUserId = async (userId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetPostByUserId?userId=${userId}`,
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
    const response = await request.post(
      `/SocialActivity/AddComments`,
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

export const getCommentByPostId = async (postId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetCommentsByPostId?postId=${postId}`,
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

export const getLikesByPost = async (postId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetLikesByPost?postId=${postId}`,
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
    const response = await request.post(
      `/SocialActivity/PostLike`,
      postLikeData
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getUserNotification = async (userId: number) => {
  try {
    const response = await request.get(
      `/Notification/GetUserNotifications?userId=${userId}`,
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

export const getCommentNotification = async (commentId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetCommentById?commentId=${commentId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getLikeNotification = async (postLikeId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetPostLikesById?postLikeId=${postLikeId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getNewPostNotification = async (postId: number) => {
  try {
    const response = await request.get(
      `/SocialActivity/GetPostById?postId=${postId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
