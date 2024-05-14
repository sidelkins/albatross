import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { SportsGolf, ManageSearch } from "@mui/icons-material";
import GolfBagIcon from "../assets/GolfBagIcon"; // Import the React component
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

const drawerWidth = 320;

const Sidebar = () => {
  const theme = useTheme();
  const location = useLocation();

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: <SportsGolf />,
    },
    {
      name: "Round History",
      path: "/history",
      icon: <ManageSearch />,
    },
    {
      name: "My Bag",
      path: "/bag",
      icon: (
        <GolfBagIcon
          color={theme.palette.accent.default}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
      ),
    },
  ];

  return (
    <Box className="sidebarContainer">
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.default,
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            p: "0rem 2rem 0rem 3rem",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box className="logoContainer">
          <Typography>
            <h2>Albatross</h2>
          </Typography>
        </Box>
        <Box className="navList">
          <List>
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem
                  key={index}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    backgroundColor: isActive
                      ? theme.palette.background.active
                      : "transparent",
                    borderRadius: "12px",
                    margin: "0.2rem 0rem",
                    "&:hover": {
                      backgroundColor: theme.palette.background.hover,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      fontSize: "24px",
                      minWidth: "46px",
                      color: isActive
                        ? theme.palette.accent.default
                        : theme.palette.text.primary,
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      color: isActive
                        ? theme.palette.accent.default
                        : theme.palette.text.primary,
                    })}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
