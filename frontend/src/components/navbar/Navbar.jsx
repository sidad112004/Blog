import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/themeSlice";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const checkUser = async () => {
      try {
        await axios.post("http://localhost:3000/user/userinfo", {}, { withCredentials: true });
      } catch (error) {
        toast.error("Please login first.");
        navigate("/signin");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/user/logout", {}, { withCredentials: true });
      toast.success(res.data.message || "Logged out successfully.");
      navigate("/signin");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <div className="navbar shadow-md py-5 px-4 md:px-8 text-lg sticky top-0 z-50 bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl font-extrabold">
          BlogNest
        </Link>
      </div>

      <div className="hidden md:flex md:items-center md:gap-6">
        <button onClick={() => dispatch(toggleTheme())} className="btn btn-outline">
          {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <button
          onClick={() => navigate("/createpost")}
          className="btn btn-circle btn-primary text-xl"
          aria-label="Create Post"
        >
          +
        </button>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform">
            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img alt="User avatar" src="https://imgs.search.brave.com/Vhx9ztJ8zy3-GQhynXeSiq4tQizwKLO_Jsvr2o8Qdq8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIy/MzY3MTM5Mi92ZWN0/b3IvZGVmYXVsdC1w/cm9maWxlLXBpY3R1/cmUtYXZhdGFyLXBo/b3RvLXBsYWNlaG9s/ZGVyLXZlY3Rvci1p/bGx1c3RyYXRpb24u/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXMwYVRkbVQ1YVU2/YjhvdDdWS20xMURl/SUQ2TmN0UkNwQjc1/NXJBMUJJUDA9" />
            </div>
          </div>

          <ul tabIndex={0} className="menu menu-sm dropdown-content text-white bg-base-100 rounded-xl z-20 mt-4 w-56 p-3 shadow-lg text-base">
            <li><Link to="/profile" className="rounded-lg p-2">Profile</Link></li>
            <li><button onClick={handleLogout} className="rounded-lg p-2 text-left w-full">Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
