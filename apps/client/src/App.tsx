import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Profile } from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={"test"} />
          <Route path="/" element={"main"} />
          <Route path="/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
