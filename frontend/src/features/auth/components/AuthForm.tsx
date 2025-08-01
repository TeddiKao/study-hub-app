interface AuthFormProps {
    authMethod: "Login" | "Sign up"
}

function AuthForm({ authMethod }: AuthFormProps) {
    return (
        <div className="rounded-sm bg-white flex flex-col">
            <h1 className="text-4xl text-center">{authMethod}</h1>
        </div>
    )
}

export default AuthForm;