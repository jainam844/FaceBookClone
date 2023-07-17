export enum Path {
  Login = "/",
  Register = "/Register",
  Forgot = "/Forgot",
  Reset = "/Reset",
  Layout = "/layout",
  Home = "/layout/home",
  Feed = "/layout/home/feed",
  Flag = "/layout/home/flag",
  Subscription = "/layout/home/subscription",
  MarketPlace = "/layout/home/marketplace",
  UserFriend = "/layout/home/userfriend",
  Notification = "/layout/home/Notification",
  Friend = "/layout/home/friend",
  Profile = "/layout/Profile",
  Suggestion = "/layout/home/friend/suggestion",
  YourFriend = "/layout/home/friend/yourfriend",
}

export enum NotificationType {
  Comment = "CommentOnPost",
  PostLike = "PostLike",
  NewPost = "AddNewPost",
  Acceptreq = "AcceptRequest",
  RejectReq = "RejectRequest",
  SendReq = "SendRequest",
  AddStory = "AddNewStory",
}
export enum FilterStatus {
  ACCEPTED = 1,
  REJECTED = 2,
  PENDING = 3,
}
export enum RequestType {
  Sent = 1,
  Received = 2,
}

export enum ToastSuccessMessages {
  LOGGED_IN = "You Are LoggedIn..!  😃",
  REGISTRATION_SUCCESSFUL = "Registration done successfully!",
  PASSWORD_RESET = "Password reset successfully..!! 😃",
  CONFIRMATIN_CODE_SENT = "Confirmation code sent successfully",
}

export enum ToastErrorMessages {
  NETWORK_SERVER_ERROR_MESSAGE = "Something went wrong, please try again later!",
  USER_NOT_EXIST = "User does not exists!",
  INVALID_EMAIL_OR_PASSWORD = "Invalid email or password 😐",
  INVALID_PASSWORD = "Invalid password 😐",
  EMAIL_OR_PASSWORD_EXISTS = "Email or password already exists",
}

export default Path;
