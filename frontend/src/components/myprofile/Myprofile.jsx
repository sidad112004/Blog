import React, { useState } from "react";

import Myblog from "./Myblog";

function Myprofile() {
  const [tab, setTab] = useState("profile");

  const user = {
    name: "Siddesh Dhanlobhe",
    username: "sidad112004",
    email: "siddeshad112004@gmail.com",
    bio: "Aspiring full-stack developer and blogger.",
    totalBlogs: 5,
  };

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="bg-base-100 rounded-2xl p-6 mb-6 text-center">
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">@{user.username}</p>
      </div>

      <div className="tabs tabs-boxed justify-center mb-6">
        <a className={`tab ${tab === "profile" ? "tab-active" : ""}`} onClick={() => setTab("profile")}>
          Profile Info
        </a>
        <a className={`tab ${tab === "blogs" ? "tab-active" : ""}`} onClick={() => setTab("blogs")}>
          My Blogs
        </a>
      </div>

      <div className="bg-base-100 rounded-xl p-6">
        {tab === "profile" ? (
          <div className="space-y-4">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Bio:</span> {user.bio}</p>
            <p><span className="font-semibold">Total Blogs:</span> {user.totalBlogs}</p>
            <button className="btn btn-primary mt-4">Edit Profile</button>
          </div>
        ) : (
          <Myblog />
        )}
      </div>
    </div>
  );
}

export default Myprofile;
