import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post("http://localhost:3000/user/userinfo", {}, {
          withCredentials: true,
        });
        setUser({
          name: res.data.data.name || "",
          username: res.data.data.username || "",
          email: res.data.data.email || "",
          bio: res.data.data.bio || "",
        });
      } catch (error) {
        toast.error("Failed to load user info.");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:3000/user/update", user, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Profile updated successfully");
      navigate("/profile");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center mt-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-base-100 p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-primary">Edit Profile</h2>

        <div>
          <label className="label text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-full text-lg">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
