// src/App.jsx
import React from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import "./App.css";

const App = () => {
    return (
        <>
            <Navbar />
            <main style={{ marginTop: "60px" }}>
                <Landing />
            </main>
        </>
    );
};

//

export default App;
