interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

function AuthForm({ authMethod }: AuthFormProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="rounded-sm bg-white shadow- flex flex-col w-full max-w-md mx-auto pl-3 pr-3 pt-3 pb-3 shadow-xl">
				<h1 className="text-4xl text-center font-semibold mb-3">
					{authMethod}
				</h1>

				<input
					className="bg-gray-100 pl-2 pt-2 pb-2 mb-3"
					type="text"
					placeholder="Email"
				/>

				<input
					className="bg-gray-100 pl-2 pt-2 pb-2"
					type="text"
					placeholder="Password"
				/>
			</div>
		</div>
	);
}

export default AuthForm;
