import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Slider from "@mui/material/Slider";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IStory } from "../../../Models/Story";
import { getStoryDelete, getStoryViews } from "../../../services/API/StoryApi";
import { getStorySeen } from "../../../services/API/StoryApi";
import { getStoryImage } from "../../../services/API/AccountApi";
import { getAvatarImage } from "../../../services/API/AccountApi";
import { UserDataContext } from "../../../Models/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../../Context/UserContext";
interface StoryProps {
  story: IStory;
}

const UserStory: React.FC<StoryProps> = ({ story }) => {
  const [postImage, setPostImage] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [progress, setProgress] = React.useState(0);
  const [boxOpen, setBoxOpen] = useState(false);
  const [storyViews, setStoryViews] = useState<string[]>([]);
  const { userData } = useContext(UserContext);
  const isCurrentUser = story.userId === userData.userId;
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
          // .filter((storyItem) => storyItem.path !== null)
          .map((storyItem) => storyItem.path);

        const postImagePromises = storyImagePaths.map(async (imageName) => {
          try {
            const imageUrl = await getStoryImage(imageName);
            return imageUrl;
          } catch (error) {
            console.error(`Error fetching image "${imageName}":`, error);
            // Return the path of the static image if fetch fails
            return "/path/to/static/image.jpg";
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

  const handleVisibilityClick = () => {
    setBoxOpen((prevOpen) => !prevOpen);
  };
  const handleImageClick = (image: string, event: React.MouseEvent) => {
    event.preventDefault();
    setSelectedImageIndex(postImage.indexOf(image));
    setDialogOpen(true);
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
  const handleDelete = async (storyId: number) => {
    try {
      const responseData = await getStoryDelete(storyId);

      console.log("Your story deleted:", responseData);
    } catch (error) {
      console.error(" hiii Error deleting story:", error);
    }
  };

  return (
    <>
      <Grid item>
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
      </Grid>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogContent
          sx={{
            position: "relative",
            padding: "1rem 0",
            maxWidth: "600px", // Set your desired width
            minHeight: "80vh", // Set your desired height
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
            {postImage.length > 1 && (
              <>
                <Slider
                  value={selectedImageIndex}
                  min={0}
                  max={postImage.length - 1}
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
                  src={`data:image/png;base64,${postImage[selectedImageIndex]}`}
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
              {selectedImageIndex !== postImage.length - 1 && (
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
            {/* <Avatar src={avatarUrl} sx={{ marginRight: "10px" }} /> */}
            {storyViews.map((view, index) => (
              <React.Fragment key={index}>
                {/* <Avatar src={view.avatarUrl} sx={{ marginRight: "10px" }} /> */}
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {/* {view.userName} */}
                </Typography>
              </React.Fragment>
            ))}
          </Box>
        )}

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <VisibilityIcon onClick={handleVisibilityClick} />

          {isCurrentUser && (
            <DeleteIcon onClick={() => handleDelete(story.stories[selectedImageIndex].storyId)} />
          )}
        </div>
      </Dialog>
    </>
  );
};

export default UserStory;
