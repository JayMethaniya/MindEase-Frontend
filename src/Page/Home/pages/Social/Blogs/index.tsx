import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogCTC from "../../../../../assets/Untitled design (7).png";
import axios from "axios";

// Define TypeScript interface for blog post data
interface BlogPost {
  authorId: string;
  title: string;
  content: string;
  author: string;
  date: string;
  blogImage?: string; // Optional image property
}

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
const date = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
  useEffect(() => {
    const fetchBlogPosts = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      if (!userId) {
        console.error("User ID is not available.");
        return;
      }

      try {
        const response = await axios.get<BlogPost[]>(`http://localhost:3001/blog/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(response.data)) {
          const transformedData = response.data.map((entry) => ({
            ...entry,
            blogImage: entry.blogImage || blogCTC, // Assign default image if missing
          }));
          setBlogPosts(transformedData);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setBlogPosts([]);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []); // Dependency array to prevent infinite re-renders

  return (
    <div>
      <div className="relative w-full h-[400px] mb-6">
        <img src={blogCTC} alt="Blog Header" className="w-full h-full rounded-lg" />
        <h1 className="flex flex-col items-start absolute top-72 text-4xl ml-4 font-bold text-gray-900 text-center mb-8">
          Mental Health & Wellness
          <span>Blog</span>
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : blogPosts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No blog posts available.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <div key={post.authorId} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={post.blogImage} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.content}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    By <span className="font-semibold">{post.author}</span> | {date}
                  </div>
                  <Link to={`/blog/${post.authorId}`}>
                    <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
