import { getAvatarImage, getStoryImage } from "../../../services/Response";
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Slider,
} from "@mui/material";

interface StoryProps {
  story: {
    backgroundImage: string;
    avatar: string;
    userName: string;
    avatarUrl: string;
    stories: { path: string }[];
  };
}

const UserStory: React.FC<StoryProps> = ({ story }) => {
  const [postImage, setPostImage] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    const fetchStoryImages = async () => {
      if (story.stories) {
        const storyImagePaths = story.stories
          .filter((storyItem) => storyItem.path !== null)
          .map((storyItem) => storyItem.path);

        const postImagePromises = storyImagePaths.map(async (imageName) => {
          try {
            const imageUrl = await getStoryImage(imageName);
            return imageUrl;
          } catch (error) {
            console.error(`Error fetching image "${imageName}":`, error);
            throw error;
          }
        });

        try {
          const images = await Promise.all(postImagePromises);
          setPostImage(images);
        } catch (error) {
          console.error("Error fetching post images:", error);
        }
      }
    };

    fetchStoryImages();
  }, [story.stories]);

  const handleImageClick = (image: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedImageIndex(postImage.indexOf(image));
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedImageIndex(newValue as number);
  };

  const handlePrevStory = () => {
    const newIndex = selectedImageIndex - 1;
    if (newIndex >= 0) {
      setSelectedImageIndex(newIndex);
    }
  };

  const handleNextStory = () => {
    const newIndex = selectedImageIndex + 1;
    if (newIndex < postImage.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  if (postImage.length === 0) {
    return null;
  }

  return (
    <>
      <Paper
        sx={{
          height: 180,
          width: 100,
          margin: "10px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("data:image/png;base64,${postImage[0]}")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "15px 15px",
          borderRadius: "20px",
          position: "relative",
        }}
        onClick={(event) => handleImageClick(postImage[0], event)}
      >
        <Avatar
          src={avatarUrl}
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
            color: "#ffffff",
          }}
        >
          {story.userName}
        </Typography>
      </Paper>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent>
          {postImage.length > 1 && (
            <>
              <Button
                disabled={selectedImageIndex === 0}
                onClick={handlePrevStory}
              >
                Prev
              </Button>
              <Slider
                value={selectedImageIndex}
                min={0}
                max={postImage.length - 1}
                onChange={handleSliderChange}
              />
              <Button
                disabled={selectedImageIndex === postImage.length - 1}
                onClick={handleNextStory}
              >
                Next
              </Button>
            </>
          )}
          {selectedImageIndex !== null && (
            <img
              src={`data:image/png;base64,${postImage[selectedImageIndex]}`}
              alt="Story"
              style={{ maxWidth: "100%",maxHeight:"40vh" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserStory;
