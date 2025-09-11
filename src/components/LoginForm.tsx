import { useForm } from "react-hook-form"
import type { LoginFormData } from "../types/pokeTypes"
import { fakeUsers } from "../data/user.data"
import { notifyError, notifySucces } from "../helpers/notify"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginFormData>()

    const navigate = useNavigate();

    const onSubmit = (data: LoginFormData) => {
        const user = fakeUsers.find(
            (u) => u.email === data.email && u.password === data.password
        );

        if (user) {
            notifySucces(
                `Bienvenido ${user.role === "admin" ? "Administrador" : "Comprador"}`
            );

            setTimeout(() => {
                if (user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }, 2000);
        } else {
            notifyError("Credenciales inválidas");
        }

        reset();
    };

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-6"
        >
            <h2 className="text-3xl font-bold text-center text-gray-800">
                Iniciar Sesión
            </h2>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    {...register("email", { required: "El email es obligatorio" })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="tu@email.com"
                />
                {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Contraseña
                </label>
                <input
                    type="password"
                    {...register("password", {
                        required: "La contraseña es obligatoria",
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="********"
                />
                {errors.password && (
                    <p className="text-sm text-red-500 mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
            >
                Entrar
            </button>
        </form>
    )
}
