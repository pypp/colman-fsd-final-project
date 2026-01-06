import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { Profile } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={"test"} />
        <Route path="/" element={"main"} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
