import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";

const CommentCollapse = () => {
  const [comment, setComment] = useState("");

  const handlePost = () => {
    if (comment.trim() !== "") {
      console.log("Posted:", comment);
      setComment("");
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
    setComment(event.target.value);
  };

  return (
    <React.Fragment>
      <Card>
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
            <Avatar src="https://source.unsplash.com/bh4LQHcOcxE/600x300" />
            <span>
              <Box
                sx={{ marginLeft: "10px", color: "black", fontSize: "1rem" }}
              >
                Jainam Shah
                <Typography sx={{ fontSize: "0.8em",marginTop:'0.3rem' }}>
                  Nov 11, 2022 10:08:30 PM
                </Typography>
                <Typography color="initial" sx={commentStyle }>
                  hello
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

          <TextField
            id="standard-basic"
            label="Write a comment..."
            variant="standard"
            value={comment}
            onChange={handleCommentChange}
            style={{ width: "90%", marginTop: "10px" }}
          />
          <SendIcon sx={{ marginTop: "2rem" }} onClick={handlePost}>
            {" "}
          </SendIcon>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default CommentCollapse;
