import React from "react";
import { useParams, Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "The Importance of Mental Wellness",
    content: "Mental wellness is key to overall health. It affects how we think, feel, and behave...",
    author: "Dr. Jane Smith",
    date: "April 4, 2025",
    image: "https://source.unsplash.com/800x400/?mental,health",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
  },
];

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogPosts.find((post) => post.id === Number(id));

  if (!blog) {
    return <div className="text-center text-red-500 text-xl">Blog post not found!</div>;
  }

  return (
    <div className=" py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md" />
        <h1 className="text-3xl font-bold text-gray-900 mt-6">{blog.title}</h1>
        <p className="text-gray-500 mt-2">By {blog.author} | {blog.date}</p>
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">{blog.content}</p>
        <Link to="/blog">
          <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Back to Blogs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
