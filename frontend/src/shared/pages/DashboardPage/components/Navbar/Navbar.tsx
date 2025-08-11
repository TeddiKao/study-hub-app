import NavIcons from "./components/NavIcons";
import NavPanel from "./components/NavPanel";

function Navbar() {
    return (
        <div className="flex flex-row">
            <NavIcons />
            <NavPanel />
        </div>
    )
}

export default Navbar;