import { authFieldErrorsMap, DEFAULT_ERROR_MESSAGE } from "../constants/authErrors.constants";

function formatErrorMessage(rawErrorMessage: string) {
	return authFieldErrorsMap[rawErrorMessage] ?? DEFAULT_ERROR_MESSAGE;
}

export default formatErrorMessage;
