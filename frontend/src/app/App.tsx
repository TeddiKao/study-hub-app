import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/routes/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage/DashboardPage";
import LogoutRoute from "@/features/auth/pages/LogoutRoute";
import AuthRoute from "@/features/auth/components/routes/AuthRoute";
import NotebooksPage from "@/features/notes/pages/NotebooksPage";

export const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={
							<AuthRoute>
								<LoginPage />
							</AuthRoute>
						}
					/>

					<Route
						path="/signup"
						element={
							<AuthRoute>
								<SignupPage />
							</AuthRoute>
						}
					/>

					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<DashboardPage />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/notebooks"
						element={
							<ProtectedRoute>
								<NotebooksPage />
							</ProtectedRoute>
						}
					/>

					<Route path="/logout" element={<LogoutRoute />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
