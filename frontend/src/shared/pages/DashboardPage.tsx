import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@radix-ui/react-popover";
import userIcon from "@shared/assets/userIcon.svg";

function DashboardPage() {
	return (
		<>
			<div className="flex flex-row justify-center fixed top-0 bottom-0 w-max p-2 bg-white">
				<Popover>
					<PopoverTrigger asChild>
						<div className="w-8 h-8 p-1 rounded-md hover:bg-gray-300 hover:cursor-pointer">
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
						className="outline-none p-2 flex flex-row items-center rounded-md shadow-md bg-white"
					>
						<img
							className="w-full h-full mr-2"
							alt="Profile Icon"
							src={userIcon}
						/>

                        <div className="flex flex-col">
                            <h4 className="font-semibold">TeddiKao</h4>
                            <p>teddikao@gmail.com</p>
                        </div>
					</PopoverContent>
				</Popover>
			</div>
		</>
	);
}

export default DashboardPage;
