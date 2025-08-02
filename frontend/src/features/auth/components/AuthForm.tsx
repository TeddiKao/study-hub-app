import type { ChangeEvent, FormEvent } from "react";
import { useAuthCredentialsStore } from "../stores/authForm.stores";
import { handleUserCreation, handleUserLogin } from "../utils/auth.services";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../constants";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

interface AuthFormHeadingProps extends AuthFormProps {}
interface AuthFormSubmitButtonProps extends AuthFormProps {}

interface AuthFormInputProps {
	fieldName: string;
}

function AuthFormInput({ fieldName }: AuthFormInputProps) {
	function getCredentialValue() {
		switch (fieldName.toLowerCase()) {
			case "email":
				return email;

			case "username":
				return username;

			case "password":
				return password;

			default:
				throw new Error(`Invalid field name ${fieldName}`)
		}
	}

	function getCredentialSetter() {
		switch (fieldName.toLowerCase()) {
			case "email":
				return (e: ChangeEvent<HTMLInputElement>) => {
					updateEmail(e.target.value)
				};

			case "username":
				return (e: ChangeEvent<HTMLInputElement>) => {
					updateUsername(e.target.value)
				};

			case "password":
				return (e: ChangeEvent<HTMLInputElement>) => {
					updatePassword(e.target.value)
				};

			default:
				throw new Error(`Invalid field ${fieldName}`)
		}
	}

	const fieldType =
		fieldName.toLowerCase() === "password" ? "password" : "text";

	const {
		email,
		username,
		password,
		updateEmail,
		updateUsername,
		updatePassword,
	} = useAuthCredentialsStore((state) => state);

	return (
		<div className="flex flex-col mb-3">
			<p className="font-semibold ml-1">{fieldName}</p>
			<input
				className="bg-gray-200 rounded-md pl-2 pt-2 pb-2"
				type={fieldType}
				placeholder={`Enter your ${fieldName.toLowerCase()}`}
				value={getCredentialValue()}
				onChange={getCredentialSetter()}
			/>
		</div>
	);
}

function AuthFormHeading({ authMethod }: AuthFormHeadingProps) {
	return (
		<h1 className="text-4xl text-center font-semibold mb-3">
			{authMethod}
		</h1>
	);
}

function AuthFormSubmitButton({ authMethod }: AuthFormSubmitButtonProps) {
	return (
		<button className="bg-sky-500 pt-2 pb-2 text-white rounded-md hover:cursor-pointer hover:bg-sky-700">
			{authMethod}
		</button>
	);
}

function AuthForm({ authMethod }: AuthFormProps) {
	const { email, username, password } = useAuthCredentialsStore((state) => state);
	const navigate = useNavigate();

	async function handleSignup() {
		const response = await handleUserCreation({ email, username, password })
		if (!response.success) {
			throw new Error(response.error)
		}

		await handleLogin();
	}

	async function handleLogin() {
		const response = await handleUserLogin({ email, password });
		if (!response.success) {
			throw new Error(response.error)
		}

		localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);

		navigate("/home");
	}

	function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (authMethod === "Login") {
			handleLogin();
		} else {
			handleSignup();
		}
	}

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<form
				className="rounded-md bg-white flex flex-col w-full max-w-md pl-3 pr-3 pt-3 pb-3 shadow-xl"
				onSubmit={handleFormSubmit}
			>
				<AuthFormHeading authMethod={authMethod} />

				<AuthFormInput fieldName="Email" />

				{authMethod === "Sign up" && (
					<AuthFormInput fieldName="Username" />
				)}

				<AuthFormInput fieldName="Password" />

				<AuthFormSubmitButton authMethod={authMethod} />
			</form>
		</div>
	);
}

export default AuthForm;
