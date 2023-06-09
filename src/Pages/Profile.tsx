import React, { useEffect, useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography, Avatar } from "@mui/material";
import UserContext from "../components/Context/UserContext";
const Profile = () => {
  const { userData, userimageUrl } = useContext(UserContext);

  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          maxHeight: "100vh",
        }}
      >
        <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
          <Box
            sx={{
              height: ["250px", "350px", "400px"],
              // width: '100%',
              backgroundColor: "white",
              display: "flex",
              borderRadius: "10px",
              backgroundImage: `url('https://source.unsplash.com/gVBIohdCRUQ')`,
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
          <Grid xs={12} sm={12} md={3} lg={3}>
            <Avatar
              src={userimageUrl}
              sx={{
                height: [100, 100, 200, 200],
                width: [100, 100, 200, 200],
                border: "2px solid white",
                margin: ["-2rem auto 0 auto", "-2rem auto 0 auto"],
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
