interface AuthLoadingScreenProps {
    visible: boolean;
}

function AuthLoadingScreen({ visible }: AuthLoadingScreenProps) {
    if (!visible) return null;

    return (
        <div className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">

        </div>
    )
}

export default AuthLoadingScreen;