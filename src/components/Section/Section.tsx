import Box from "@mui/material/Box";
import Story from "./Story/story";
import BasicCard from "./AddComment/AddComment";
import Post from "./PostStory/PostStory";
import {
  getAvatarImage,
  getPostByUserId,
  getPostImage,
} from "../../services/Response";
import React, { useState, useEffect, useContext } from "react";

interface PostData {
  userName: string;
  text: string;
  createdAt: string;
  imageName: string;
  avatar: string;
  avatarUrl: string;
  imageUrl: string; // Add a new field to store the post image URL
}

const Section = (): JSX.Element => {
  const [postData, setPostData] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data: PostData[] = await getPostByUserId(1); // Pass the desired userId as an argument
        const updatedData = await Promise.all(
          data.map(async (post) => {
            const avatarUrl = await getAvatarImage(post.avatar);
            const imageUrl = await getPostImage(post.imageName); // Fetch the post image
            return { ...post, avatarUrl, imageUrl };
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
        <Post postData={postData} />
      </div>
    </Box>
  );
};

export default Section;
