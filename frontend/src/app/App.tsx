import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/routes/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage/DashboardPage";
import LogoutRoute from "@/features/auth/pages/LogoutRoute";
import AuthRoute from "@/features/auth/components/routes/AuthRoute";
import NotebooksPage from "@/features/notes/pages/NotebookPage/NotebooksPage";
import { useEffect, useRef } from "react";
import { handleTokenRefresh } from "@/features/auth/utils/authTokens.services";

export const queryClient = new QueryClient();

function App() {
	const tokenRefreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	useEffect(() => {
		tokenRefreshIntervalRef.current = setInterval(async () => {
			handleTokenRefresh();
		}, 30 * 1000 * 0.8)

		return () => {
			if (!tokenRefreshIntervalRef.current) return;

			clearInterval(tokenRefreshIntervalRef.current);
		}
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoute />}>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
					</Route>

					<Route element={<ProtectedRoute />}>
						<Route path="/home" element={<DashboardPage />} />
						<Route path="/notebooks" element={<NotebooksPage />} />
					</Route>

					<Route path="/logout" element={<LogoutRoute />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
