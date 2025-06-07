import React from 'react';

const blogs = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a popular JavaScript library...",
    image: "https://source.unsplash.com/featured/?reactjs",
    tags: ["react", "javascript"],
    date: "2024-06-01",
    author: {
      id: 101,
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com"
    }
  },
  {
    id: 2,
    title: "Understanding TailwindCSS",
    content: "Tailwind CSS is a utility-first CSS framework...",
    image: "https://source.unsplash.com/featured/?tailwindcss",
    tags: ["tailwind", "css"],
    date: "2024-06-04",
    author: {
      id: 102,
      name: "Jane Smith",
      username: "janesmith",
      email: "jane@example.com"
    }
  },
];

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
            <figure>
              <img src={blog.image} alt={blog.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <a
                href={`/profile/${blog.author.id}`}
                className="text-blue-600 font-medium hover:underline"
              >
                {blog.author.name}
              </a>
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="mt-2 flex gap-2 flex-wrap">
                {blog.tags.map((tag, index) => (
                  <div key={index} className="badge badge-outline">{tag}</div>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-2">{blog.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
