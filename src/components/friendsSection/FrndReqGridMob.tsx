import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const FrndReqGridMob: React.FC = () => {
  const parentGridStyle: React.CSSProperties = {
    background: "white",
    padding: [1],
    borderRadius: 2,
    display: ["flex", "none"],
    width: "100%",
  };

  const avatarStyle: React.CSSProperties = {
    margin: "-7px",
    border: "3px solid white",
    zIndex: 5,
    width: 20,
    height: 20,
  };

  const confirmBtnStyle: React.CSSProperties = {
    background: "#1877f2",
    width: "90%",
    "&:hover": {
      background: "#1877f2",
      display: "flex",
      justifyContent: "center",
      boxShadow: "0 2px 3px gray",
    },
  };

  const deleteBtnStyle: React.CSSProperties = {
    background: "#e5e5e5",
    width: "90%",
    "&:hover": {
      background: "#e5e5e5",
      display: "flex",
      justifyContent: "center",
      boxShadow: "0 2px 3px gray",
    },
  };

  const frndDetailBoxStyle = {
    display: "flex",
    margin: "0 7px",
    alignItems: "center",
    padding: 0,
  };

  const btnTextStyle: React.CSSProperties = {
    fontSize: 14,
    textTransform: "none",
  };

  return (
    <React.Fragment>
      {Array.from(Array(2)).map((_, index) => (
        <Grid key={index} sx={parentGridStyle}>
          <Grid
            item
            xs={3}
            sm={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ width: [70, 80], height: [70, 80] }}></Avatar>
          </Grid>
          <Grid item xs={9} sm={10}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: 16 }}
            >
              Friend name
            </Typography>
            <Box sx={frndDetailBoxStyle}>
              <Avatar sx={avatarStyle} />
              <Avatar sx={avatarStyle} />
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ marginLeft: "15px", width: 180, fontSize: 15 }}
              >
                2 mutual friends
              </Typography>
            </Box>
            <Grid
              container
              sx={{ marginTop: 1, justifyContent: "space-between" }}
            >
              <Grid item xs={5.8}>
                <Button sx={confirmBtnStyle}>
                  <Typography variant="body2" sx={btnTextStyle} color="white">
                    Confirm
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={5.8}>
                <Button sx={deleteBtnStyle}>
                  <Typography variant="body2" color="black" sx={btnTextStyle}>
                    Delete
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default FrndReqGridMob;
