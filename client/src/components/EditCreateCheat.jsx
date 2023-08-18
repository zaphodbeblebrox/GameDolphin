import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditCreateCheat = (props) => {
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

    const AddPlatformHandler = (e) => {
        e.preventDefault();
        const platformHolder = [...platformArray];
        platformHolder.push(platform);
        setPlatformArray([...platformHolder]);
    };

    const SaveDataHandler = (e) => {
        e.preventDefault();
    };

    const RemoveSelectionHandler = (e, idx) => {
        e.preventDefault();
        const platformHolder = [...platformArray];
        platformHolder.splice(idx, 1);
        setPlatformArray([...platformHolder]);
    };

    return (
        <form onSubmit={(e) => SaveDataHandler(e)}>
            <div>
                <label htmlFor="game-name">Game:</label>
                <input type="text" name="game-name" id="game-name" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="cheat-description">Cheat Description:</label>
                <input
                    type="text"
                    name="cheat-description"
                    id="cheat-description"
                    value={cheatDescription}
                    onChange={(e) => setCheatDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="cheat-instructions">Cheat Instructions:</label>
                <input
                    type="text"
                    name="cheat-instructions"
                    id="cheat-instructions"
                    value={cheatInstructions}
                    onChange={(e) => setCheatInstructions(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="add-platform">Add a Platform:</label>
                <select name="add-platform" id="add-platform" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                    {platformOptions.map((platform, idx) => {
                        return (
                            <option key={idx} value={platform}>
                                {platform}
                            </option>
                        );
                    })}
                </select>
                <button onClick={(e) => AddPlatformHandler(e)}>+</button>
                <div>
                    {platformArray.map((selectedPlatform, idx) => {
                        return (
                            <button key={idx} onClick={(e) => RemoveSelectionHandler(e, idx)}>
                                {selectedPlatform}
                            </button>
                        );
                    })}
                </div>
            </div>
        </form>
    );
};

export default EditCreateCheat;
