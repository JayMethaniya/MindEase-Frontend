import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("blogImage", image);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3001/blog/add", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Blog created successfully!");
        navigate("/resources/blog");
      } else {
        alert("Failed to create blog.");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("An error occurred while creating the blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F8F8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1E3A3A]">Create a Blog</h2>
          <p className="mt-2 text-lg text-[#287371]">Share your thoughts and experiences with the community</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#287371] uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-3 border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#287371] uppercase tracking-wider mb-2">
                Content
              </label>
              <textarea
                className="w-full p-3 border border-[#DDECE9] rounded-lg focus:ring-2 focus:ring-[#287371] focus:border-transparent transition min-h-[200px]"
                placeholder="Write your blog content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#287371] uppercase tracking-wider mb-2">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#DDECE9] border-dashed rounded-lg cursor-pointer hover:bg-[#F1F8F8] transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-[#287371]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-[#287371]">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-[#287371]">PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden"
                  />
                </label>
              </div>
              {image && (
                <div className="mt-2 text-sm text-[#287371]">
                  Selected: {image.name}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#287371] text-white font-semibold py-3 rounded-lg hover:bg-[#1E3A3A] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Blog'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
