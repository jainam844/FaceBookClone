import React from "react";
import Header from "../components/Header/Header";
import Widget from "../components/Widget/Widget";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Outlet } from "react-router-dom";
import HeaderIcons from "../components/Header/HeaderIcons";

import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/Sidebar/side";

const HomeApp = () => {
  const widgetVisible = true;
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div className="header">
          <Header />

          <Box
            sx={{
              display: ["flex", "flex", "none"],
              boxShadow: ["0px 5px 7px -7px rgba(0, 0, 0, 0.75)"],
              justifyContent: "center",
              margin: "0.1rem 0rem",
              backgroundColor: "white",
              padding: " 0.3rem 0.5rem",
              position: ["sticky", "sticky", "sticky"],
              top: 0,
              zIndex: 100,
            }}
          >
            <HeaderIcons />
          </Box>
        </div>
      </Box>

      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            maxWidth: "300px",
            display: ["none", "none", "block"],
            marginTop: "-1rem",
            zIndex: 1,
          }}
        >
          <Sidebar />
        </Box>
        <Box
          sx={{
            marginLeft: ["0%", "0%", "300px"],
            width: ["100%", "100%", "calc(80% - 300px)"], // Adjust the width here
            maxWidth: ["100%", "100%", "calc(80% - 300px)"], // Adjust the maxWidth here
            backgroundColor: "#f0f2f5",
            zIndex: 0,
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Outlet />
          </Box>
        </Box>
        <Box sx={{ width: "20%", display: ["none", "none","none", "block"] }}>
          <Widget sx={{ width: "100%", maxWidth: "100%" }} />{" "}
          {/* Update widget width and maxWidth */}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default HomeApp;
