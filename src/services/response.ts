//Request.ts
import request from './Request'
export const ForUserLogin = async (data: { email: string; password: string }) => {
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
