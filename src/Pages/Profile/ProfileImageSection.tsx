import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserContext from "../../components/Context/UserContext";

const ProfileHeaderSection = ({ totalFriend, avatarRecords }) => {
  const { userData, userimageUrl } = useContext(UserContext);
  return (
    <React.Fragment>
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
      <Grid
        xs={12}
        sm={12}
        md={7}
        lg={6}
        sx={{
          margin: "1rem 0",
          display: "flex",
          alignItems: ["center", "center", "flex-start"],
          flexDirection: ["column"],
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {userData.firstName + " " + userData.lastName}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", fontWeight: 550, color: "gray" }}>
          {` ${totalFriend} Friends`}
        </Typography>
        <Box sx={{ display: "flex", marginRight: 0.5 }}>
          {avatarRecords.map((avatarRecord) => (
            <Avatar
              key={avatarRecord.requestId}
              src={avatarRecord.avatarUrl}
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
    </React.Fragment>
  );
};

export default ProfileHeaderSection;
