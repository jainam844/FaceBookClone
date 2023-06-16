
import axios from "axios";
import apiUrl from "./response"; 

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(apiUrl, {
      email,
      password,
    });

    if (response.status === 200) {
      const data = response.data;
      console.log("Login successful:", data);
      localStorage.setItem("email", email);
      localStorage.setItem("token", response.data);
      return true;
    } else {
      console.error("Login failed:", response.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};

export default {
  login,
};
