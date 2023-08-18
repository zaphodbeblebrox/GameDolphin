import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = (props) => {
    const location = useLocation();

    return (
        <div>
            <h1>Game Dolphin</h1>
            <h4>Your One Stop for Cheats for Classic Video Games!</h4>
            {location.pathname !== "/gamedolphin/dashboard" && <Link to={"/gamedolphin/dashboard"}>Home</Link>}
        </div>
    );
};

export default Header;
