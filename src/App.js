import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import ConfirmEmail from "./ConfirmEmail";
import ResetPassword from "./ResetPassword";
import ResetPasswordRequest from "./ResetPasswordRequest";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  const APIurl = process.env.REACT_APP_API_URL;
  const [cookie] = useCookies(["token", "id"]);
  const [user, setUser] = React.useState({ username: "Loading", email: "Loading", id: "Loading" });
  const [userStatus, setUserStatus] = React.useState("Loading");

  //If the user has a token, use it to get the user's information
  React.useEffect(() => {
    const token = cookie.token;
    const id = cookie.id;
    if (token) {
      fetch(`${APIurl}accounts?action=getAccountInfo&token=${token}&id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setUserStatus("LoggedIn");
        })
        .catch((error) => {
          console.error("Error:", error);
          setUserStatus("Error");
        });
    }
  }, [cookie, APIurl, setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout userStatus={userStatus} />}>
          <Route path="/dashboard/login" element={<Login APIurl={APIurl} user={user} userStatus={userStatus} />} />
          <Route path="/dashboard/signup" element={<Signup APIurl={APIurl} />} />
          <Route path="/dashboard/home" element={<Dashboard APIurl={APIurl} user={user} />} />
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

function Layout(props) {
  const navigate = useNavigate();
  const redirectURL = new URLSearchParams(window.location.search).get("redirect");

  React.useEffect(() => {
    if (props.userStatus === "LoggedIn") {
      if (redirectURL) {
        window.location.href = redirectURL;
      } else {
        navigate("/dashboard/home");
      }
    }
  }, [props.userStatus, navigate, redirectURL]);

  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
