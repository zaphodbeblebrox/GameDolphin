import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ cheats }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedGames, setDisplayedGames] = useState([]);

    useEffect(() => {
        const uniqueGamesSet = new Set(cheats.map((cheat) => cheat.game));
        const uniqueGamesArr = Array.from(uniqueGamesSet);
        const filteredGames = uniqueGamesArr.filter((game) => game.toLowerCase().startsWith(searchQuery.toLowerCase()));
        setDisplayedGames(filteredGames);
    }, [searchQuery]);

    return (
        <div>
            <div>
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
