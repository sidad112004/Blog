import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            toast.error("Please enter both username and password.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:3000/user/login",
                { username, password },
                { withCredentials: true }
            );

            toast.success("Login successful!");
            navigate("/"); 
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
                
                {/* Left image */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-base-300 items-center justify-center p-6">
                    <img
                        src="https://cdn.dribbble.com/users/1958452/screenshots/10979353/media/7e62ec4f56a2e3dbb4c31808bc6ae5df.png"
                        alt="Login Illustration"
                        className="w-full h-auto max-h-[450px] object-contain"
                    />
                </div>

                {/* Right form */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <h2 className="text-4xl font-bold mb-6 text-center">Welcome Back 👋</h2>
                    <p className="text-center text-sm mb-8 text-gray-500">
                        Sign in to your blog account to start writing or reading.
                    </p>

                    <form onSubmit={handleSignin} className="space-y-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Login
                        </button>

                        <div className="text-sm text-center text-gray-500 mt-4">
                            Don’t have an account?
                            <Link to="/signup" className="ml-1 text-primary font-medium link link-hover">Sign up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signin;
