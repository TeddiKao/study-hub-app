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
	return <main className="flex-1 overflow-y-auto">{children}</main>;
}

function DashboardLayout({ children, className = "" }: DashboardLayoutProps) {
	const baseClasses = "flex flex-row h-screen overflow-hidden"
    
    return (
		<div className={cn(baseClasses, className)}>
			<Navbar />
			<Content>{children}</Content>
		</div>
	);
}

export default DashboardLayout;
