import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";

import userIcon from "@shared/assets/userIcon.svg";
import logoutIcon from "@shared/assets/logoutIcon.svg";
import notebookIcon from "@shared/assets/notebookIcon.svg";

import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/features/auth/stores/userInfo.stores";
import { useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
} from "@/components/ui/tooltip";
import NotebookIcon from "../components/icons/NotebookIcon";
import { useDashboardNavbarState } from "../stores/dashboard.stores";

function DashboardPage() {
	const navigate = useNavigate();
	const { email, username, syncCredentials } = useUserInfoStore();
	const { expanded, expandedItem, expandNavbar, collapseNavbar } =
		useDashboardNavbarState();

	const syncCredentialsIntervalId = useRef<NodeJS.Timeout | null>(null);

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
		<div className="flex flex-row fixed top-0 bottom-0">
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
							<p className="text-white outline-none ml-2">
								Log out
							</p>
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
								aria-pressed={expanded && expandedItem === "notebooks"}
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

			{expanded && (
				<div className="flex flex-col bg-gray-100 py-3 pl-3 pr-10">
					<p className="text-sm text-gray-500 mb-1 pl-1">Notebooks</p>
					<div className="flex flex-row mb-0.5 p-1 items-center">
						<div className="p-1 bg-purple-500 rounded-sm">
							<NotebookIcon className="fill-white" size={20} />
						</div>
						<p className="ml-2">History</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default DashboardPage;
