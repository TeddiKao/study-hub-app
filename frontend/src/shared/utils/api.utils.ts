import { useAuthTokensStore } from "@/features/auth/stores/authTokens.stores";
import { isNullOrUndefined } from "./types.utils";

function sendBeacon(url: string, data: any) {
    const accessToken = useAuthTokensStore.getState().accessToken;

    const blobData = {
        ...data,
        token: accessToken,
    }

    try {
        if (isNullOrUndefined(navigator)) return false;
        if (!("sendBeacon" in navigator)) return false;

        const blob = new Blob([JSON.stringify(blobData)], {
            type: "application/json",
        });

        return navigator.sendBeacon(url, blob);
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { sendBeacon };
