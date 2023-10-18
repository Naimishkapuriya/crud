import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Validation from "./Validation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./SignUp";
import Error from "./Error";
import Login from "./Login";
// import Demo from "./Demo";

function App() {
  const isCreate = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />}></Route>
          {/* <Route path="/demo" element={<Demo/>}></Route> */}
          <Route path="/create" element={<Validation isCreate={isCreate} />}></Route>
          <Route path="/update/:EditId" element={<Validation isUpdate={isCreate} />}></Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" autoClose={1000} />
    </>
  );
}

export default App;
