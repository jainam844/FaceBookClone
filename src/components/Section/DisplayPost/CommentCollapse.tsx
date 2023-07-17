import React, { useState, ChangeEvent, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IComment } from "../../../Models/Comment";
import { getAvatarImage } from "../../../services/API/AccountApi"; 
interface CommentCollapseProps {
  comment: IComment["text"];
  userName: IComment["userName"];
  avatarUrl: IComment["avatar"];
  createdAt: IComment["createdAt"];
  reference?: (node: HTMLDivElement) => void;
}

const CommentCollapse: React.FC<CommentCollapseProps> = ({
  comment,
  userName,
  avatarUrl,
  createdAt,
  reference,
}) => {
  const [avatarImageUrl, setAvatarImageUrl] = useState("");

  useEffect(() => {
    const fetchAvatarImage = async () => {
      try {
        const imgUrl = await getAvatarImage(avatarUrl);
        if (imgUrl) {
          setAvatarImageUrl(imgUrl);
        }
      } catch (error) {
        console.error("Failed to fetch avatar image:", error);
      }
    };

    fetchAvatarImage();
  }, [avatarUrl]);

  const commentStyle: React.CSSProperties = {
    display: "flex",
    background: "#e4e4e4",
    padding: "0.5rem",
    borderRadius: 3,
  };

  const commentActionStyle: React.CSSProperties = {
    color: "#1877f2",
    fontSize: 14,
    cursor: "pointer",
    margin: "0 10px",
  };

  return (
    <Card
      ref={reference}
      sx={{
        backgroundColor: "#FFFFFF",
        marginBottom: "10px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
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
          <Avatar src={avatarImageUrl} sx={{ marginBottom: "2.3rem" }} />
          <span>
            <Box
              sx={{
                marginLeft: "10px",
                color: "black",
                fontSize: "1rem",
              }}
            >
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
