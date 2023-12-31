import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Dashboard from "./components/Dashboard";
import EditCreateCheat from "./components/EditCreateCheat";
import Game from "./components/Game";
import Header from "./components/Header";
import { cheatApi } from "./services/apiAddress";
import { useEffect, useState } from "react";

function App() {
    const [cheats, setCheats] = useState([]);
    const backgroundImage = "/static/images/80s_neon.jpg";

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh", // Take up full viewport height
        width: "100vw", // Take up full viewport width
    };

    useEffect(() => {
        axios
            .get(`${cheatApi}`)
            .then((res) => {
                setCheats(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => console.log(cheats), [cheats]);

    return (
        <BrowserRouter Router>
            <div className="App" style={containerStyle}>
                <div>
                    <Header />
                </div>
                <Routes>
                    <Route path="/" element={<Navigate to="/gamedolphin/dashboard" />} />
                    <Route path="/gamedolphin/dashboard" element={<Dashboard cheats={cheats} />} />
                    <Route path="/gamedolphin/create" element={<EditCreateCheat cheats={cheats} setCheats={setCheats} />} />
                    <Route path="/gamedolphin/update/:cheatId" element={<EditCreateCheat cheats={cheats} setCheats={setCheats} />} />
                    <Route path="/gamedolphin/:gameId" element={<Game cheats={cheats} setCheats={setCheats} />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
