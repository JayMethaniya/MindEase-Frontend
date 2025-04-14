import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Resource interface
interface Resource {
  _id: string;
  title: string;
  type: string;
  videoUrl?: string;
  articleContent?: string;
  initiativeDetails?: string;
}

const Resource = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [initiativeDetails, setInitiativeDetails] = useState("");
  const [type, setType] = useState("video");
  const token = localStorage.getItem("token") || "";
  const fetchResources = async () => {
    try {
      const response = await axios.get("http://localhost:3001/resource/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(response.data as Resource[]); // Type assertion for response.data
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3001/resource/add",
      { title, videoUrl, articleContent, initiativeDetails, type },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchResources();
    setTitle("");
    setVideoUrl("");
    setArticleContent("");
    setInitiativeDetails("");
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/resource/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchResources(); // Refresh the resource list after deletion
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {/* Header Section */}
    <div className="text-center mb-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Resource Management</h1>
      <p className="text-lg text-gray-600">Add and manage educational resources</p>
    </div>
  
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Form Section */}
      <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Resource</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="resource-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              id="resource-title"
              type="text"
              placeholder="Enter resource title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div>
            <label htmlFor="resource-type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="resource-type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="initiative">Initiative</option>
            </select>
          </div>
  
          {type === "video" && (
            <div>
              <label htmlFor="video-url" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL
              </label>
              <input
                id="video-url"
                type="url"
                placeholder="https://example.com/video"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
  
          {(type === "article" || type === "initiative") && (
            <div>
              <label htmlFor={type === "article" ? "article-content" : "initiative-details"} 
                     className="block text-sm font-medium text-gray-700 mb-1">
                {type === "article" ? "Content" : "Details"}
              </label>
              <textarea
                id={type === "article" ? "article-content" : "initiative-details"}
                placeholder={type === "article" 
                  ? "Write the article content here..." 
                  : "Describe the initiative details..."}
                value={type === "article" ? articleContent : initiativeDetails}
                onChange={(e) => type === "article" 
                  ? setArticleContent(e.target.value) 
                  : setInitiativeDetails(e.target.value)}
                required
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
  
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Resource
          </button>
        </form>
      </div>
  
      {/* Resources List Section */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Resources</h2>
        
        {resources.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500">No resources added yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div key={resource._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-800 truncate">{resource.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      resource.type === 'video' ? 'bg-purple-100 text-purple-800' :
                      resource.type === 'article' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {resource.type}
                    </span>
                  </div>
  
                  <div className="mt-3 text-sm text-gray-600">
                    {resource.type === "video" && (
                      <div className="break-words">
                        <a
                          href={resource.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {resource.videoUrl && resource.videoUrl.length > 30 
                            ? `${resource.videoUrl.substring(0, 30)}...` 
                            : resource.videoUrl}
                        </a>
                      </div>
                    )}
                    {(resource.type === "article" || resource.type === "initiative") && (
                      <p className="line-clamp-3">
                        {resource.type === "article" 
                          ? resource.articleContent 
                          : resource.initiativeDetails}
                      </p>
                    )}
                  </div>
  
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(resource._id)}
                      className="text-sm bg-red-50 hover:bg-red-100 text-red-600 font-medium py-1 px-3 rounded-md transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

export default Resource;
