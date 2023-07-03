import React from "react";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";

interface Friend {
  fromUserName: string;
  // Add other properties of the Friend object if applicable
}

const handleConfirm = () => {
  console.log("Confirmed friend with id:");
};

const handleDelete = () => {
  console.log("Deleted friend with id:");
};

const FriendList = ({ friend }: { friend: Friend }) => {
  return (
    <React.Fragment>
      <List
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          padding: "2rem 5rem",
        }}
      >
        <React.Fragment>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ marginBottom: "1rem", minWidth: 300 }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src={"https://source.unsplash.com/bh4LQHcOcxE/600x300"}
                    />
                  }
                  title={friend.fromUserName}
                />
                <Divider />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      marginTop: "0.8rem",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      src={"https://source.unsplash.com/bh4LQHcOcxE/600x300"}
                      sx={{
                        border: "2px solid white",
                        zIndex: 100,
                        width: 30,
                        height: 30,
                        marginLeft: "-15px",
                      }}
                    />

                    <Typography sx={{ fontSize: "15px", color: "gray" }}>
                      Friend are Members
                    </Typography>
                  </Box>
                  <Box sx={{ marginTop: "0.8rem" }}>
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "5px" }}
                      onClick={() => handleConfirm()}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderRadius: "5px",
                        marginLeft: "1rem",
                        borderColor: "gray",
                        color: "white",
                        backgroundColor: "gray",
                        "&:hover": {
                          backgroundColor: "darkgray",
                          borderColor: "gray",
                        },
                      }}
                      onClick={() => handleDelete()}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {/* Second card */}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {/* Third card */}
            </Grid>
          </Grid>
        </React.Fragment>
      </List>
    </React.Fragment>
  );
};

export default FriendList;
