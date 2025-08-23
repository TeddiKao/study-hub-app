import Navbar from "@/shared/pages/DashboardPage/components/Navbar/Navbar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
	children: ReactNode;
}

interface ContentProps extends DashboardLayoutProps {}

function Content({ children }: ContentProps) {
	return <main className="flex-1 overflow-y-auto">{children}</main>;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="flex flex-row h-screen overflow-hidden">
			<Navbar />
			<Content>{children}</Content>
		</div>
	);
}

export default DashboardLayout;
