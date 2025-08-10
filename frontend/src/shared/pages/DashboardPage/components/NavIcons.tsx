import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useDashboardNavbarState } from "@/shared/stores/dashboard.stores";

import userIcon from "@shared/assets/userIcon.svg";
import logoutIcon from "@shared/assets/logoutIcon.svg";
import notebookIcon from "@shared/assets/notebookIcon.svg";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUserInfoStore } from "@/features/auth/stores/userInfo.stores";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

function NavIcons() {
	const { expanded, expandedItem, expandNavbar, collapseNavbar } =
		useDashboardNavbarState();
	const { email, username, syncCredentials } = useUserInfoStore();
    const navigate = useNavigate();

    const syncCredentialsIntervalId = useRef<NodeJS.Timeout>(null);

	useEffect(() => {
		syncCredentials();

		syncCredentialsIntervalId.current = setInterval(() => {
			syncCredentials();
		}, 10 * 1000);

		return () => {
			if (syncCredentialsIntervalId.current) {
				clearInterval(syncCredentialsIntervalId.current);
			}
		};
	}, []);

    
	function handleLogoutButtonClick() {
		navigate("/logout");
	}

	return (
		<div className="flex flex-col items-center w-max p-2 bg-white">
			<Popover>
				<PopoverTrigger asChild>
					<div className="w-10 h-10 p-1 rounded-md hover:bg-gray-300 hover:cursor-pointer">
						<img
							className="w-full h-full"
							alt="Profile Icon"
							src={userIcon}
						/>
					</div>
				</PopoverTrigger>

				<PopoverContent
					side="right"
					sideOffset={16}
					align="start"
					alignOffset={4}
					className="outline-none pt-2 pb-2 pl-2 pr-2 flex flex-col justify-center rounded-md shadow-md bg-white"
				>
					<div className="flex flex-row items-center pr-6">
						<img
							className="w-8 h-8 mr-2"
							alt="Profile Icon"
							src={userIcon}
						/>

						<div className="flex flex-col">
							<h4 className="font-semibold">{username}</h4>
							<p>{email}</p>
						</div>
					</div>

					<button
						role="button"
						aria-label="logout-button"
						onClick={handleLogoutButtonClick}
						className="flex flex-row items-center justify-center w-full outline-none bg-red-500 pt-2 pb-2 text-white rounded-md hover:cursor-pointer hover:bg-red-700 mt-2"
					>
						<img className="w-6 h-6" src={logoutIcon} />
						<p className="text-white outline-none ml-2">Log out</p>
					</button>
				</PopoverContent>
			</Popover>

			<Separator className="mt-2 mb-2 bg-gray-200" />

			<div className="flex flex-col">
				<Tooltip>
					<TooltipTrigger asChild>
						<button
							className="w-8 h-8 p-1 hover:cursor-pointer hover:bg-gray-300 rounded-md"
							type="button"
							id="dashboard-notebooks-trigger"
							aria-label="Notebooks"
							aria-controls="dashboard-notebooks-panel"
							aria-pressed={
								expanded && expandedItem === "notebooks"
							}
							onClick={() => {
								if (!expanded || expandedItem !== "notebooks") {
									expandNavbar("notebooks");
								} else {
									collapseNavbar();
								}
							}}
						>
							<img
								className="w-full h-full"
								alt=""
								aria-hidden="true"
								src={notebookIcon}
							/>
						</button>
					</TooltipTrigger>

					<TooltipContent
						side="right"
						className="bg-gray-950 text-white py-1 px-2 rounded-md"
					>
						<p>Notebooks</p>
					</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
}

export default NavIcons;
