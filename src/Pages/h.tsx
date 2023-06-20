import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography, Avatar, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const profileButtonStyles = {
  padding: "0.5rem",
  background: "#1877f2",
  color: "white",
  borderRadius: "10px",
  "&:hover": {
    background: "#1877f2",
  },
};

const profileButtonIcon = {
  fontSize: ["1rem", "1rem", "0.7rem"],
};
const ButtonTypo = {
  fontSize: ["0.7rem", "0.7rem", "0.5rem", "0.8rem"],
};

type MutualFriends = {
  logo: string;
};
const mutualFriendsList: MutualFriends[] = [
  { logo: "https://shorturl.at/ftHU9" },
  { logo: "https://shorturl.at/syIJZ" },
  {
    logo: "https://cdn.pixabay.com/photo/2023/04/11/04/59/bird-7915772_1280.jpg",
  },
  {
    logo: "https://cdn.pixabay.com/photo/2023/05/02/15/52/support-7965543_640.jpg",
  },
  {
    logo: "https://cdn.pixabay.com/photo/2023/04/11/04/59/bird-7915772_1280.jpg",
  },
];

const Profile = () => {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          maxHeight: "100vh",
          overflow: "scroll",
        }}
      >
        <Grid xs={12} sm={12} md={9} item sx={{ margin: "auto" }}>
          <Box
            sx={{
              height: ["250px", "350px", "400px"],
              backgroundColor: "lightgray",
              display: "flex",
              borderRadius: "10px",
              backgroundImage: `url("https://shorturl.at/cnJQV")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              objectFit: "contain",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              padding: "1rem",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <FaceIcon />{" "}
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "none",
                  margin: "0 0.2rem",
                  display: ["none", "none", "block"],
                }}
              >
                {" "}
                Create With Avtar
              </Typography>
            </Button>
            <Button
              sx={{
                backgroundColor: "#0006",
                color: "white",
                margin: "0 2rem 1rem 0",
              }}
            >
              <CameraAltIcon />{" "}
              <Typography
                sx={{
                  fontSize: "15px",
                  textTransform: "none",
                  margin: "0 0.2rem",
                  display: ["none", "none", "block"],
                }}
              >
                Add Cover Photo
              </Typography>
            </Button>
          </Box>

          <Grid
            container
            justifyContent="center"
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              margin: "1rem auto",
              width: "95%",
            }}
          >
            <Grid item xs={12} sm={12} md={3} lg={3}>
              <Avatar
                src="https://shorturl.at/rwB46"
                sx={{
                  height: [100, 100, 130, 150],
                  width: [100, 100, 130, 150],
                  margin: ["-2rem auto 0 auto", "-2rem auto 0 auto"],
                  border: "2px solid white",
                  marginTop: "-2rem",
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={9}
              sx={{
                display: "flex",
                flexDirection: ["column", "column", "row", "row"],
              }}
            >
              <Grid
                xs={12}
                sm={12}
                md={7}
                lg={6}
                sx={{
                  margin: "1rem 0",
                  display: "flex",
                  justifyContent: ["center", "center", "flex-start"],
                  alignItems: ["center", "center", "flex-start"],
                  flexDirection: ["column"],
                }}
              >
                <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                  Viral Patel
                </Typography>
                <Typography
                  sx={{ fontSize: "0.8rem", fontWeight: 550, color: "gray" }}
                >
                  1.9k Friends
                </Typography>
                <Box sx={{ display: "flex", marginRight: 0.5 }}>
                  {mutualFriendsList.map((friend, index) => (
                    <Avatar
                      key={index}
                      src={friend.logo}
                      sx={{
                        width: 30,
                        height: 30,
                        marginLeft: "-5px",
                        zIndex: 15,
                        border: "1px solid white",
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid
                xs={12}
                sm={12}
                md={5}
                lg={6}
                sx={{
                  display: "flex",
                  flexDirection: ["column", "column", "row"],
                  justifyContent: ["center", "center", "flex-end"],
                  alignItems: ["center", "center", "flex-end"],
                }}
              >
                <Grid
                  item
                  sx={{ margin: ["0.3rem 0", "0.3rem 0", "0 0.4rem"] }}
                >
                  <Button sx={profileButtonStyles} disableRipple>
                    <AddIcon sx={profileButtonIcon} />{" "}
                    <Typography
                      sx={{
                        ...ButtonTypo,
                        marginLeft: "0.3rem",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Add to Story
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  sx={{ margin: ["0.3rem 0", "0.3rem 0", "0 0.4rem"] }}
                >
                  <Button
                    disableRipple
                    sx={{
                      ...profileButtonStyles,
                      backgroundColor: "#e5e5e5",
                      color: "black",
                      "&:hover": {
                        color: "black",
                        backgroundColor: "#e5e5e5",
                      },
                    }}
                  >
                    <EditIcon sx={profileButtonIcon} />{" "}
                    <Typography
                      sx={{
                        ...ButtonTypo,
                        marginLeft: "0.3rem",
                        textTransform: "none",
                        fontWeight: "bold",
                      }}
                    >
                      Edit a Profile
                    </Typography>
                  </Button>
                </Grid>
                <Grid
                  item
                  sx={{ margin: ["0.3rem 0", "0.3rem 0", "0 0.4rem"] }}
                >
                  <Button
                    disableRipple
                    sx={{
                      padding: ["0.3rem", "0.3rem", "0.2rem", "0.4rem"],
                      backgroundColor: "#e5e5e5",
                      color: "black",
                      "&:hover": {
                        color: "black",
                        backgroundColor: "#e5e5e5",
                      },
                    }}
                  >
                    <ExpandMoreIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;