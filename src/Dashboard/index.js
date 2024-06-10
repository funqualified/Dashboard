import Typography from "@mui/joy/Typography";
import { CssVarsProvider } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import CssBaseline from "@mui/joy/CssBaseline";
import * as React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Drawer from "@mui/joy/Drawer";
import Button from "@mui/joy/Button";
import List from "@mui/joy/List";
import Divider from "@mui/joy/Divider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import { useCookies } from "react-cookie";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/joy/Grid";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/joy/Link";

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
      <Box sx={{ display: "flex", position: "absolute", marginTop: "1em", padding: "1em" }}>
        <Button variant="outlined" color="neutral" onClick={toggleDrawer(true)}>
          <MenuIcon />
        </Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ alignSelf: "flex-end", marginTop: "1em", marginRight: "1em" }}>
            <Button variant="outlined" color="neutral" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </Button>
          </Box>
          <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
              <ListItem>
                <Typography variant="h1">FUNapps</Typography>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} href="https://app.funqualified.com/chesstwo">
                  Chess 2: Game of the Year Edition
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} href="https://app.funqualified.com/bingo">
                  Bingo
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton component={Link} href="https://app.funqualified.com/salad">
                  Salad Maker
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    removeCookie("token", { path: "/" });
                    removeCookie("id", { path: "/" });
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
      <Grid container spacing={4} sx={{ display: "flex", marginLeft: "3em", padding: "1em" }}>
        <Grid md={6} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <Typography variant="h1">Dashboard</Typography>
            <Typography variant="p">
              Welcome to your funqualified dashboard. This dashboard is in active development to be the hub for all of the Funqualified apps. In the future, you
              will be able to come here to edit your account details and check your saved sessions for different apps. You can currently find news here for
              recent updates to FUNapps and view your FUNpoints.
            </Typography>
            <Typography variant="p">
              If you have any questions, comments, or concerns, please reach out to via carrier pidgeon, smoke signal, telegraph, telepathy, spreading a rumor
              to that one girl from high school who knows everyone, hand delivering a note, or by emailing us at{" "}
              <Link href="mailto:info@funqualified.com">info@funqualified.com</Link>
            </Typography>
          </Card>
        </Grid>
        <Grid md={3} xs={3} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <Typography variant="h1">User Info</Typography>
            <Typography variant="p">Name: {props.user.username} </Typography>
            <Typography variant="p">Email: {props.user.email} </Typography>
            <Typography variant="p">ID: {props.user.id} </Typography>
          </Card>
        </Grid>
        <Grid md={3} xs={9} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <Typography variant="h1">Points!</Typography>
            <Typography variant="p">You have 0 FUNpoints </Typography>
            <Typography variant="p">FUNfact: There is currently not, and may never be, any way to earn FUNpoints.</Typography>
            <Typography variant="p">FUNfact: FUNpoints are not redeemable for anything.</Typography>
            <Typography variant="p">FUNfact: FUNpoints are not transferable.</Typography>
          </Card>
        </Grid>
        <Grid md={3} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <Typography variant="h1">News</Typography>
            <List>
              <ListItem>Chess 2: Game of the Year Edition has been updated to version 1.0.5.</ListItem>
              <ListItem>Salad Maker is now available from the menu. Go get some procedurally generated salad recipes!</ListItem>
              <ListItem>The Dashboard is now live! Check it out for updates on all of your favorite FUNapps.</ListItem>
            </List>
          </Card>
        </Grid>
        <Grid md={3} xs={12} sx={{ display: "flex", flexDirection: "column" }}>
          <Card>
            <Typography variant="h1">Saves</Typography>
            <Typography variant="p">Saved data coming soon. </Typography>
          </Card>
        </Grid>
      </Grid>
    </CssVarsProvider>
  );
}
