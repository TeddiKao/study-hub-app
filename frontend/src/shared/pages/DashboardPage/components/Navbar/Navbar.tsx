import NavIcons from "./components/NavIcons";
import NavPanel from "./components/NavPanel";

function Navbar() {
    return (
        <nav className="flex flex-row fixed top-0 bottom-0" aria-label="Dashboard navigation bar">
            <NavIcons />
            <NavPanel />
        </nav>
    )
}

export default Navbar;