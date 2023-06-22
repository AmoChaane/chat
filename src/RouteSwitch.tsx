import React from "react";
import { Routes, Route, HashRouter} from "react-router-dom";
import App from "./App";
import Editor from "./components/editor/Editor"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"


const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes> 
        <Route path="/" element={<App />} /> {/* This link is the homepage bcos it's the first one */}
        <Route path="/editor" element={<Editor />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
      </Routes>
    </HashRouter>
  );
};


export default React.memo(RouteSwitch);