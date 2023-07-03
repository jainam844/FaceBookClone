import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

const FrndReqCard = () => {
    const parentGridStyle: React.CSSProperties = {
        background: "white",
        padding: [1],
        borderRadius: 2,
        display: ['none', 'flex'],
      };
      const cardStyle: React.CSSProperties = {
        width: 200,
        boxShadow: "0 4px 15px #d6d6d4",
        marginBottom: 3,
        borderRadius: 3,
        position: "relative",
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
        marginBottom: 1,
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
        marginBottom: 1,
        marginLeft: '0px !important',
        "&:hover": {
          background: "#e5e5e5",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 2px 3px gray",
        },
      };

      const btnTextStyle: React.CSSProperties = {
        fontSize: 18,
        textTransform: "none",
      };
  return (
    <React.Fragment>
      <Grid sx={parentGridStyle}>
        <Grid
          container
          justifyContent="start"
          spacing={2}
          sx={{
          }}
        >
          {Array.from(Array(2)).map((_, index) => (
            <Grid key={index} item>
              <Card sx={cardStyle}>
                <CardMedia
                  sx={{ height: 180 }}
                  image="https://source.unsplash.com/random/800x600?pattern"
                  title="green iguana"
                />
                <CardContent sx={{padding: "5px 16px 0"}}>
                  <Typography gutterBottom variant="h6" component="div" >
                    Friend name
                  </Typography>
                </CardContent>
                <CardContent
                  sx={{
                    display: "flex",
                    margin: "0 20px",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <Avatar sx={avatarStyle} />
                  <Avatar sx={avatarStyle} />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginLeft: "15px", width: 180, fontSize: 15 }}
                  >
                    2 mutual friends
                  </Typography>
                </CardContent>
                <CardActions sx={{ display: "flex",flexDirection: 'column', justifyContent: "center"}}>
                  <Button sx={confirmBtnStyle}>
                    <Typography
                      variant="body2"
                      sx={btnTextStyle}
                      color="white"
                    >
                      Confirm
                    </Typography>
                  </Button>
                  <Button sx={deleteBtnStyle}>
                    <Typography
                      variant="body2"
                      color="black"
                      sx={btnTextStyle}
                    >
                      Delete
                    </Typography>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default FrndReqCard;
