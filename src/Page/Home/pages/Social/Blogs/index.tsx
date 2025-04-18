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
            blogImage: entry.blogImage || blogCTC,
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
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F8F8]">
      <div className="relative w-full h-[400px] mb-8">
        <img 
          src={blogCTC} 
          alt="Blog Header" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F1F8F8]"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="text-4xl font-bold text-[#1E3A3A] mb-2">
            Mental Health & Wellness
          </h1>
          <span className="text-2xl text-[#287371]">Blog</span>
        </div>
      </div>

      <div className="mx-auto px-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#287371]"></div>
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-[#287371]">No blog posts available.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div 
                key={post.authorId} 
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-[#DDECE9]"
              >
                <img 
                  src={post.blogImage} 
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#1E3A3A] mb-3">{post.title}</h2>
                  <p className="text-[#287371] line-clamp-3 mb-4">{post.content}</p>
                  <div className="text-sm text-[#287371] mb-4">
                    By <span className="font-semibold text-[#1E3A3A]">{post.author}</span> | {date}
                  </div>
                  <Link to={`/blog/${post.authorId}`}>
                    <button className="w-full px-4 py-2 bg-[#287371] text-white rounded-lg hover:bg-[#1E3A3A] transition-colors duration-300">
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
