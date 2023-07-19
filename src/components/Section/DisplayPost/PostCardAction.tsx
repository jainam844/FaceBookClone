// PostCardActions.tsx
import React from "react";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShareIcon from "@mui/icons-material/Share";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Collapse from "@mui/material/Collapse";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { IComment } from "../../../Models/Comment";
import CommentCollapse from "./PostCardComment";

interface PostCardActionsProps {
  isLiked: boolean;
  handleLikeClick: () => void;
  handleExpandClick: () => void;
  handleShareClick: () => void;
  expanded: boolean;
  commentsList: IComment[];
  lastCommentRef: (node: HTMLDivElement) => void;
  newComment: string;
  handleCommentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePost: () => void;
  handleClearComment: (commentId: number) => void;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({
  isLiked,
  handleLikeClick,
  handleExpandClick,
  handleShareClick,
  expanded,
  commentsList,
  lastCommentRef,
  newComment,
  handleCommentChange,
  handlePost,
  handleClearComment,
}) => {
  return (
    <>
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
                  userId={comment.userId}
                  commentId={comment.commentId}
                  onClearComment={handleClearComment}
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
                  userId={comment.userId}
                  commentId={comment.commentId}
                  onClearComment={handleClearComment}
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
    </>
  );
};

export default PostCardActions;
