import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "./Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-nljmj7hiqiooqvx4.us.auth0.com"
    clientId="e9fOWV7Q9GwKxRgZoks4vYqw9YPIRvzS"
    redirectUri={window.location.origin}
  >
    <BrowserRouter>
    <Navbar/>
   
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/create" element={<CreatePost />}></Route>
        <Route path="/create/posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);
