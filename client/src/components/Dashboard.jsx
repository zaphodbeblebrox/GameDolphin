import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ cheats }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedGames, setDisplayedGames] = useState([]);

    useEffect(() => {
        // Create an unique Set of game names
        const uniqueGamesSet = new Set(cheats.map((cheat) => cheat.game));
        // Convert into an Array
        const uniqueGamesArr = Array.from(uniqueGamesSet);
        // Filter based on Search Quarry
        const filteredGames = uniqueGamesArr.filter((game) => game.toLowerCase().startsWith(searchQuery.toLowerCase()));
        filteredGames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        setDisplayedGames(filteredGames);
    }, [cheats, searchQuery]);

    return (
        <div>
            <div>
                <Link to={"/gamedolphin/create"}>Add Cheat</Link>
                <input
                    type="text"
                    name="search-bar"
                    id="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Available Games</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedGames.map((game, idx) => {
                        return (
                            <tr key={idx}>
                                <td>
                                    <Link to={`/gamedolphin/${game}`}>{game}</Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
