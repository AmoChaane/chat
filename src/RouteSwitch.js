import React from "react";
import { BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import App from "./App";
import Editor from "./components/editor/Editor"


const RouteSwitch = () => {
  console.log('routeSwitch');
  return (
    <HashRouter>
      <Routes> 
        <Route path="/" element={<App />} /> {/* This link is the homepage bcos it's the first one */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </HashRouter>
  );
};


export default React.memo(RouteSwitch);