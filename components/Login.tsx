import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="bg-[#000a2c] flex justify-center items-center min-h-screen relative">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.848a10.42 10.42 0 0116.042-.256M6.414 10.879a6.003 6.003 0 014.666-2.004c1.953 0 3.68.898 4.787 2.261m1.233 1.236a6 6 0 01-4.665 2.004c-1.954 0-3.68-.898-4.788-2.261m-.624.624a6.003 6.003 0 01-1.994-4.671m13.657 1.412c-.001 0 .625 1.49 1.562 2.756"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.848a10.42 10.42 0 0116.042-.256M6.414 10.879a6.003 6.003 0 014.666-2.004c1.953 0 3.68.898 4.787 2.261m1.233 1.236a6 6 0 01-4.665 2.004c-1.954 0-3.68-.898-4.788-2.261m-.624.624a6.003 6.003 0 01-1.994-4.671m13.657 1.412c-.001 0 .625 1.49 1.562 2.756"
                                        />
                                    </svg>
                                )}
                            </span>
                        </div>
                    </div>
                    <div>
                        <Link href={'/dashboard'}
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"

                        >
                            Login
                        </Link>
                    </div>
                </form>

                <div className="flex justify-between mt-6 text-sm">
                    <Link href={"/otpPage"} className="text-blue-500">Forgot Password?</Link>
                    <Link href={"/signup"} className="text-blue-500">Don't have an account? Sign up</Link>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;
