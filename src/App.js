import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ConfirmEmail from "./ConfirmEmail";
import ResetPassword from "./ResetPassword";
import ResetPasswordRequest from "./ResetPasswordRequest";

function App() {
  const APIurl = process.env.REACT_APP_API_URL;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />}>
          <Route path="/dashboard/login" element={<Login APIurl={APIurl} />} />
          <Route path="/dashboard/signup" element={<Signup APIurl={APIurl} />} />
          <Route path="/dashboard/home" element={<Dashboard APIurl={APIurl} />} />
          <Route path="/dashboard/confirmEmail" element={<ConfirmEmail APIurl={APIurl} />} />
          <Route path="/dashboard/resetPassword" element={<ResetPassword APIurl={APIurl} />} />
          <Route path="/dashboard/resetPasswordRequest" element={<ResetPasswordRequest APIurl={APIurl} />} />
          <Route path="/dashboard/" element={<Login APIurl={APIurl} />} />
        </Route>
        <Route path="/" element={<Login APIurl={APIurl} />} />
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
