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
    // const [cheats, setCheats] = useState([
    //     { game: "minecraft", _id: "3asd4f351fsa63" },
    //     { game: "dark Souls", _id: "s165gf1sdf651d" },
    // ]);
    const [cheats, setCheats] = useState([]);

    // TODO: axios in DB
    useEffect(() => {
        axios
            .get(`${cheatApi}`)
            .then((res) => {
                const sortedData = res.data.sort((a, b) => a.game.localeCompare(b.game));
                setCheats(sortedData);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => console.log(cheats), [cheats]);

    return (
        <BrowserRouter Router>
            <div className="App">
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
