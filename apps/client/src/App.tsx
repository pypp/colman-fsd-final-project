import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DirectMessages, Home, Profile } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { JSX } from "react";
import { Navbar } from "./layouts";
import { Box } from "@mui/material";

const queryClient = new QueryClient();

const App = (): JSX.Element => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Navbar />

      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          height: "calc(100vh - 64px)",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/direct-messages" element={<DirectMessages />} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </Box>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
