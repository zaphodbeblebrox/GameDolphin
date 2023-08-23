import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
    const location = useLocation();

    return (
        <div className="bg-gray-900 text-white border-b-2 border-yellow-500 mt-2">
            <h1 className="text-4xl font-bold tracking-tight mb-2 sm:text-5xl">Game Dolphin</h1>
            <p className="text-lg mb-4">Your One Stop for Cheats for Classic Video Games!</p>
            {location.pathname !== "/gamedolphin/dashboard" && (
            <Link
            to={"/gamedolphin/dashboard"}
            className="block rounded-md px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-100 focus:outline-none focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
    >Home</Link>
    )}
</div>

    );
};

export default Header;


