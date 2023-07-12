import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import FormDialog from "./FormDialog";
import Box from "@mui/material/Box";
import { IStory } from "../../../Models/Story";
interface CreateStoryProps {
  handlenewStory: (storyData: IStory) => void;
}

const CreateStory: React.FC<CreateStoryProps> = ({ handlenewStory }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>
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
              color: "white",
              borderRadius: "50%",
              border: "2px solid white",
              padding: "5px",
              cursor: "pointer",
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
      </Box>
      <FormDialog open={open} onClose={handleClose} handlenewStory={handlenewStory} />
    </>
  );
};

export default CreateStory;
