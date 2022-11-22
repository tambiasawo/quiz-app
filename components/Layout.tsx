import { Box, FormControlLabel, Switch } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import React, { ReactFragment } from "react";
import Head from "next/head";
import { useSession, signOut, getSession } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import useAnswerContext from "../context/answerContext";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
const drawerWidth = 240;

interface Props {
  children: any;
}

const Layout = ({ children }: Props) => {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleSignOut = async () => {
    signOut();
  };

  const { changeTheme, theme } = useAnswerContext();

  const drawer = (
    <div className="bg-[#027fff] h-full text-white">
      <Toolbar />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Link href="/">
              <ListItemText>Home</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <Link href="/results">
              <ListItemText>My Results</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <Link href="/profile">
              <ListItemText>Profile</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="relative ">
      <Head>
        <title>Questionnare</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {" "}
        {session ? (
          <Box sx={{ display: "flex" }}>
            <AppBar
              position="fixed"
              sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
                display: { sm: "none" },
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, display: { md: "none" } }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  Quiz App
                </Typography>
              </Toolbar>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", sm: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <div className="absolute top-0 right-5">
              <LightModeIcon />

              <Switch
                checked={theme}
                onChange={changeTheme}
                inputProps={{ "aria-label": "controlled" }}
              />
              <NightlightIcon />
            </div>
            {children}
          </Box>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
};
export default Layout;
