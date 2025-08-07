import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/routes/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage";
import LogoutRoute from "@/features/auth/pages/LogoutRoute";
import AuthRoute from "@/features/auth/components/routes/AuthRoute";

function App() {
	return (
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

				<Route path="/logout" element={<LogoutRoute />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
