import { getAvatarImage, getStoryImage } from "../../../services/Response";
import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
  const [progress, setProgress] = React.useState(0);
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
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
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
        <DialogContent
          sx={{
            position: "relative",
            padding: "1rem 0",
            maxWidth: "600px", // Set your desired width
            height: "500px", // Set your desired height
          }}
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
            }}
          />
          <Typography
            variant="subtitle1"
            sx={{
              marginLeft: "60px",
              fontWeight: "bold",
              color: "black",
            }}
          >
            {story.userName}
          </Typography>
          <div
            style={{
              overflow: "hidden", // Hide any content that exceeds the container dimensions
              width: "100%", // Set the width of the container as needed
              // Set the height of the container as needed
            }}
          >
            {postImage.length > 1 && (
              <>
                <Slider
                  value={selectedImageIndex}
                  min={0}
                  max={postImage.length - 1}
                  onChange={handleSliderChange}
                />
                {/* Rest of your code */}
              </>
            )}
          </div>
          {selectedImageIndex !== null && (
            <>
              {selectedImageIndex !== 0 && ( // Display "Prev" button if not the first image
                <Button
                  disabled={selectedImageIndex === 0}
                  onClick={handlePrevStory}
                  style={{ position: "absolute", top: "90%", left: 0 }}
                >
                  Prev
                </Button>
              )}
              <img
                src={`data:image/png;base64,${postImage[selectedImageIndex]}`}
                alt="Story"
                style={{ width: "30vw", height: "40vh" }}
              />
              {selectedImageIndex !== postImage.length - 1 && ( // Display "Next" button if not the last image
                <Button
                  disabled={selectedImageIndex === postImage.length - 1}
                  onClick={handleNextStory}
                  style={{ position: "absolute", top: "90%", right: 0 }}
                >
                  Next
                </Button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserStory;
