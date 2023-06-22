import React, { useState, useContext } from "react";
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
import CommentCollapse from "./CommentCollapse";
import UserContext from "../../Context/UserContext";

interface PostData {
  userName: string;
  text: string;
  createdAt: string;
  avatarUrl: string;
  imageUrl: string; // Add the 'imageUrl' property
}

interface Props {
  postData: PostData[];
}

const Post: React.FC<Props> = ({ postData }) => {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  // const { userData, userimageUrl } = useContext(UserContext);
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

  return (
    <>
      {postData.map((post, index) => (
        <Card key={index} sx={{ width: "60%", margin: "3rem auto" }}>
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
          <CardMedia
            component="img"
            height="270"
            image={post.imageUrl} // Use the 'imageUrl' property for the image source
            alt="Post Image"
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
          </CardContent>
          {/* Rest of the code */}
        </Card>
      ))}
    </>
  );
};

export default Post;
