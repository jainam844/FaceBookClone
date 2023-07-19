import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import RecommendIcon from "@mui/icons-material/Recommend";
import CardContent from "@mui/material/CardContent";
interface PostCardContentProps {
  text: string;
  likeCount: number;
  commentsCount: number;
}

const PostCardContent: React.FC<PostCardContentProps> = ({
  text,
  likeCount,
  commentsCount,
}) => {
  return (
    <React.Fragment>
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
          {text}
        </Typography>
      </CardContent>
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
            <Typography color="initial">{likeCount} Likes</Typography>
          </span>

          <Typography color="initial">{commentsCount} comments</Typography>
        </Box>
      </CardContent>
    </React.Fragment>
  );
};

export default PostCardContent;
