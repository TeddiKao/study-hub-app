interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

interface AuthFormInputProps {
	fieldName: string
}

function AuthFormInput({ fieldName }: AuthFormInputProps) {
	const fieldType = fieldName.toLowerCase() === "password" ? "password" : "text";

	return (
		<div className="flex flex-col mb-3">
			<p className="font-semibold ml-1">{fieldName}</p>
			<input
				className="bg-gray-200 rounded-md pl-2 pt-2 pb-2"
				type={fieldType}
				placeholder={`Enter your ${fieldName.toLowerCase()}`}
			/>
		</div>
	);
}

function AuthForm({ authMethod }: AuthFormProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<form className="rounded-md bg-white shadow- flex flex-col w-full max-w-md pl-3 pr-3 pt-3 pb-3 shadow-xl">
				<h1 className="text-4xl text-center font-semibold mb-3">
					{authMethod}
				</h1>

				<AuthFormInput fieldName="Email" />
				<AuthFormInput fieldName="Password" />

				<button className="bg-sky-500 pt-2 pb-2 text-white rounded-md hover:cursor-pointer hover:bg-sky-700">
					{authMethod}
				</button>
			</form>
		</div>
	);
}

export default AuthForm;
