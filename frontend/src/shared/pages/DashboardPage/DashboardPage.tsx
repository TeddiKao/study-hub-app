import NavIcons from "./components/Navbar/components/NavIcons";
import NavPanel from "./components/Navbar/components/NavPanel";

function DashboardPage() {
	return (
		<div className="flex flex-row fixed top-0 bottom-0">
			<NavIcons />
			<NavPanel />
		</div>
	);
}

export default DashboardPage;
