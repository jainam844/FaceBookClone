import { getAvatarImage, getStoryImage } from "../../../services/Response";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { Avatar, Box, Typography, Button } from "@mui/material";

import Paper from "@mui/material/Paper";
interface StoryProps {
  story: {
    backgroundImage: string;
    avatar: string;
    userName: string;
    avatarUrl: string;
    path: string;
  };
}

const UserStory: React.FC<StoryProps> = ({ story }) => {
  const [postImage, setPostImage] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = (await getAvatarImage(story.avatar)) ?? "";

        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchAvatar();
  }, [story.avatar]);

  useEffect(() => {
    const fetchAvatar1 = async () => {
      try {
        const image = await getStoryImage(story.path);
        console.log(image);
        setPostImage(image);
      } catch (error) {
        console.error("Error fetching post image:", error);
      }
    };

    fetchAvatar1();
  },[story.path]);
  return (
    <>
      <Paper
        sx={{
          height: 180,
          width: 100,
          margin: "10px",
        //   backgroundImage: url(`data:image/png;base64, ${postImage[0]}`),
        //   backgroundImage: `url(${postImage})`,
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("data:image/png;base64,${postImage}")`,

          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "15px 15px",
          borderRadius: "20px",
          position: "relative",
        }}
      >
        <Avatar
          src={avatarUrl} // Use the fetched avatarUrl as the src
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "3px solid royalblue",
          }}
        ></Avatar>
        <Typography
          variant="subtitle2"
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            fontWeight: "600",
            color: "#fc1a1a",
          }}
        >
          {story.userName}
        </Typography>
      </Paper>
    </>
  );
};
export default UserStory;
