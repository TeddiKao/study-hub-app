import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/routes/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage/DashboardPage";
import LogoutRoute from "@/features/auth/pages/LogoutRoute";
import AuthRoute from "@/features/auth/components/routes/AuthRoute";
import NotebooksPage from "@/features/noteTaking/pages/NotebooksPage/NotebooksPage";
import useTokenRefreshInterval from "@/features/auth/hooks/useTokenRefreshInterval";
import NotesPage from "@/features/noteTaking/pages/NotesPage";

export const queryClient = new QueryClient();

function App() {
	useTokenRefreshInterval();

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
						<Route path="/notebooks/:noteId" element={<NotesPage />} />
					</Route>

					<Route path="/logout" element={<LogoutRoute />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
