import userIcon from "@shared/assets/userIcon.svg";

function DashboardPage() {
	return (
		<>
			<div className="flex flex-row justify-center fixed top-0 bottom-0 w-max p-3 bg-white">
				<img className="w-8 h-8" alt="Profile Icon" src={userIcon} />
				<div className="flex flex-column"></div>
			</div>
		</>
	);
}

export default DashboardPage;
