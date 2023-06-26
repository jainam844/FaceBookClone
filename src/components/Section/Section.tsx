import React, { useState, useEffect, useContext } from "react";
import { getAvatarImage, getPostByUserId } from "../../services/Response";
import Box from "@mui/material/Box";
import Story from "./Story/story";
import BasicCard from "./AddDescription/AddDescription";
import Post from "./DisplayPost/DisplayPost";

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

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data: PostData[] = await getPostByUserId(1);
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

    fetchPostData();
  }, []);

  return (
    <Box sx={{ flex: "1" }}>
      <Story />

      <BasicCard />
      <div>
        {postData.map((post, index) => (
          <Post key={index} post={post} /> // Add the post prop
        ))}
      </div>
    </Box>
  );
};

export default Section;
