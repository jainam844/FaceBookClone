import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, ChangeEvent, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import { getAvatarImage } from "../../../services/Response";

interface CommentCollapseProps {
  comment: string;
  userName: string;
  avatarUrl: string;
  createdAt: string;
}

const CommentCollapse: React.FC<CommentCollapseProps> = ({
  comment,
  userName,
  avatarUrl,
  createdAt,
}) => {
  const [newComment, setNewComment] = useState("");
  const [avatarImageUrl, setAvatarImageUrl] = useState("");

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const imgUrl = await getAvatarImage(avatarUrl); // Assuming avatarUrl is the imageName parameter for getAvatarImage function
        setAvatarImageUrl(imgUrl);
      } catch (error) {
        console.error("Failed to fetch avatar image:", error);
      }
    };

    fetchAvatarImage();
  }, [avatarUrl]);

  const handlePost = () => {
    if (newComment.trim() !== "") {
      console.log("Posted:", newComment);
      setNewComment("");
    }
  };

  const commentStyle: React.CSSProperties = {
    display: "flex",
    background: "#e3e3e3",
    padding: "0.5rem",
    borderRadius: 3,
  };

  const commentActionStyle: React.CSSProperties = {
    color: "#1877f2",
    fontSize: 14,
    cursor: "pointer",
    margin: "0 10px",
  };

  const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewComment(event.target.value);
  };

  return (
    <Card>
      <CardContent >
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "primary.main",
         
            marginBottom: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar src={avatarImageUrl} />
          <span>
            <Box sx={{ marginLeft: "10px", color: "black", fontSize: "1rem" }}>
              {userName}
              <Typography sx={{ fontSize: "0.8em", marginTop: "0.3rem" }}>
                {new Date(createdAt).toLocaleString()}
              </Typography>
              <Typography color="initial" sx={commentStyle}>
                {comment}
              </Typography>
            </Box>
          </span>
        </Typography>
        <Grid container sx={{ padding: "0px 40px" }}>
          <Grid item sx={commentActionStyle}>
            Like
          </Grid>
          <Grid item sx={commentActionStyle}>
            Share
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CommentCollapse;
