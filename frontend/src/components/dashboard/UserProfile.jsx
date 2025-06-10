import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function UserProfile() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.post(`http://localhost:3000/post/visiteduserposts/${userId}`, {}, {
          withCredentials: true,
        });
        setPosts(res.data?.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [userId]);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  if (!posts.length) return <div className="text-center mt-10 text-xl">No posts found for this user.</div>;

  const user = posts[0]?.author;

  return (
    <div className="p-6 space-y-6">
      <div className="bg-base-200 p-4 rounded-md shadow">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <p className="text-sm text-gray-600">@{user?.username}</p>
        <p className="text-sm text-gray-600">{user?.email}</p>
        {user?.bio && <p className="mt-2">{user.bio}</p>}
      </div>
      
      <h2 className="text-xl font-semibold mt-8">User's Blogs</h2>
      <div className="grid gap-6 ">
        {posts.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-md">
            {blog.image && (
              <figure>
                <img
                  src={
                    blog.image.startsWith("http")
                      ? blog.image
                      : `https://source.unsplash.com/featured/?${blog.tags?.[0] || "blog"}`
                  }
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {blog.tags.map((tag, index) => (
                  <div key={index} className="badge badge-outline">{tag}</div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserProfile;
