import LoginForm from "../components/LoginForm";

export default function LoginPage() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row">
            <div className="flex w-full md:w-1/2 bg-red-500 md:rounded-r-full items-center justify-center p-8 md:p-0">
                <img
                    src="/pokeball.png"
                    alt="Login visual"
                    className="w-2/3 max-w-md"
                />
            </div>

            <div className="flex w-full md:w-1/2 items-center justify-center p-8 bg-white">
                <LoginForm />
            </div>
        </section>
    )
}
