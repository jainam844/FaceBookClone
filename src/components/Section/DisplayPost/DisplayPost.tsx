import React, {
  useState,
  ChangeEvent,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendIcon from "@mui/icons-material/Send";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShareIcon from "@mui/icons-material/Share";
import UserContext from "../../Context/UserContext";
import {
  PostLike,
  getPostDelete,
} from "../../../services/API/SocialActivityApi";
import { getLikesByPost } from "../../../services/API/SocialActivityApi";
import RecommendIcon from "@mui/icons-material/Recommend";
import { addComment } from "../../../services/API/SocialActivityApi";
import { getAvatarImage } from "../../../services/API/AccountApi";
import { getPostImage } from "../../../services/API/AccountApi";
import CommentCollapse from "./CommentCollapse";
import { getCommentByPostId } from "../../../services/API/SocialActivityApi";
import { IComment } from "../../../Models/Comment";
import { Ipost } from "../../../Models/Post";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
interface PostProps {
  post: Ipost;
  reference?: (node: HTMLDivElement) => void;
}

const Post: React.FC<PostProps> = ({ post, reference }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [likeCount, setLikeCount] = useState("");
  const { userData } = useContext(UserContext);
  const [postImage, setPostImage] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [commentsList, setCommentsList] = useState<IComment[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [hasMoreComments, setHasMoreComments] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (postId: number) => {
    try {
      const responseData = await getPostDelete(postId);
      console.log("Your Post deleted:", responseData);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const totalImages = postImage.length;

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = postImage.length;
  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const lastCommentRef = useCallback(
    (node: HTMLDivElement) => {
      if (loadingComments) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreComments) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingComments, hasMoreComments]
  );

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const avatarUrl = (await getAvatarImage(post.avatar)) ?? "";
        setAvatarUrl(avatarUrl);
      } catch (error) {
        console.error("Error fetching avatar image:", error);
      }
    };

    fetchAvatar();
  }, [post.avatar]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likesData = await getLikesByPost(post.postId);
        setLikeCount(likesData);
        const loginUserLiked = likesData.some(
          (like: { userId: number }) => like.userId === userData.userId
        );
        setIsLiked(loginUserLiked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLikes();
  }, [isLiked]);

  useEffect(() => {
    const fetchPostImages = async () => {
      if (post.path) {
        const postImagePromises = post.path.map(async (imageName) => {
          const image = await getPostImage(imageName);
          return image;
        });

        try {
          const imageData = await Promise.all(postImagePromises);
          setPostImage(imageData);
          setLoadedImages(Array(imageData.length).fill(1));
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchPostImages();
  }, [post.path]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getCommentByPostId(
          pageNumber,
          1,
          post.postId
        );
        const data = commentsData.record.responseModel;
        if (Array.isArray(data)) {
          setCommentsList((prevComments) => [...prevComments, ...data]);
          setHasMoreComments(data.length > 0);
          setLoadingComments(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [post.postId, pageNumber]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async () => {
    if (isLiked) {
      const isLike = false;
      const response = await PostLike(userData.userId, post.postId, isLike);
      setIsLiked(response);
      console.log("unliked");
    } else {
      const isLike = true;
      const response = await PostLike(userData.userId, post.postId, isLike);
      console.log("successfully liked");
      setIsLiked(response);
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Shared Title",
          text: "Shared Text",
          url: "https://example.com",
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      console.log("Sharing not supported");
    }
  };

  const handleImageLoad = (index: number) => {
    const updatedLoadedImages = [...loadedImages];
    updatedLoadedImages[index] = 1;
    setLoadedImages(updatedLoadedImages);
  };

  const handleImageClick = (index: number) => {
    setOpenImageIndex(index);
  };

  const handleCloseImage = () => {
    setOpenImageIndex(null);
  };

  const handlePost = async () => {
    if (newComment.trim() !== "") {
      try {
        const newCommentData = await addComment(
          userData.userId,
          post.postId,
          newComment
        );
        setCommentsList([...commentsList, newCommentData]);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  const isDeleteIconVisible = post.userId === userData.userId;

  return (
    <React.Fragment>
      {!isRemoved && (
        <Card
          ref={reference}
          sx={{
            width: "80%",
            margin: "3rem auto",
            "@media (max-width: 800px)": {
              width: "100%",
            },
          }}
        >
          <CardHeader
            avatar={<Avatar src={avatarUrl} />}
            action={
              <>
                {isDeleteIconVisible && (
                  <IconButton
                    aria-label="settings"
                    aria-controls="post-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
                {!isRemoved && (
                  <IconButton
                    aria-label="remove"
                    onClick={() => setIsRemoved(true)}
                  >
                    <ClearIcon />
                  </IconButton>
                )}
              </>
            }
            title={post.userName}
            subheader={new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          />
          <Menu
            id="post-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{
              "& .MuiPaper-root": {
                minWidth: "120px",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f7f7f7",
              },
              "& .MuiList-root": {
                padding: "0",
              },
              "& .MuiMenuItem-root": {
                fontSize: "14px",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              },
              "& .MuiMenuItem-root:last-child": {
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
              },
            }}
          >
            <MenuItem
              onClick={() => handleDelete(post.postId)}
              sx={{
                fontSize: "14px",
                padding: "8px 16px",
                color: "#ff0000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#ffdada",
                },
              }}
            >
              <span>Delete</span>
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                fontSize: "14px",
                padding: "8px 16px",
                color: "#333333",
                "&:hover": {
                  backgroundColor: "#ebebeb",
                },
              }}
            >
              <span>Cancel</span>
            </MenuItem>
          </Menu>
          <CardMedia
            component="img"
            height="300"
            image={postImage[currentImageIndex]}
            alt="Post Image"
            onClick={() => handleImageClick(currentImageIndex)}
            onLoad={() => handleImageLoad(currentImageIndex)}
          />
          {totalImages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "0.5rem",
              }}
            ></Box>
          )}
          <MobileStepper
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          <CardContent>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: ["none", "flex", "flex"],
                fontWeight: "900",
                fontFamily: '"Lucida Console", Courier, monospace;',
              }}
            >
              {post.text}
            </Typography>
          </CardContent>{" "}
          <CardContent>
            <Box
              color="initial"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ display: "flex", alignItems: "center" }}>
                <RecommendIcon sx={{ marginRight: 0.5, color: "#1877f2" }} />
                <Typography color="initial">
                  {likeCount.length} Likes
                </Typography>
              </span>

              <Typography color="initial">
                {commentsList.length} comments
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              "& .MuiButtonBase-root": {
                border: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&:active .MuiIconButton-label": {
                  backgroundColor: "transparent",
                },
                "& .MuiIconButton-label": {
                  borderRadius: "0",
                  color: isLiked ? "blue" : "inherit",
                },
                "&:focus": {
                  outline: "none",
                },
              },
            }}
          >
            <IconButton sx={{ display: "flex" }} onClick={handleLikeClick}>
              {isLiked ? <ThumbUpIcon color="primary" /> : <ThumbUpIcon />}
              <Typography
                sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
              >
                Likes
              </Typography>
            </IconButton>

            <IconButton onClick={handleExpandClick}>
              <CommentIcon />
              <Typography
                sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
              >
                Comment
              </Typography>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton onClick={handleShareClick}>
              <ShareIcon />
              <Typography
                sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
              >
                Share
              </Typography>
            </IconButton>
          </CardActions>
          <Collapse in={expanded}>
            <CardContent>
              {commentsList.map((comment, index) => {
                if (commentsList.length === index + 1) {
                  return (
                    <CommentCollapse
                      key={index}
                      comment={comment.text}
                      userName={comment.userName}
                      avatarUrl={comment.avatar}
                      createdAt={comment.createdAt}
                      reference={lastCommentRef}
                    />
                  );
                } else {
                  return (
                    <CommentCollapse
                      key={index}
                      comment={comment.text}
                      userName={comment.userName}
                      avatarUrl={comment.avatar}
                      createdAt={comment.createdAt}
                    />
                  );
                }
              })}

              <TextField
                id="standard-basic"
                label="Write a comment..."
                variant="standard"
                value={newComment}
                onChange={handleCommentChange}
                style={{ width: "90%", marginTop: "10px" }}
              />
              <SendIcon sx={{ marginTop: "2rem" }} onClick={handlePost} />
            </CardContent>
          </Collapse>
        </Card>
      )}

      {openImageIndex !== null && (
        <Dialog open={openImageIndex !== null} onClose={handleCloseImage}>
          <DialogContent>
            <img
              src={postImage[openImageIndex]}
              alt="Full Post Image"
              style={{ width: "100%" }}
            />
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default Post;
