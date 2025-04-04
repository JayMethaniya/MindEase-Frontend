import React from "react";
import { Link } from "react-router-dom";
import blogCTC from "../../../../../assets/Untitled design (7).png"; 

const blogPosts = [
  {
    id: 1,
    title: "The Importance of Mental Wellness",
    description: "Learn how taking care of your mental health can improve your quality of life.",
    author: "Dr. Jane Smith",
    date: "April 4, 2025",
    image: "https://source.unsplash.com/800x400/?mental,health",
    content: "Mental wellness is key to overall health. It affects how we think, feel, and behave...",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    description: "Simple mindfulness exercises that can help you reduce stress and anxiety.",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    description: "Simple mindfulness exercises that can help you reduce stress and anxiety.",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    description: "Simple mindfulness exercises that can help you reduce stress and anxiety.",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    description: "Simple mindfulness exercises that can help you reduce stress and anxiety.",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
  },
  {
    id: 2,
    title: "Mindfulness Techniques for a Stress-Free Life",
    description: "Simple mindfulness exercises that can help you reduce stress and anxiety.",
    author: "John Doe",
    date: "March 28, 2025",
    image: "https://source.unsplash.com/800x400/?mindfulness,relaxation",
    content: "Mindfulness is a practice that brings awareness to the present moment. By incorporating...",
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="">
      <div className=" relative w-full h-[400px] mb-6">
        <img
          src={blogCTC}
          alt="Blog Header"
          className=" w-full h-full rounded-lg"
        />
        <h1 className=" flex flex-col items-start absolute top-72 text-4xl ml-4 font-bold text-gray-900 text-center mb-8">
          Mental Health & Wellness
           <span>Blog</span>
        </h1>
      </div>
      <div className="max-w-6xl mx-auto">
        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  By <span className="font-semibold">{post.author}</span> | {post.date}
                </div>
                <Link to={`/blog/${post.id}`}>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
