import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Myblog() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numberblogs, setnumberblogs] = useState(0);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.post("http://localhost:3000/post/myposts", {}, {
          withCredentials: true,
        });
        setBlogs(res.data.data || []);
        setnumberblogs(res.data.data.length || 0);
      } catch (error) {
        toast.error("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const openEditModal = (blog) => {
    setEditingBlog({ ...blog, tags: blog.tags.join(", ") });
    document.getElementById("edit_modal").showModal();
  };

  const closeModal = () => {
    setEditingBlog(null);
    document.getElementById("edit_modal").close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedBlog = {
        ...editingBlog,
        tags: editingBlog.tags.split(",").map(tag => tag.trim()).filter(Boolean),
      };

      const res = await axios.post("http://localhost:3000/post/updatepost", {...updatedBlog, postId: updatedBlog._id}, {
        withCredentials: true,
      });

      toast.success("Blog updated successfully");
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === updatedBlog._id ? { ...updatedBlog } : blog
        )
      );
      closeModal();
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("http://localhost:3000/post/deletepost", { postId: id }, {
        withCredentials: true,
      });
      toast.success("Blog deleted successfully");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      if (editingBlog?.id === id) closeModal();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <>
    <div className="text-lg text-center p-4">Number of Blogs: {numberblogs}</div>
    
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        {blogs.map((blog) => (
          <div key={blog._id} className="card bg-base-100 shadow-md">
            {blog.image && (
              <figure>
                <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <p className="text-sm text-gray-500">Date: {new Date(blog.createdAt).toLocaleDateString()}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-outline">{tag}</span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm btn-primary" onClick={() => openEditModal(blog)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(blog._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <form method="dialog" className="modal-box flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>
          <h3 className="font-bold text-lg">Edit Blog</h3>

          <input
            type="text"
            name="title"
            value={editingBlog?.title || ""}
            onChange={handleChange}
            placeholder="Title"
            className="input input-bordered w-full"
          />
          <textarea
            name="content"
            value={editingBlog?.content || ""}
            onChange={handleChange}
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            rows={4}
          />
          <input
            type="text"
            name="tags"
            value={editingBlog?.tags || ""}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="input input-bordered w-full"
          />
          <div className="modal-action justify-end">
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default Myblog;
