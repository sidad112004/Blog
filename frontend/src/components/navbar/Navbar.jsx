import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar shadow-md py-5 px-4 md:px-8 text-lg sticky top-0 z-50 bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl font-extrabold">
          BlogNest
        </Link>
      </div>

      {/* Desktop search input */}
      <div className="hidden md:flex md:items-center md:gap-6">
        <input
          type="text"
          placeholder="Search articles..."
          className="input input-bordered rounded-full w-64 h-12 text-base focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform"
          >
            <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content text-white bg-base-100 rounded-xl z-20 mt-4 w-56 p-3 shadow-lg text-base"
          >
            <li>
              <Link to="/profile" className="justify-between rounded-lg p-2">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="rounded-lg p-2">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/logout" className="rounded-lg p-2">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile hamburger menu */}
      <div className="md:hidden flex items-center gap-3">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="btn btn-square btn-ghost"
          aria-label="Toggle menu"
        >
          {/* Hamburger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 left-4 bg-base-100 shadow-lg rounded-lg p-4 mt-1 z-50 flex flex-col gap-4 md:hidden">
          <input
            type="text"
            placeholder="Search articles..."
            className="input input-bordered rounded-full w-full h-10 text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex flex-col gap-2 text-center">
            <Link
              to="/profile"
              className="btn btn-ghost rounded-lg text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="btn btn-ghost rounded-lg text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Settings
            </Link>
            <Link
              to="/logout"
              className="btn btn-ghost rounded-lg text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
