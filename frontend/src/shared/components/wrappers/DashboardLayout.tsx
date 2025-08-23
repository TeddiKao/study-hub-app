import { cn } from "@/lib/utils";
import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import type { ReactNode } from "react";

interface ContentProps {
    children: ReactNode;
}

interface DashboardLayoutProps extends ContentProps {
    className?: string;
}

function Content({ children }: ContentProps) {
	return <main className="flex-1 overflow-y-auto min-w-0">{children}</main>;
}

function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
    return (
		<div className={cn("flex flex-row h-screen overflow-hidden", className)}>
			<Navbar />
			<Content>{children}</Content>
		</div>
	);
}

export default DashboardLayout;
