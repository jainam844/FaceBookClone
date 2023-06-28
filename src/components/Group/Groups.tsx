import React, { useRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Avatar } from "@mui/material";

const GroupData = [
  {
    img: "https://source.unsplash.com/bY4cqxp7vos",
    title: "Cricket Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/lBhhnhndpE0",
    title: "Football Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/hTv8aaPziOQ",
    title: "Party Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/CiUR8zISX60",
    title: "Movie Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/UmV2wr-Vbq8",
    title: "Travel Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/MsCgmHuirDo",
    title: "GYM Club",
    description: "434 members...",
  },
  {
    img: "https://source.unsplash.com/IGfIGP5ONV0",
    title: "Food Club",
    description: "434 members...",
  },
];

const UserFriend = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      top: -100,
      left: -200, // adjust the scroll amount as per your needs
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      top: 0,
      left: 200, // adjust the scroll amount as per your needs
      behavior: "smooth",
    });
  };

  const theme = createTheme(); // Create an empty theme

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "100%",
          maxHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            padding: 3,
            fontSize: "2rem",
            bgcolor: "#f0f2f5",
          }}
        >
          Recent Activity
          <Box
            sx={{
              padding: 3,
              maxHeight: "500px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <Typography
              sx={{
                margin: "1.5rem 1.5rem 0 1.3rem",
                fontSize: "22px",
                fontWeight: 600,
                fontFamily: "initial",
                marginTop: "1rem",
              }}
            >
              Suggested For You
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                width: "100%",
                backgroundColor: "white",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
              ref={scrollContainerRef}
            >
              <div style={{ display: "flex" }}>
                {GroupData.map((item, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      flex: "0 0 auto",
                      cursor: "pointer",
                      margin: "0 8px",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        marginTop: "1rem",
                        boxShadow: "none",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          height: [300, 250, 220, 220, 200],
                          width: "100%",
                          borderRadius: "5px",
                        }}
                        height="140"
                        image={item.img}
                        alt={item.title}
                      />
                      <CardContent sx={{ paddingTop: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            margin: "0.5rem 0 0 0.2rem",
                            fontSize: " 20px",
                            fontWeight: "500",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontSize: "13px" }}
                          color="textSecondary"
                        >
                          {item.description}
                        </Typography>
                        <Box sx={{ display: "flex", marginTop: "0.3rem" }}>
                          <Avatar
                            src="https://source.unsplash.com/bh4LQHcOcxE/600x300"
                            sx={{ border: "2px solid white", zIndex: "100" }}
                          />
                          <Avatar
                            src="https://source.unsplash.com/cqtw4QCfbQg/600x300"
                            sx={{
                              marginLeft: "-15px",
                              border: "2px solid white",
                              zIndex: "80",
                            }}
                          />
                          <Avatar
                            src="https://source.unsplash.com/QhR78CbFPoE/600x300"
                            sx={{
                              marginLeft: "-15px",
                              border: "2px solid white",
                              zIndex: "70",
                            }}
                          />
                          <Typography sx={{ fontSize: "15px", color: "gray" }}>
                            Jainam and 10 Friend
                            <br />
                            are Members
                          </Typography>
                        </Box>
                      </CardContent>

                      <CardActions>
                        <Button size="small" color="primary">
                          Join Group
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </div>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "8px",
              }}
            >
              <Button
                onClick={scrollLeft}
                sx={{ color: "black", fontSize: "2rem" }}
              >
                ←
              </Button>
              <Button
                onClick={scrollRight}
                sx={{ color: "black", fontSize: "2rem" }}
              >
                →
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserFriend;
