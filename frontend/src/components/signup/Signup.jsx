import { useState } from "react";

function Signup() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Signup Details:", {
            name,
            username,
            email,
            password
        });

    
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
               
                <div className="hidden lg:flex w-full lg:w-1/2 bg-base-300 items-center justify-center p-6">
                    <img
                        src="https://cdn.dribbble.com/users/1751799/screenshots/3818675/media/76e3d44d3e2e6f41a1dc00ce470b1874.png"
                        alt="Signup Illustration"
                        className="w-full h-auto max-h-[450px] object-contain"
                    />
                </div>

              
                <div className="w-full lg:w-1/2 p-8 sm:p-12">
                    <h2 className="text-4xl font-bold mb-6 text-center">Create an Account 📝</h2>
                    <p className="text-center text-sm mb-8 text-gray-500">
                        Join the blog platform and start your writing journey.
                    </p>

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your full name"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Choose a unique username"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Create a strong password"
                                className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            Sign Up
                        </button>

                        <div className="text-sm text-center text-gray-500 mt-4">
                            Already have an account?
                            <a href="#" className="ml-1 text-primary font-medium link link-hover">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
