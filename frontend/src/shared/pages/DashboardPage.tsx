import userIcon from "@shared/assets/userIcon.svg";

function DashboardPage() {
    return (
        <>
            <div className="flex flex-row fixed top-0 bottom-0 w-max pt-1 pb-1 pl-1 pr-3">
                <img className="w-8 h-8" alt="Profile Icon" src={userIcon} />
                <div className="flex flex-column">
                    
                </div>
            </div>
        </>
    )
}

export default DashboardPage;