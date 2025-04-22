import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import blogCTC from "../../../../../assets/Untitled design (7).png";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    fullName: string;
    email: string;
  };
  blogImage?: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: BlogPost[];
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<ApiResponse>("http://localhost:3001/blog", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          const post = response.data.data.find(post => post._id === id);
          if (post) {
            setBlogPost({
              ...post,
              blogImage: post.blogImage || blogCTC,
            });
          } else {
            setError("Blog post not found");
          }
        } else {
          setError("Failed to fetch blog post");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        setError("Failed to fetch blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F8F8] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#287371]"></div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-[#F1F8F8] flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-xl shadow-sm max-w-md w-full mx-4">
          <p className="text-xl text-red-500 mb-6">{error || "Blog post not found"}</p>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-[#287371] text-white rounded-lg hover:bg-[#1E3A3A] transition-colors duration-300 font-medium"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F8F8]">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] max-h-[600px] mb-12">
        <img 
          src={blogPost.blogImage} 
          alt={blogPost.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#F1F8F8]"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {blogPost.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90">
              <span className="font-medium">{blogPost.authorId.fullName}</span>
              <span className="hidden sm:inline">•</span>
              <span>{new Date(blogPost.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
          <div className="prose max-w-none prose-lg">
            <div className="text-[#287371] whitespace-pre-wrap leading-relaxed space-y-6">
              {blogPost.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => navigate("/resources/blog")}
            className="flex items-center gap-2 text-[#287371] hover:text-[#1E3A3A] font-medium group"
          >
            <svg 
              className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Blogs</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
