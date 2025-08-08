import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import {
	useAuthCredentialsStore,
	useAuthErrorsStore,
	useAuthStatusStore,
} from "../stores/authForm.stores";
import { handleUserCreation, handleUserLogin } from "../utils/auth.services";
import { useNavigate } from "react-router-dom";
import formatErrorMessage from "../utils/authErrors";
import ErrorAlert from "@/shared/components/alerts/ErrorAlert";
import {
	useLoginAlertVisibleStore,
	useSignupAlertVisibleStore,
} from "../stores/authErrors.stores";
import type { AuthMethod } from "../types/auth.types";
import AuthLoadingScreen from "./AuthLoadingScreen";
import FlexCenter from "@/shared/components/wrappers/FlexCenter";
import { useAuthTokensStore } from "../stores/authTokens.stores";

interface AuthFormProps {
	authMethod: AuthMethod;
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
			{errorMessages.map((errorMessage) => (
				<p className="text-red-500 mt-1" key={errorMessage}>
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
	const { isLoading, startLoading, stopLoading } = useAuthStatusStore();
	const { updateAccessToken, updateRefreshToken } = useAuthTokensStore();

	const {
		visible: signupAlertVisible,
		closeAlert: closeSignupAlert,
		showAlert: showSignupAlert,
	} = useSignupAlertVisibleStore();
	const {
		visible: loginAlertVisible,
		closeAlert: closeLoginAlert,
		showAlert: showLoginAlert,
	} = useLoginAlertVisibleStore();

	const hideAlertTimeoutRef = useRef<NodeJS.Timeout>(null);

	const navigate = useNavigate();

	useEffect(() => {
		return () => {
			clearAllFields();

			if (hideAlertTimeoutRef.current) {
				clearTimeout(hideAlertTimeoutRef.current);
			}
		};
	}, [clearAllFields]);

	const visible =
		authMethod === "Sign up" ? signupAlertVisible : loginAlertVisible;
	const closeAlert =
		authMethod === "Sign up" ? closeSignupAlert : closeLoginAlert;
	const showAlert =
		authMethod === "Sign up" ? showSignupAlert : showLoginAlert;

	function handleHideAlertTimeoutSetup() {
		hideAlertTimeoutRef.current = setTimeout(() => {
			closeAlert();
		}, 3000);
	}

	async function handleSignup() {
		startLoading();

		const response = await handleUserCreation({
			email,
			username,
			password,
		});

		stopLoading();
		clearPassword();

		if (!response.success) {
			updateErrors(response.error);
			showAlert();
			handleHideAlertTimeoutSetup();

			return;
		}

		await handleLogin();
	}

	async function handleLogin() {
		startLoading();

		const response = await handleUserLogin({ email, password });

		stopLoading();
		clearPassword();

		if (!response.success) {
			updateErrors(response.error);

			showAlert();
			handleHideAlertTimeoutSetup();

			return;
		}

		if (!response.accessToken || !response.refreshToken) {
			console.error("Invalid response from server");

			updateErrors({
				general: ["Authentication failed. Please try again."],
				fields: { email: [], username: [], password: [] },
			});

			showAlert();
			handleHideAlertTimeoutSetup();

			return;
		}

		updateAccessToken(response.accessToken);
		updateRefreshToken(response.refreshToken);

		navigate("/home");
	}

	async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isLoading) {
			return;
		}

		if (authMethod === "Login") {
			await handleLogin();
		} else {
			await handleSignup();
		}
	}

	return (
		<>
			<FlexCenter>
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
			</FlexCenter>

			<ErrorAlert
				onClose={closeAlert}
				visible={visible && generalErrors.length > 0}
				errorSummary="The following errors occurred during authentication"
				errors={generalErrors}
			/>

			<AuthLoadingScreen visible={isLoading} authMethod={authMethod} />
		</>
	);
}

export default AuthForm;
