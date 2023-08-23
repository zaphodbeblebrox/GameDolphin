import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ cheats }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedGames, setDisplayedGames] = useState([]);

    useEffect(() => {
        const uniqueGamesSet = new Set(cheats.map((cheat) => cheat.game));
        const uniqueGamesArr = Array.from(uniqueGamesSet);
        const filteredGames = uniqueGamesArr.filter((game) =>
            game.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        filteredGames.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        setDisplayedGames(filteredGames);
    }, [cheats, searchQuery]);

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <div className="flex justify-center items-center py-16 sm:py-24 lg:py-32 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-4 flex items-center">
                        <Link
                            to="/gamedolphin/create"
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                        >
                            Add Cheat
                        </Link>
                        <input
                            type="text"
                            name="search-bar"
                            id="search-bar"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search"
                            className="ml-2 w-64 rounded-md border-0 bg-gray-800 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>
            <table className="mx-auto max-w-7xl px-6 lg:px-8 -mt-10">
                <thead>
                    <tr>
                        <th className="text-white">Available Games</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedGames.map((game, idx) => (
                        <tr key={idx}>
                            <td>
                                <Link
                                    to={`/gamedolphin/${game}`}
                                    className="text-white hover:text-indigo-500"
                                >
                                    {game}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="absolute left-1/2 bottom-0 -z-10 -translate-x-1/2 blur-3xl xl:-bottom-6" aria-hidden="true">
                <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
            </div>
        </div>
    );
};

export default Dashboard;
