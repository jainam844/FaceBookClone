import React from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import ProfileDialog from "./ProfileDialog";
import { UserData } from "../../Models/User";


interface EditProfileProps {
  userData: UserData;
}

const EditProfile: React.FC<EditProfileProps> = ({ userData }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundImage: "linear-gradient(45deg, #b71c1c, #ff5252)",
          color: "white",
          borderRadius: "30px",
          padding: "12px 24px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s",
          "&:hover": {
            backgroundImage: "linear-gradient(45deg, #880e4f, #c51162)",
            transform: "scale(1.05)",
          },
        }}
      >
        <EditIcon />
        <Typography
          sx={{
            marginLeft: "0.5rem",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Edit a Profile
        </Typography>
      </Button>
      <ProfileDialog open={open} handleClose={handleClose} userData={userData} />
    </React.Fragment>
  );
};

export default EditProfile;
