import React, { useEffect, useState } from "react";
import Myblog from "./Myblog";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Myprofile() {
  const [tab, setTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/userinfo", {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch user info.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-error">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="card bg-base-100 rounded-box grid place-items-center p-6 mb-4">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>

      <div className="divider"></div>

      <div className="tabs tabs-boxed justify-center mb-6">
        <a className={`tab ${tab === "profile" ? "tab-active" : ""}`} onClick={() => setTab("profile")}>
          Profile Info
        </a>
        <a className={`tab ${tab === "blogs" ? "tab-active" : ""}`} onClick={() => setTab("blogs")}>
          My Blogs
        </a>
      </div>

      <div className="card rounded-box p-6">
        {tab === "profile" ? (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="space-y-4 flex-1">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Bio:</span> {user.bio}</p>
             
              <button className="btn btn-primary mt-4" onClick={() => navigate('/editprofile')}>
                Edit Profile
              </button>

            </div>
          </div>
        ) : (
          <Myblog />
        )}
      </div>
    </div>
  );
}

export default Myprofile;
