import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.post('http://localhost:3000/post/allposts', {}, {
          withCredentials: true,
        });
        setBlogs(res.data.data || []);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid gap-6 ">
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
            {blog.image && (
              <figure>
                <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
              </figure>
            )}
            <div className="card-body">
              <a
                href={`/profile/${blog.author?._id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.author?.name || "Unknown Author"}
              </a>
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {blog.tags?.map((tag, index) => (
                  <div key={index} className="badge badge-outline">{tag}</div>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
