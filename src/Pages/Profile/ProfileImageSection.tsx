import React, { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import UserContext from "../../components/Context/UserContext";
interface TotalFriend {
  fromUserName: string;
  fromAvatar: string;
  requestId: number;
  fromUserId: number;
  isFriend: boolean;
  isRejected: boolean;
  requestType: string;
  RequestType1: string;
  status: string;
  avatarUrl: string;
  toUserName: string;
  createdAt: string;
  toUserId: number;
  toAvatar: string;
  firstName: string;
  lastName: string;
  avatar: string;
}
interface Props {
  totalFriend: TotalFriend | TotalFriend[];
  avatarRecords: TotalFriend[];
}
const ProfileHeaderSection: React.FC<Props> = ({
  totalFriend,
  avatarRecords,
}) => {
  const { userData, userimageUrl } = useContext(UserContext);

  return (
    <React.Fragment>
      <Grid item xs={12} sm={12} md={3} lg={3}>
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
        item
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
