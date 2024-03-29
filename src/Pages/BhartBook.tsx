import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import fbImgLogo from "../assets/BharatBook1.png";
const BhartBook = () => {
  return (
    <React.Fragment>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            marginLeft: [0, 0, 0], 
          }}
        >
          <img
            src={fbImgLogo}
            alt=""
            width={400}
            style={{ mixBlendMode: "multiply" }}
          />

          <Typography sx={{ fontWeight: "bold", marginTop: "1rem" }}>
            Connect with Friends and the world <br /> around you on BharatBook
          </Typography>
        </Box>
      </Grid>
    </React.Fragment>
  );
};
export default BhartBook;
