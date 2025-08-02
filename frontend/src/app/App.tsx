import LoginPage from "@/features/auth/pages/LoginPage";
import SignupPage from "@/features/auth/pages/SignupPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./global.css";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import DashboardPage from "@/shared/pages/DashboardPage";

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
			</Routes>
		</BrowserRouter>
	);
}

export default App;
