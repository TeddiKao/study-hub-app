import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/features/auth/constants";

function Logout() {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(REFRESH_TOKEN_KEY);

	return <Navigate to="/login" />
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/home" element={
					<ProtectedRoute>
						<DashboardPage />
					</ProtectedRoute>
				} />
				<Route path="/logout" element={<Logout />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
