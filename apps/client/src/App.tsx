import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={"test"} />
        <Route path="/" element={"main"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
