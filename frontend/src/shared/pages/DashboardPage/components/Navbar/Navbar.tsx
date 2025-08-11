import NavIcons from "./components/NavIcons";
import NavPanel from "./components/NavPanel";

function Navbar() {
    return (
        <nav className="flex flex-row" aria-label="Dashboard navigation bar">
            <NavIcons />
            <NavPanel />
        </nav>
    )
}

export default Navbar;