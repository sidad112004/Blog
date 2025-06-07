import React, { useState } from 'react';

const initialBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces...",
    image: "https://source.unsplash.com/featured/?reactjs",
    tags: ["react", "javascript", "frontend"],
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Understanding TailwindCSS",
    content: "Tailwind CSS is a utility-first CSS framework for rapidly building modern websites...",
    image: "https://source.unsplash.com/featured/?tailwindcss",
    tags: ["tailwind", "css", "design"],
    date: "2024-06-04",
  },
  {
    id: 3,
    title: "Blog without image",
    content: "This blog has no image URL and so no image should render.",
    image: "",
    tags: ["noimage", "test"],
    date: "2024-07-01",
  },
];

function Myblog() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [editingBlog, setEditingBlog] = useState(null);

  const openEditModal = (blog) => {
    setEditingBlog({ ...blog });
    document.getElementById('edit_modal').showModal();
  };

  const closeModal = () => {
    setEditingBlog(null);
    document.getElementById('edit_modal').close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      setEditingBlog((prev) => ({
        ...prev,
        tags: value.split(",").map(tag => tag.trim()).filter(tag => tag.length > 0),
      }));
    } else {
      setEditingBlog((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.id === editingBlog.id ? editingBlog : blog
      )
    );
    closeModal();
  };

  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    if (editingBlog?.id === id) {
      closeModal();
    }
  };

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="card bg-base-100 shadow-md">
            {blog.image && (
              <figure>
                <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <p className="text-sm text-gray-500">Date: {blog.date}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {blog.tags.map((tag, idx) => (
                  <span key={idx} className="badge badge-outline">{tag}</span>
                ))}
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => openEditModal(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Blog Modal */}
      <dialog id="edit_modal" className="modal">
        <form method="dialog" className="modal-box flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Edit Blog</h3>

          <input
            type="text"
            name="title"
            value={editingBlog?.title || ''}
            onChange={handleChange}
            placeholder="Title"
            className="input input-bordered w-full"
          />

          <textarea
            name="content"
            value={editingBlog?.content || ''}
            onChange={handleChange}
            placeholder="Content"
            className="textarea textarea-bordered w-full"
            rows={4}
          />

          <input
            type="text"
            name="tags"
            value={editingBlog?.tags?.join(", ") || ''}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
            className="input input-bordered w-full"
          />

          <div className="modal-action justify-end">
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default Myblog;
