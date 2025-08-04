import { useEffect, type ChangeEvent, type FormEvent } from "react";
import {
	useAuthCredentialsStore,
	useAuthErrorsStore,
} from "../stores/authForm.stores";
import { handleUserCreation, handleUserLogin } from "../utils/auth.services";
import {
	ACCESS_TOKEN_KEY,
	REFRESH_TOKEN_KEY,
} from "../constants/tokenKeys.constants";
import { useNavigate } from "react-router-dom";
import formatErrorMessage from "../utils/authErrors";
import ErrorAlert from "@/shared/components/alerts/ErrorAlert";
import { useLoginErrorAlertVisibleStore, useSignupErrorAlertVisibleStore } from "../stores/authErrorAlerts.stores";

interface AuthFormProps {
	authMethod: "Login" | "Sign up";
}

interface AuthFormHeadingProps extends AuthFormProps {}
interface AuthFormSubmitButtonProps extends AuthFormProps {}

interface AuthFormInputProps {
	fieldName: string;
}

interface ErrorMessagesProps {
	errorMessages: string[];
}

type AuthFieldsLower = "email" | "username" | "password";

interface AuthFieldMap {
	email: { value: string; setter: (newEmail: string) => void };
	username: { value: string; setter: (newUsername: string) => void };
	password: { value: string; setter: (newPassword: string) => void };
}

function ErrorMessages({ errorMessages }: ErrorMessagesProps) {
	return (
		<div className="flex flex-col">
			{errorMessages.map((errorMessage, index) => (
				<p className="text-red-500 mt-1" key={index}>
					{formatErrorMessage(errorMessage)}
				</p>
			))}
		</div>
	);
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

	const { fields: errorFields } = useAuthErrorsStore((state) => state);

	const fieldMap: AuthFieldMap = {
		email: { value: email, setter: updateEmail },
		username: { value: username, setter: updateUsername },
		password: { value: password, setter: updatePassword },
	};

	const field = fieldMap[fieldName.toLowerCase() as AuthFieldsLower];
	const fieldValue = field["value"];
	const fieldSetter = field["setter"];

	const errors = errorFields[fieldName.toLowerCase() as AuthFieldsLower];

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		fieldSetter(e.target.value);
	};

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
			<ErrorMessages errorMessages={errors} />
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
	const { email, username, password, clearAllFields, clearPassword } =
		useAuthCredentialsStore((state) => state);
	const { updateErrors, general: generalErrors } = useAuthErrorsStore();

	const {
		visible: signupAlertVisible,
		closeAlert: closeSignupAlert,
		showAlert: showSignupAlert,
	} = useSignupErrorAlertVisibleStore();

	const {
		visible: loginAlertVisible,
		closeAlert: closeLoginAlert,
		showAlert: showLoginAlert,
	} = useLoginErrorAlertVisibleStore();

	const visible = authMethod === "Login" ? loginAlertVisible : signupAlertVisible
	const closeAlert = authMethod === "Login" ? closeLoginAlert : closeSignupAlert
	const showAlert = authMethod === "Login" ? showLoginAlert : showSignupAlert

	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			clearAllFields();
		};
	}, []);

	async function handleSignup() {
		const response = await handleUserCreation({
			email,
			username,
			password,
		});
		clearPassword();

		if (!response.success) {
			updateErrors(response.error);
			return;
		}

		await handleLogin();
	}

	async function handleLogin() {
		const response = await handleUserLogin({ email, password });
		clearPassword();

		if (!response.success) {
			console.log(response.error);
			updateErrors(response.error);
			return;
		}

		localStorage.setItem(ACCESS_TOKEN_KEY, response.accessToken);
		localStorage.setItem(REFRESH_TOKEN_KEY, response.refreshToken);

		navigate("/home");
	}

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (authMethod === "Login") {
			await handleLogin();
		} else {
			await handleSignup();
		}
	}

	return (
		<>
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

			<ErrorAlert
				onClose={closeAlert}
				visible={visible}
				errorSummary="The following errors occured during authentication"
				errors={generalErrors}
			/>
		</>
	);
}

export default AuthForm;
