import NavIcons from "./components/NavIcons";
import NavPanel from "./components/NavPanel";

function Navbar() {
    return (
        <nav className="flex flex-row shrink-0 h-full" aria-label="Dashboard navigation bar">
            <div className="flex flex-col shrink-0 overflow-y-auto bg-white">
                <NavIcons />
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-100">
                <NavPanel />
            </div>
        </nav>
    )
}

export default Navbar;