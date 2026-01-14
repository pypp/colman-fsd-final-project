import type { JSX } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Add, SendOutlined, HomeOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  // for now this is hardcoded, this will be passed fom the auth context
  const myusername = "netanel";

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #dbdbdb",
        height: 64,
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            // fontFamily: "'Billabong', cursive",
            fontSize: 28,
            color: "#000",
            userSelect: "none",
            textDecoration: "none",
          }}
          component={Link}
          to="/"
        >
          Website
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton title="Home" component={Link} to="/">
            <HomeOutlined />
          </IconButton>
          <IconButton title="Create Post">
            <Add />
          </IconButton>
          <IconButton title="Direct Messages" component={Link} to="/direct-messages">
            <SendOutlined />
          </IconButton>
          <IconButton title="Profile" component={Link} to={`/${myusername}`}>
            <Avatar sx={{ width: 24, height: 24 }} src="https://i.pravatar.cc/150" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
