import {} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import View from "./pages/View";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/update/:id" element={<AddUser />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
