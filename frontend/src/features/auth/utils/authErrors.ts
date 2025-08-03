import { authFieldErrorsMap } from "../constants/authErrors.constants";

function formatErrorMessage(rawErrorMessage: string) {
	return authFieldErrorsMap[rawErrorMessage];
}

export default formatErrorMessage;
