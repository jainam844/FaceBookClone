import { createContext, useContext, useState } from "react";
import { UserData } from "../../Models/User"; // Remove the import for IUserData
import { IUserContext } from "../../Models/UserContext";

const UserContext = createContext<IUserContext>({
  userData: new UserData(),
  userimageUrl: "",
  updateUserData: () => {},
  updateImageUrl: () => {},
});

export function useUserContext() {
  return useContext(UserContext);
}

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<UserData>(new UserData());
  const [userimageUrl, setImageUrl] = useState<string>("");

  const updateUserData = (data: UserData) => {
    setUserData(data);
  };

  const updateImageUrl = (url: string) => {
    setImageUrl(url);
  };

  return (
    <UserContext.Provider
      value={{ userData, userimageUrl, updateUserData, updateImageUrl }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
