import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography } from "@mui/material";

const ProfileHeader: React.FC = () => {
  return (
    <Box
      sx={{
        height: ["250px", "350px", "400px"],
        backgroundColor: "white",
        display: "flex",
        borderRadius: "10px",
        backgroundImage: `url("https://source.unsplash.com/gVBIohdCRUQ")`,
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        objectFit: "contain",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Button
        sx={{
          width: "200px",
          backgroundColor: "#0006",
          color: "white",
          margin: "0 2rem 1rem 0",
        }}
      >
        <FaceIcon />{" "}
        <Typography sx={{ margin: "0 0.5rem", fontSize: "13px" }}>
          Create With Avatar
        </Typography>
      </Button>{" "}
      <Button
        sx={{
          width: "200px",
          backgroundColor: "#0006",
          color: "white",
          margin: "0 2rem 1rem 0",
        }}
      >
        <CameraAltIcon />{" "}
        <Typography sx={{ margin: "0 0.5rem", fontSize: "13px" }}>
          Add Cover Photo
        </Typography>
      </Button>
    </Box>
  );
};

export default ProfileHeader;
