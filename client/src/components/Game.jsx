import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { cheatApi } from "../services/apiAddress";

const Game = ({ cheats, setCheats }) => {
    const { gameId } = useParams();
    const [displayedGame, setDisplayedGame] = useState([]);

    useEffect(() => {
        setDisplayedGame(cheats.filter((cheat) => cheat.game === gameId));
    }, [cheats]);

    const DeleteCheatHandler = (e, cheatId) => {
        e.preventDefault();
        axios
            .delete(`${cheatApi}/${cheatId}`)
            .then((res) => {
                const temp = cheats.filter((cheat) => cheat._id !== cheatId);
                setCheats([...temp]);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-8">
            <table className="w-full border-collapse border border-gray-700 rounded-md bg-gray-900 mt-8">
                <thead>
                    <tr>
                        <th className="text-white bg-gray-800 py-2 px-4">Description</th>
                        <th className="text-white bg-gray-800 py-2 px-4">Instructions</th>
                        <th className="text-white bg-gray-800 py-2 px-4">Platforms Affected</th>
                        <th className="text-white bg-gray-800 py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedGame.map((cheat, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{cheat.description}</td>
                                <td>{cheat.instructions}</td>
                                <td>
                                    {cheat.platform.map((item, idy) => (
                                        <p key={idy}>{item}</p>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/gamedolphin/update/${cheat._id}`}>Update</Link>
                                    <button onClick={(e) => DeleteCheatHandler(e, cheat._id)} className="text-red-500">  Delete </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
    
};

export default Game;
