import { useState, type JSX } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { Add, SendOutlined, HomeOutlined, LogoutOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import UploadPostModal from "../components/UploadPostModal";
import { useAuth } from "../contexts/AuthContext";

const Navbar = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <>
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

            <IconButton title="Create Post" onClick={() => setIsUploadModalOpen(true)}>
              <Add />
            </IconButton>

            <IconButton title="Direct Messages" component={Link} to="/direct-messages">
              <SendOutlined />
            </IconButton>

            <IconButton title="Profile" component={Link} to={`/${user?.username}`}>
              <Avatar
                sx={{ width: 24, height: 24 }}
                src={user?.avatarUrl || "https://i.pravatar.cc/150"}
              />
            </IconButton>

            <IconButton
              title="Logout"
              onClick={handleLogout}
              sx={{ color: "error.main" }}
            >
              <LogoutOutlined />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <UploadPostModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
