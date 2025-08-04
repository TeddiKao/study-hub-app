interface AuthLoadingScreenProps {
    visible: boolean;
}

function AuthLoadingScreen({ visible }: AuthLoadingScreenProps) {
    if (!visible) return null;
}

export default AuthLoadingScreen;