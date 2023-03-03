import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import Header from "./Component/Header";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add" element={<AddUser />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
