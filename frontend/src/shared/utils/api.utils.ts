function sendBeacon(url: string, data: any) {
    try {
        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });

        navigator.sendBeacon(url, blob);

        return true;
    } catch (error) {
        return false;
    }
}

export { sendBeacon };
