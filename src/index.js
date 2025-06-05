// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";          // глобальные стили
import { BrowserRouter } from "react-router-dom"; // даже если мы не используем Routes, оставить BrowserRouter не мешает

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
