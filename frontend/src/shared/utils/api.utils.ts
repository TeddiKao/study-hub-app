import { useAuthTokensStore } from "@/features/auth/stores/authTokens.stores";

function sendBeacon(url: string, data: any) {
    const accessToken = useAuthTokensStore.getState().accessToken;

    const blobData = {
        ...data,
        token: accessToken,
    }

    try {
        const blob = new Blob([JSON.stringify(blobData)], {
            type: "application/json",
        });

        navigator.sendBeacon(url, blob);

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export { sendBeacon };
