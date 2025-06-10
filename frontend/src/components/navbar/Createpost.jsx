import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";


function Createpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/post/createpost", {
        title,
        content,
        image,
        tag,
      },{withCredentials: true});

    
        setTitle("");
        setContent("");
        setImage("");
        setTag("");

        toast.success("Post created successfully!");

    } catch (err) {
      toast.error("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-base-100 rounded-3xl shadow-xl p-10">
        <h2 className="text-4xl font-bold mb-6 text-center">Create New Post 📝</h2>

        <form onSubmit={handlePostSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label font-semibold">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Content</label>
            <textarea
              placeholder="Write your blog content here..."
              className="textarea textarea-bordered w-full h-40 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Image URL (optional)</label>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Tag (optional)</label>
            <input
              type="text"
              placeholder="react, javascript"
              className="input w-full bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Createpost;
