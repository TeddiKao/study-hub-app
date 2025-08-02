interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

function AuthForm({ authMethod }: AuthFormProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<form className="rounded-md bg-white shadow- flex flex-col w-full max-w-md mx-auto pl-3 pr-3 pt-3 pb-3 shadow-xl">
				<h1 className="text-4xl text-center font-semibold mb-3">
					{authMethod}
				</h1>

				<div className="flex flex-col mb-3">
					<p className="font-semibold ml-1">Email</p>
					<input
						className="bg-gray-200 rounded-md pl-2 pt-2 pb-2"
						type="text"
						placeholder="Enter your email"
					/>
				</div>

				<div className="flex flex-col mb-3">
					<p className="font-semibold ml-1">Password</p>
					<input
						className="bg-gray-200 rounded-md pl-2 pt-2 pb-2"
						type="text"
						placeholder="Enter your password"
					/>
				</div>

				<button className="bg-sky-500 pt-2 pb-2 text-white rounded-md">{authMethod}</button>
			</form>
		</div>
	);
}

export default AuthForm;
