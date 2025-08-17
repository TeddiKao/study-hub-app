import NavIcons from "./components/NavIcons";
import NavPanel from "./components/NavPanel";

function Navbar() {
    return (
        <nav className="flex flex-row sticky top-0 h-screen" aria-label="Dashboard navigation bar">
            <NavIcons />
            <NavPanel />
        </nav>
    )
}

export default Navbar;