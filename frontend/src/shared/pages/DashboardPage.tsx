import userIcon from "@shared/assets/userIcon.svg";

function DashboardPage() {
	return (
		<>
			<div className="flex flex-row justify-center fixed top-0 bottom-0 w-max p-2 bg-white">
				<div className="w-8 h-8 p-1 rounded-md hover:bg-gray-300 hover:cursor-pointer">
                    <img className="w-full h-full" alt="Profile Icon" src={userIcon} />
                </div>
				
			</div>
		</>
	);
}

export default DashboardPage;
