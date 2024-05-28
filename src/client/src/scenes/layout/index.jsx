import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <Box className="layout" sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: "1rem",
          p: 3,
          width: { sm: `calc(100% - 240px)` }, // Assuming the sidebar is 240px wide
          maxWidth: "1200px",
          minHeight: "100vh", // Full viewport height
          backgroundColor: (theme) => theme.palette.background.default, // Using theme background color
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
