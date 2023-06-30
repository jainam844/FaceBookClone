import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";

const CreateStory = (): JSX.Element => {
  return (
    <Paper
      sx={{
        height: 180,
        width: 100,
        margin: "10px",
        backgroundImage: `url("https://cdn.pixabay.com/photo/2023/06/14/09/18/trees-8062668_1280.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        padding: "15px 15px",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      <AddIcon
        sx={{
          // backgroundColor: "white",
          color: "white",
          borderRadius: "50%",
          border: "2px solid white",
          padding: "5px",
        }}
      />

      <Typography
        variant="subtitle2"
        sx={{
          position: "absolute",
          bottom: 10,
          left: 10,
          fontWeight: "600",
          color: "#ffffff",
        }}
      >
        Add to Story
      </Typography>
    </Paper>
  );
};

export default CreateStory;
