import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ cheats }) => {
    const [searchQuery, setSearchQuery] = useState("");

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
            <h3 className="headers">Available Games</h3>
            <table>
                <thead>
                    <tr>
                        <th>Games</th>
                    </tr>
                </thead>
                <tbody>
                    {cheats.map((game) => {
                        return (
                            <tr key={game._id}>
                                <td>
                                    <Link to={`/gamedolphin/${game.game}`}>{game.game}</Link>
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
