import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import { IComment } from "../../../Models/Comment";
import { getAvatarImage } from "../../../services/API/AccountApi";

import UserContext from "../../Context/UserContext";
import { getCommentDelete } from "../../../services/API/SocialActivityApi";
interface CommentCollapseProps {
  comment: IComment["text"];
  userName: IComment["userName"];
  avatarUrl: IComment["avatar"];
  createdAt: IComment["createdAt"];
  userId: IComment["userId"];
  commentId: IComment["commentId"];
  onClearComment: (commentId: number) => void;
  reference?: (node: HTMLDivElement) => void;
}

const CommentCollapse: React.FC<CommentCollapseProps> = ({
  comment,
  userName,
  avatarUrl,
  createdAt,
  reference,
  userId,
  commentId,
  onClearComment,
}) => {
  const [avatarImageUrl, setAvatarImageUrl] = useState("");

  const { userData } = useContext(UserContext);
  const isCurrentUser = userId === userData.userId;
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

  const handleDelete = async (commentId: number) => {
    try {
      const responseData = await getCommentDelete(commentId);
      onClearComment(commentId);
      console.log("Your comment deleted:", responseData);
    } catch (error) {
      console.error(" hiii Error deleting comment:", error);
    }
  };

  const commentStyle: React.CSSProperties = {
    display: "flex",
    background: "#e4e4e4",
    padding: "0.5rem",
    borderRadius: 3,
  };
  const commentContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.3rem",
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
              <div style={commentContainerStyle}>
                <Typography color="initial" sx={commentStyle}>
                  {comment}
                </Typography>
                {isCurrentUser && (
                  <DeleteIcon
                    onClick={() => handleDelete(commentId)}
                    sx={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "0.5rem",
                      fontSize: "1.2rem",
                      borderRadius: "50%",
                      backgroundColor: "white",
                      border: "none",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.3s",
                    }}
                    style={{ transform: "scale(1)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.2)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                )}
              </div>
            </Box>
          </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCollapse;
