import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { cheatApi } from "../services/apiAddress";

const EditCreateCheat = ({ cheats, setCheats }) => {
    const { cheatId } = useParams();
    const platformOptions = [
        "NES",
        "Super NES",
        "N64",
        "Gamecube",
        "Wii",
        "Switch",
        "Xbox",
        "Xbox 360",
        "Xbox One",
        "Xbox Series X",
        "Playstation",
        "PS2",
        "PS3",
        "PS4",
        "PS5",
        "Gameboy",
        "Gameboy Color",
        "Gameboy Advanced",
        "DS",
        "3DS",
        "Dreamcast",
        "PC",
        "Atari",
        "Genesis",
    ];

    const [gameName, setGameName] = useState("");
    const [cheatInstructions, setCheatInstructions] = useState("");
    const [cheatDescription, setCheatDescription] = useState("");
    const [platform, setPlatform] = useState(platformOptions[0]);
    const [platformArray, setPlatformArray] = useState([]);

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (cheatId !== undefined) {
            axios
                .get(`${cheatApi}/${cheatId}`)
                .then((res) => {
                    setGameName(res.data.game);
                    setCheatInstructions(res.data.instructions);
                    setCheatDescription(res.data.description);
                    setPlatformArray(res.data.platform);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const AddPlatformHandler = (e) => {
        e.preventDefault();
        const platformHolder = [...platformArray];
        platformHolder.push(platform);
        setPlatformArray([...platformHolder]);
    };

    const SaveDataHandler = (e) => {
        e.preventDefault();
        const cheatObj = {
            game: gameName,
            instructions: cheatInstructions,
            description: cheatDescription,
            platform: platformArray,
        };
        console.log(cheatObj.platform.length);
        if (cheatId === undefined) {
            axios
                .post(`${cheatApi}`, cheatObj)
                .then((res) => {
                    setCheats([...cheats, res.data]);
                    navigate("/gamedolphin/dashboard");
                })
                .catch((err) => {
                    const errArray = [];
                    // console.log(err);
                    for (const key of Object.keys(err.response.data.errors)) {
                        errArray.push(err.response.data.errors[key].message);
                    }
                    console.log(errArray);
                    setErrors(errArray);
                });
        } else {
            axios
                .patch(`${cheatApi}/${cheatId}`, cheatObj)
                .then((res) => {
                    const temp = cheats.filter((cheat) => cheat._id !== cheatId);
                    temp.push(res.data);
                    setCheats([...temp]);
                    navigate("/gamedolphin/dashboard");
                })
                .catch((err) => {
                    const errArray = [];
                    // console.log(err);
                    for (const key of Object.keys(err.response.data.errors)) {
                        errArray.push(err.response.data.errors[key].message);
                    }
                    console.log(errArray);
                    setErrors(errArray);
                });
        }
    };

    const RemoveSelectionHandler = (e, idx) => {
        e.preventDefault();
        const platformHolder = [...platformArray];
        platformHolder.splice(idx, 1);
        setPlatformArray([...platformHolder]);
    };
    return (
        <form onSubmit={(e) => SaveDataHandler(e)} className=" text-white min-h-screen p-8">
            <div>
                {errors.map((err, idx) => {
                    return <p key={idx}>{err}</p>;
                })}
            </div>
            <div className="mb-4 flex flex-col items-start justify-start">
                <div className="game-name w-1/4 flex flex-row m-2">
                    <label htmlFor="game-name" className="block text-white font-semibold mr-3 whitespace-nowrap">
                        Game:
                    </label>
                    <input
                        type="text"
                        name="game-name"
                        id="game-name"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        style={{ width: "30ch" }}
                        className=" w-full bg-gray-800 rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="cheat-description w-3/4 flex flex-row m-2">
                    <label htmlFor="cheat-description" className="block text-white font-semibold mr-3 whitespace-nowrap">
                        Cheat Description:
                    </label>
                    <input
                        type="text"
                        name="cheat-description"
                        id="cheat-description"
                        value={cheatDescription}
                        onChange={(e) => setCheatDescription(e.target.value)}
                        className="w-full bg-gray-800 rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="cheat-instructions w-1/4 mr-4 flex flex-row m-2">
                    <label htmlFor="cheat-instructions" className="block text-white font-semibold mr-3 whitespace-nowrap">
                        Cheat Instructions:
                    </label>
                    <input
                        type="text"
                        name="cheat-instructions"
                        id="cheat-instructions"
                        value={cheatInstructions}
                        onChange={(e) => setCheatInstructions(e.target.value)}
                        className="w-full bg-gray-800 rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="platform w-3/4 flex flex-row m-2">
                    <label htmlFor="add-platform" className="block text-white font-semibold mr-3 whitespace-nowrap">
                        Add a Platform:
                    </label>
                    <select
                        name="add-platform"
                        id="add-platform"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="w-full bg-gray-800 rounded-md border-0 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    >
                        {platformOptions.map((platform, idx) => {
                            return (
                                <option key={idx} value={platform}>
                                    {platform}
                                </option>
                            );
                        })}
                    </select>
                    <button
                        onClick={(e) => AddPlatformHandler(e)}
                        className="rounded-md bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Add
                    </button>
                </div>
                <div className="mt-4">
                    <div>
                        {platformArray.map((selectedPlatform, idx) => {
                            return (
                                <button
                                    key={idx}
                                    onClick={(e) => RemoveSelectionHandler(e, idx)}
                                    className="rounded-md bg-gray-800 px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50 mr-2"
                                >
                                    {selectedPlatform}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
            <button className="rounded-md bg-indigo-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50">
                {cheatId !== undefined ? "Update" : "Create"}
            </button>
        </form>
    );
};

export default EditCreateCheat;
