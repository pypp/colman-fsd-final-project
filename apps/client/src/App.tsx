import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DirectMessages, Home, Profile } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { JSX } from "react";
import { Navbar } from "./layouts";
import { Box } from "@mui/material";
import { useAuth } from "./contexts/AuthContext";
import AuthPage from "./pages/Auth";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

const queryClient = new QueryClient();

const App = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {user && <Navbar />}

        <Box
          sx={{
            maxWidth: 1200,
            width: "100%",
            margin: "0 auto",
            height: "calc(100vh - 64px)",
          }}
        >
          <Routes>
            <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/direct-messages" element={<DirectMessages />} />
              <Route path="/:username" element={<Profile />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
