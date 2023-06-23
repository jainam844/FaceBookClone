import { Box } from "@mui/material";

import SidebarIcons from "./sidebaricon";

const Sidebar = (): JSX.Element => {
  return (
    <Box
      sx={{
        // height: '77vh',
        boxShadow: "0px 5px 17px -7px rgba(0, 0, 0, 0.75)",
        width: ["35%", "35%", "18%"],
        display: ["none", "none", "block"],
      }}
    >
      <SidebarIcons />
    </Box>
  );
};
export default Sidebar;
