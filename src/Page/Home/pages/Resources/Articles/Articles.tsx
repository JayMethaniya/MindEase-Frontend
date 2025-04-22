import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

// Define the Article interface with the type property
interface Article {
  _id: string;
  title: string;
  articleContent: string;
  type: string;
}

interface ApiResponse {
  success: boolean;
  data: Article[];
  message?: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token") || "";

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>("http://localhost:3001/resource", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Filter for articles only
        const articleList = response.data.data.filter(resource => resource.type === 'article');
        setArticles(articleList);
        setError('');
      } else {
        setError(response.data.message || 'Failed to fetch articles');
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError('Failed to fetch articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F8F8] p-8 flex items-center justify-center">
        <div className="text-[#287371] text-xl">Loading articles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1F8F8] p-8 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F8F8] p-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-[#1E3A3A] mb-2">📚 Articles</h1>
        <p className="text-[#287371] mb-8">Explore our collection of mental health articles and resources</p>
        
        {articles.length === 0 ? (
          <div className="text-[#287371] text-lg">No articles available at the moment.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div 
                key={article._id}
                className="bg-white w-[400px] h-[300px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-[#DDECE9]"
              >
                <h2 className="text-xl font-semibold text-[#1E3A3A] mb-3">{article.title}</h2>
                <p className="text-[#287371] line-clamp-4 mb-4">{article.articleContent}</p>
                <button
                  onClick={() => handleReadMore(article)}
                  className="inline-flex items-center text-[#287371] hover:text-[#1E3A3A] font-medium"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#1E3A3A]">{selectedArticle.title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="prose max-w-none">
              <p className="text-[#287371] whitespace-pre-wrap">{selectedArticle.articleContent}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
