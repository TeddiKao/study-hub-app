import { useEffect, type ChangeEvent, type FormEvent } from "react";
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

type AuthFieldsLower = "email" | "username" | 'password'

interface AuthFieldMap {
	email: { value: string, setter: (newEmail: string) => void }
	username: { value: string, setter: (newUsername: string) => void },
	password: { value: string, setter: (newPassword: string) => void }
}

function AuthFormInput({ fieldName }: AuthFormInputProps) {
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

	const fieldMap: AuthFieldMap = {
		email: { value: email,  setter: updateEmail },
		username: { value: username, setter: updateUsername },
		password: { value: password, setter: updatePassword }
	}

	const field = fieldMap[fieldName.toLowerCase() as AuthFieldsLower]
	const fieldValue = field["value"];
	const fieldSetter = field["setter"];
	
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		fieldSetter(e.target.value);
	}

	return (
		<div className="flex flex-col mb-3">
			<p className="font-semibold ml-1">{fieldName}</p>
			<input
				className="bg-gray-200 rounded-md pl-2 pt-2 pb-2"
				type={fieldType}
				placeholder={`Enter your ${fieldName.toLowerCase()}`}
				value={fieldValue}
				onChange={handleChange}
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
	const { email, username, password, clearAllFields, clearPassword } = useAuthCredentialsStore((state) => state);
	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			clearAllFields();
		}
	}, []);

	async function handleSignup() {
		const response = await handleUserCreation({ email, username, password })
		clearPassword();

		if (!response.success) {
			throw new Error(response.error)
		}

		await handleLogin();
	}

	async function handleLogin() {
		const response = await handleUserLogin({ email, password });
		clearPassword();

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
