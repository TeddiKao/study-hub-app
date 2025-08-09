import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"

import userIcon from "@shared/assets/userIcon.svg";
import logoutIcon from "@shared/assets/logoutIcon.svg";
import { useNavigate } from "react-router-dom";
import { useUserInfoStore } from "@/features/auth/stores/userInfo.stores";
import { useEffect, useRef } from "react";

function DashboardPage() {
    const navigate = useNavigate();
    const { email, username, syncCredentials } = useUserInfoStore();

    const syncCredentialsIntervalId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        syncCredentialsIntervalId.current = setInterval(() => {
            syncCredentials();
        }, 10 * 1000)

        return () => {
            if (syncCredentialsIntervalId.current) {
                clearInterval(syncCredentialsIntervalId.current)
            }
        }
    })

    function handleLogoutButtonClick() {
        navigate("/logout");
    }

	return (
		<>
			<div className="flex flex-row justify-center fixed top-0 bottom-0 w-max p-2 bg-white">
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
			</div>
		</>
	);
}

export default DashboardPage;
