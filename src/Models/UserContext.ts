import { UserData } from "./User";
import { IUserData } from "./User";

export interface IUserContext {
  userData: IUserData;
  userimageUrl: string;
}
export class UserDataContext implements IUserContext {
  userData: IUserData;
  userimageUrl: string;

  constructor(init?: IUserContext) {
    (this.userData = init?.userData ?? new UserData()),
      (this.userimageUrl = init?.userimageUrl ?? "");
  }
}
