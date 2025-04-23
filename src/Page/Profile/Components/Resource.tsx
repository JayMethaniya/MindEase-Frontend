import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Resource interface
interface Resource {
  _id: string;
  title: string;
  type: string;
  videoUrl?: string;
  content: string;
  thumbnail?: string;
  status?: string;
  uploadedBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdBy: {
    _id: string;
    fullName: string;
    email: string;
  };
  category?: string;
  tags?: string[];
  views?: number;
  likes?: number;
  comments?: Array<{
    user: string;
    text: string;
    createdAt: Date;
  }>;
}

interface ResourceResponse {
  success: boolean;
  data: Resource;
  message?: string;
}

interface ResourcesListResponse {
  success: boolean;
  data: Resource[];
  message?: string;
}

interface ErrorResponse {
  data?: {
    message?: string;
  };
  status?: number;
}

const Resource = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("video");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const resourcesPerPage = 6;
  const token = localStorage.getItem("token") || "";
  const userId = localStorage.getItem("userId") || "";

  // Clear messages after 3 seconds
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const fetchResources = async () => {
    try {
      setError("");
      const response = await axios.get<ResourcesListResponse>("http://localhost:3001/resource", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userResources = response.data.data.filter((resource: Resource) => resource.uploadedBy._id === userId);
      setResources(userResources);
      setTotalPages(Math.ceil(userResources.length / resourcesPerPage));
    } catch (err: any) {
      const errorResponse = err.response as ErrorResponse;
      setError(errorResponse?.data?.message || "Error fetching resources");
      console.error("Error fetching resources:", err);
    }
  };

  // Get current resources for pagination
  const getCurrentResources = () => {
    const indexOfLastResource = currentPage * resourcesPerPage;
    const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
    return resources.slice(indexOfFirstResource, indexOfLastResource);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const resourceData = {
        title,
        type,
        content: type === "video" ? videoUrl : content,
        videoUrl: type === "video" ? videoUrl : undefined,
      };

      const response = await axios.post<ResourceResponse>(
        "http://localhost:3001/resource/add",
        resourceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccessMessage("Resource added successfully!");
        fetchResources();
        setTitle("");
        setVideoUrl("");
        setContent("");
      } else {
        setError(response.data.message || "Failed to add resource");
      }
    } catch (err: any) {
      const errorResponse = err.response as ErrorResponse;
      setError(errorResponse?.data?.message || "Error adding resource");
      console.error("Error adding resource:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) {
      return;
    }

    try {
      setError("");
      const response = await axios.delete(`http://localhost:3001/resource/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 200) {
        setSuccessMessage("Resource deleted successfully!");
        // Update the current page if it would be empty after deletion
        const remainingResources = resources.length - 1;
        const newTotalPages = Math.ceil(remainingResources / resourcesPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        await fetchResources();
      }
    } catch (err: any) {
      const errorResponse = err.response as ErrorResponse;
      if (errorResponse?.status === 404) {
        setError("Resource not found. It may have been already deleted.");
        // Refresh the resource list to ensure UI is in sync
        await fetchResources();
      } else {
        setError(errorResponse?.data?.message || "Error deleting resource");
      }
      console.error("Error deleting resource:", err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-teal-50 text-teal-600 hover:bg-teal-100"
          }`}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-teal-600 text-white"
                : "bg-teal-50 text-teal-600 hover:bg-teal-100"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-teal-50 text-teal-600 hover:bg-teal-100"
          }`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Notification Messages */}
      {(error || successMessage) && (
        <div className="fixed top-4 right-4 z-50 max-w-md">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg shadow-md border border-red-100 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg shadow-md border border-green-100 flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2C3E50] mb-2">Resource Management</h1>
        <p className="text-lg text-[#34495E]">Add and manage educational resources</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-[#2C3E50] mb-4">Add New Resource</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="resource-title" className="block text-sm font-medium text-[#34495E] mb-1">
                Title
              </label>
              <input
                id="resource-title"
                type="text"
                placeholder="Enter resource title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label htmlFor="resource-type" className="block text-sm font-medium text-[#34495E] mb-1">
                Type
              </label>
              <select
                id="resource-type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="video">Video</option>
                <option value="article">Article</option>
                <option value="blog">Blog</option>
                <option value="initiative">Initiative</option>
              </select>
            </div>

            {type === "video" ? (
              <div>
                <label htmlFor="video-url" className="block text-sm font-medium text-[#34495E] mb-1">
                  Video URL
                </label>
                <input
                  id="video-url"
                  type="url"
                  placeholder="https://example.com/video"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-[#34495E] mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  placeholder={`Enter ${type} content here...`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Add Resource
            </button>
          </form>
        </div>

        {/* Resources List Section */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#2C3E50]">Your Resources</h2>
            <p className="text-sm text-[#34495E]">
              Showing {Math.min(currentPage * resourcesPerPage, resources.length)} of {resources.length} resources
            </p>
          </div>

          {resources.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-[#34495E]">No resources added yet</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {getCurrentResources().map((resource) => (
                  <div key={resource._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium text-[#2C3E50] truncate">{resource.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full bg-teal-50 text-teal-700`}>
                          {resource.type}
                        </span>
                      </div>

                      <div className="mt-3 text-sm text-[#34495E]">
                        {resource.type === "video" ? (
                          <div className="break-words">
                            <a
                              href={resource.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                              Watch Video
                            </a>
                          </div>
                        ) : (
                          <div>
                            <p className="line-clamp-3 text-[#34495E]">
                              {resource.content}
                            </p>
                            {resource.content.length > 150 && (
                              <button 
                                className="text-teal-600 hover:text-teal-700 mt-2 text-sm font-medium"
                                onClick={() => window.alert(resource.content)}
                              >
                                Read more
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-[#34495E]">
                          Added by: {resource.uploadedBy?.fullName || 'Unknown'}
                        </div>
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
              {totalPages > 1 && <Pagination />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resource;
