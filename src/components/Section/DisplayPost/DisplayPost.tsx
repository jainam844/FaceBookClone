import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShareIcon from "@mui/icons-material/Share";
import Skeleton from "@mui/material/Skeleton";
import UserContext from "../../Context/UserContext";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { PostLike, getLikesByPost } from "../../../services/Response";
import RecommendIcon from "@mui/icons-material/Recommend";
import { addComment } from "../../../services/Response";
import {
  getAvatarImage,
  getPostByUserId,
  getPostImage,
} from "../../../services/Response";
import CommentCollapse from "./CommentCollapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { getCommentByPostId } from "../../../services/Response";
interface CommentData {
  text: string;
  userName: string;
  avatar: string;
  createdAt: string;
}
interface PostData {
  userName?: string;
  postId: number;
  text?: string;
  path?: string[];
  avatar: string;
  createdAt: string;
  avatarUrl: string;
}

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [likeCount, setLikeCount] = useState("");
  const { userData } = useContext(UserContext);
  const [postImage, setPostImage] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLiked, setIsLiked] = useState(false);

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
  }, [post.postId, isLiked]);

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
        await addComment(userData.userId, post.postId, newComment);
        console.log(userData.userId, post.postId, newComment);
        setNewComment("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

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
          console.log(imageData);
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
        const commentsData = await getCommentByPostId(post.postId);
        setComments(commentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [post.postId]);

  return (
    <React.Fragment>
      <Card sx={{ width: "60%", margin: "3rem auto" }}>
        <CardHeader
          avatar={<Avatar src={post.avatarUrl} />}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={post.userName}
          subheader={new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        {loadedImages[0] ? (
          <CardMedia
            component="img"
            height="300"
            image={postImage[0]}
            alt="Post Image"
            onClick={() => handleImageClick(0)}
            onLoad={() => handleImageLoad(0)}
          />
        ) : null}
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
          <Typography
            color="initial"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <RecommendIcon sx={{ marginRight: 0.5, color: "#1877f2" }} />
              <Typography color="initial">
                {" "}
                {likeCount.length} Likes{" "}
              </Typography>
            </div>
            <Typography color="initial">{comments.length} comments</Typography>
          </Typography>
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
            {comments.map((comment, index) => (
              <CommentCollapse
                key={index}
                comment={comment.text}
                userName={comment.userName}
                avatarUrl={comment.avatar}
                createdAt={comment.createdAt}
              />
            ))}{" "}
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
