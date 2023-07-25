import { UserData } from "./User";
import { IUserData } from "./User";

export interface IUserContext {
  userData: IUserData;
  userimageUrl: string;
  updateUserData: (data: IUserData) => void;
  updateImageUrl: (url: string) => void;
}

export class UserDataContext implements IUserContext {
  userData: IUserData;
  userimageUrl: string;

  constructor(init?: IUserContext) {
    this.userData = init?.userData ?? new UserData();
    this.userimageUrl = init?.userimageUrl ?? "";
  }

  updateUserData = (data: IUserData) => {
    this.userData = data;
  };

  updateImageUrl = (url: string) => {
    this.userimageUrl = url;
  };
}
