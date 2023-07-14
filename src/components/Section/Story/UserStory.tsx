import {
  getAvatarImage,
  getStoryImage,
  getStorySeen,
  getStoryViews,
} from "../../../services/Response";
import React, { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { Grid } from "@mui/material";
import { IStory } from "../../../Models/Story";
interface StoryProps {
  story: IStory;
}

const UserStory: React.FC<StoryProps> = ({ story }) => {
  // console.log(story);
  const [storyImage, setPostImage] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [progress, setProgress] = React.useState(0);
  const [boxOpen, setBoxOpen] = useState(false);
  const [storyViews, setStoryViews] = useState([]);

  const handleVisibilityClick = () => {
    setBoxOpen((prevOpen) => !prevOpen);
  };
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
        story.stories.map((storyItem) => storyItem.path);

        const postImagePromises = story.stories.map(async (storyItem) => {
          try {
            if (storyItem.path) {
              const imageUrl = await getStoryImage(storyItem.path);
              return {
                image: imageUrl,
                isSeen: storyItem.isSeen,
                text: storyItem.text,
                storyId: storyItem.storyId,
                seenData: [],
              };
            }
          } catch (error) {
            console.error(`Error fetching image :`, error);

            return "/path/to/static/image.jpg";
          }
        });

        try {
          const data = await Promise.all(postImagePromises);
          setStoryViews(data);
        } catch (error) {
          console.error("Error fetching post images:", error);
        }
      }
    };

    fetchStoryImages();
  }, [story.stories]);

  const handleImageClick = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedImageIndex(index);
    setDialogOpen(true);
    handleStoryView(index);
  };
  const handleStoryView = async (index: number) => {
    try {
      const StoryViewData = await getStoryViews(
        1,
        100,
        story.stories[index].storyId
      );
      if (StoryViewData) {
        console.log(StoryViewData);

        setStoryViews[index].seenData = StoryViewData.record.responseModel;
      }
      console.log("Story views fetched successfully");
    } catch (error) {
      console.error("Error fetching story views:", error);
    }
    console.log(setStoryViews[selectedImageIndex].seenData);
  };
  const handleDialogClose = async () => {
    setDialogOpen(false);

    try {
      const StoryViewData = await getStoryViews(
        selectedImageIndex + 1,
        100,
        story.stories[selectedImageIndex].storyId
      );
      if (StoryViewData) {
        console.log(StoryViewData);
        setStoryViews(StoryViewData.record.responseModel);
      }
      console.log("Story views fetched successfully");
    } catch (error) {
      console.error("Error fetching story views:", error);
    }

    try {
      await getStorySeen(story.stories[selectedImageIndex].storyId);
      console.log("Story marked as seen successfully");
    } catch (error) {
      console.error("Error marking story as seen:", error);
    }
  };

  const handlePrevStory = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      if (newIndex >= 0) {
        handleStoryView(newIndex);
        return newIndex;
      }
      return prevIndex;
    });
  };

  const handleNextStory = () => {
    setSelectedImageIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex > storyImage.length) {
        handleStoryView(newIndex);
        return newIndex;
      }
      return prevIndex;
    });
  };

  // if (storyImage.length === 0) {
  //   return null;
  // }
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSelectedImageIndex(newValue as number);
  };

  return (
    <>
      <Grid item>
        <Paper
          sx={{
            height: 180,
            width: 100,
            margin: "10px",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("data:image/png;base64,${
              storyViews.length > 0 && storyViews[0].image
            }")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            padding: "15px 15px",
            borderRadius: "20px",
            position: "relative",
          }}
          onClick={(event) => handleImageClick(0, event)}
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
      </Grid>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent
          sx={{
            position: "relative",
            padding: "1rem 0",
            maxWidth: "600px",
            minHeight: "80vh",
          }}
        >
          <Box sx={{ marginBottom: "0.5rem" }}>
            <DialogTitle>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleDialogClose}
                aria-label="close"
                sx={{
                  position: "absolute",
                  right: 12,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <Avatar
              src={avatarUrl}
              sx={{
                position: "absolute",
                top: 40,
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
          </Box>
          <div
            style={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            {storyImage.length > 1 && (
              <>
                <Slider
                  value={selectedImageIndex}
                  min={0}
                  max={storyImage.length - 1}
                  onChange={handleSliderChange}
                />
              </>
            )}
          </div>
          {selectedImageIndex !== null && (
            <>
              {selectedImageIndex !== 0 && (
                <Button
                  disabled={selectedImageIndex === 0}
                  onClick={handlePrevStory}
                  style={{ position: "absolute", top: "90%", left: 0 }}
                >
                  Prev
                </Button>
              )}
              <div style={{ width: "30vw", height: "60vh" }}>
                <img
                  src={`data:image/png;base64,${
                    storyViews.length > 0 &&
                    storyViews[selectedImageIndex].image
                  }`}
                  alt="Story"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>

              <Typography
                variant="caption"
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 50,
                  right: 50,
                  textAlign: "center",
                  fontWeight: "900",
                  color: "black",
                }}
              >
                {story.stories[selectedImageIndex].text}
              </Typography>
              {selectedImageIndex !== storyImage.length - 1 && (
                <Button
                  disabled={selectedImageIndex === storyImage.length - 1}
                  onClick={handleNextStory}
                  style={{ position: "absolute", top: "90%", right: 0 }}
                >
                  Next
                </Button>
              )}
            </>
          )}
        </DialogContent>

        {boxOpen && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // Align items vertically
              position: "relative",
              bottom: 0,
              left: 0,
              minWidth: "100px",
              minHeight: "100px",
              backgroundColor: "white",
              borderTop: "1px solid gray",
              padding: "1rem",
            }}
          >
            {storyViews[selectedImageIndex].seenData.length > 0 &&
              storyViews[selectedImageIndex].seenData.map((view, index) => (
                <React.Fragment key={index}>
                  <Avatar sx={{ marginRight: "10px" }} />
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {view.userName}
                  </Typography>
                </React.Fragment>
              ))}
          </Box>
        )}
        <VisibilityIcon onClick={handleVisibilityClick} />
      </Dialog>
    </>
  );
};

export default UserStory;
