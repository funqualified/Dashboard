import { Typography } from "@mui/material";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import * as React from "react";
import Box from "@mui/joy/Box";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { useCookies } from "react-cookie";
import { Link as RouterLink } from "react-router-dom";

export default function Dashboard(props) {
  const [open, setOpen] = React.useState(false);
  const [, , removeCookie] = useCookies(["token", "id"]);

  const toggleDrawer = (inOpen) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "50vw", // must be `vw` only
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Typography level="title-lg">Dashboard placeholder</Typography>
      <Box sx={{ display: "flex" }}>
        <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
          Open drawer
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
                <ListItem key={text}>
                  <ListItemButton>{text}</ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text) => (
                <ListItem key={text}>
                  <ListItemButton>{text}</ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    removeCookie("token");
                    removeCookie("id");
                  }}
                  component={RouterLink}
                  to="/dashboard/login">
                  Logout
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </Box>
    </CssVarsProvider>
  );
}
