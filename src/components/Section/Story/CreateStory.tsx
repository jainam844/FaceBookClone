import { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import FormDialog from "./FormDialog";
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
            height: 210,
            width: 130,
            margin: "10px",
            borderRadius: "10px",
            position: "relative",
            overflow: "hidden",

            cursor: "pointer",
          }}
        >
          <div
            style={{
              height: "50%",
              backgroundImage:
                'url("https://images.pexels.com/photos/994605/pexels-photo-994605.jpeg?auto=compress&cs=tinysrgb&w=1600")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            style={{
              height: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f3f3f3",
              padding: "10px",
            }}
          >
            <AddIcon
              sx={{
                color: "white",
                fontSize: 32,
                marginBottom: "8px",
                border: "2px solid white",
                borderRadius: "50%",
                backgroundColor: "#1F75FE",
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Create Story
            </Typography>
          </div>
        </Paper>
      </Box>
      <FormDialog
        open={open}
        onClose={handleClose}
        handlenewStory={handlenewStory}
      />
    </>
  );
};

export default CreateStory;
