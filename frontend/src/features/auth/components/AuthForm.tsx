interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

function AuthForm({ authMethod }: AuthFormProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="rounded-sm bg-white flex flex-col w-full max-w-md mx-auto">
				<h1 className="text-4xl text-center font-semibold">
					{authMethod}
				</h1>

				<input
					className="bg-gray-50 pl-2 pt-2 pb-2"
					type="text"
					placeholder="Email"
				/>

				<input
					className="bg-gray-50 pl-2 pt-2 pb-2"
					type="text"
					placeholder="Password"
				/>
			</div>
		</div>
	);
}

export default AuthForm;
