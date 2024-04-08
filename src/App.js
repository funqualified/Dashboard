import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import { useCookies } from "react-cookie";

function App() {
  const [screen, setScreen] = useState("login");
  const [cookies] = useCookies(["token", "id"]);

  useEffect(() => {
    if (cookies.token && cookies.id) {
      setScreen("dashboard");
    }
  }, [cookies]);

  const APIurl = process.end.API_URL;

  return (
    <div className="App">
      {screen === "login" && <Login APIurl={APIurl} setScreen={setScreen} />}
      {screen === "signup" && <Signup APIurl={APIurl} setScreen={setScreen} />}
      {screen === "dashboard" && <Dashboard APIurl={APIurl} setScreen={setScreen} />}
    </div>
  );
}

export default App;
