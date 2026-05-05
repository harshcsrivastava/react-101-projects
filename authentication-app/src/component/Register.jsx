import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import cardImage from "../assets/card.png";

// {
//   "email": "user.email@domain.com",
//   "password": "test@123",
//   "role": "ADMIN",
//   "username": "doejohn"
// }
const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [apiError, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const submit = async (data) => {
        setApiError("");
        setSuccessMessage("");

        try {
            const response = await fetch(
                "https://api.freeapi.app/api/v1/users/register",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                },
            );

            const result = await response.json();

            if (result?.success === true && result?.data?.user) {
                const user = result.data.user;
                setSuccessMessage(result?.message || "Registration successful! Please verify your email.");
                console.log("Registration successful: ", user);
                reset();
                // TODO: Store user in auth context and redirect to verification page
                return;
            }

            // Handle failure response
            setApiError(
                result?.message || "Registration failed. Please try again.",
            );
        } catch (error) {
            setApiError("Unable to reach the server. Please try again.");
            console.error(error);
        }
    };
    return (
        <div className="flex h-screen w-full overflow-hidden bg-linear-to-br from-blue-50 to-teal-50">
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 overflow-hidden order-2 lg:order-1">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                            Register
                        </h1>
                        <p className="text-gray-500">
                            Create your account to continue
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {successMessage}
                        </div>
                    )}

                    {apiError && (
                        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(submit)} className="space-y-5">
                        <div>
                            <input
                                placeholder="Username"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                                    errors.username
                                        ? "border-red-500 focus:border-red-600 bg-red-50"
                                        : "border-gray-200 focus:border-teal-500 bg-white"
                                }`}
                                {...register("username", {
                                    required: "Username is required",
                                    minLength: {
                                        value: 4,
                                        message: "Minimum 4 characters are required",
                                    },
                                })}
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                                    errors.email
                                        ? "border-red-500 focus:border-red-600 bg-red-50"
                                        : "border-gray-200 focus:border-teal-500 bg-white"
                                }`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none pr-12 ${
                                        errors.password
                                            ? "border-red-500 focus:border-red-600 bg-red-50"
                                            : "border-gray-200 focus:border-teal-500 bg-white"
                                    }`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Minimum 6 characters are required",
                                        },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? (
                                        <Eye size={20} strokeWidth={2} />
                                    ) : (
                                        <EyeClosed size={20} strokeWidth={2} />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                            )}
                        </div>

                        <div>
                            <select
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all focus:outline-none ${
                                    errors.role
                                        ? "border-red-500 focus:border-red-600 bg-red-50"
                                        : "border-gray-200 focus:border-teal-500 bg-white"
                                }`}
                                {...register("role", {
                                    required: "Role is required",
                                })}
                            >
                                <option value="">Select a role</option>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="MODERATOR">Moderator</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-2">{errors.role.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-linear-to-r from-gray-800 to-gray-900 text-white font-semibold py-3 rounded-lg hover:from-gray-900 hover:to-black transition-all transform hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </button>

                        <div className="flex items-center gap-4 my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-gray-500 text-sm">or sign up with</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 rounded-lg transition-all hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="hidden sm:inline">Google</span>
                            </button>
                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 rounded-lg transition-all hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M11.4 24H0V7.3h11.4V24zM5.7 5.3C2.55 5.3 0 2.75 0 .57 0 .26.04 0 .12 0h11.52c.08 0 .12.26.12.57 0 2.18-2.55 4.73-5.7 4.73zm12.3-5.3H8.6v24h15.3V0zm-2.7 20.3h-9.9V9.9h9.9v10.4z" />
                                </svg>
                                <span className="hidden sm:inline">Office</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 order-1 lg:order-2 overflow-hidden">
                <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden">
                    <img
                        src={cardImage}
                        alt="Registration Illustration"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
