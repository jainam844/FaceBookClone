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
import {
  getAvatarImage,
  getPostByUserId,
  getPostImage,
} from "../../../services/Response";
import CommentCollapse from "./CommentCollapse";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { getCommentByPostId } from "../../../services/Response";

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
  post: PostData; // Specify the type of the `post` prop
}

const Post: React.FC<PostProps> = ({ post }) => {
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { userData } = useContext(UserContext);
  const [postImage, setPostImage] = useState<string[]>([]);
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  const [openImageIndex, setOpenImageIndex] = useState<number | null>(null); // State to track the index of the opened image
  const [comments, setComments] = useState<any[]>([]); // State to store comments

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      setLiked(true);
      setLikeCount(likeCount + 1);
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
        const commentsData = await getCommentByPostId(post.postId);

        console.log(commentsData);
        setComments(commentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComments();
  }, [post.postId]);

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

  const handlePost = () => {
    if (newComment.trim() !== "") {
      console.log("Posted:", newComment);
      setNewComment("");
    }
  };
  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };
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
            onClick={() => handleImageClick(0)} // Add click event listener to open the image
            onLoad={() => handleImageLoad(0)}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            height={270}
            animation="wave"
            sx={{ display: "block" }}
          />
        )}

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
                color: liked ? "blue" : "inherit",
              },
              "&:focus": {
                outline: "none",
              },
            },
          }}
        >
          <IconButton sx={{ display: "flex" }} onClick={handleLikeClick}>
            {liked ? <ThumbUpIcon color="primary" /> : <ThumbUpIcon />}
            <Typography
              sx={{ margin: "0 0.3rem", display: ["none", "flex", "flex"] }}
            >
              Like
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

      {/* Full Image Dialog */}
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
