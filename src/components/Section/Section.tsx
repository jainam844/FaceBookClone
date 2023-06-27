import React, { useState, useEffect, useContext } from "react";
import { getAvatarImage, getPostByUserId } from "../../services/Response";
import Box from "@mui/material/Box";
import Story from "./Story/story";
import BasicCard from "./AddDescription/AddDescription";
import Post from "./DisplayPost/DisplayPost";
import UserContext from "../Context/UserContext";

interface PostData {
  userName?: string;
  postId: number;
  text?: string;
  path?: string[];
  avatar: string;
  createdAt: string;
  avatarUrl: string;
}
const Section = (): JSX.Element => {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [newPost, setNewPost] = useState<PostData | null>(null);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data: PostData[] = await getPostByUserId(userData.userId);
        const updatedData = await Promise.all(
          data.map(async (post) => {
            const avatarUrl = await getAvatarImage(post.avatar);

            return { ...post, avatarUrl };
          })
        );
        setPostData(updatedData);
      } catch (err) {
        console.error("Error fetching post data:", err);
      }
    };
    if (userData) {
      fetchPostData();
    }
  }, [userData]);

  return (
    <Box sx={{ flex: "1" }}>
      <Story />
      <BasicCard setNewPost={setNewPost} />
      {newPost && <Post key={newPost.postId} post={newPost} />}
      <div>
        {postData.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Box>
  );
};

export default Section;
