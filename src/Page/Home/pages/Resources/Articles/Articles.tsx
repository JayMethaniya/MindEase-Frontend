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

const Articles = () => {
  // Set the state type to Article[]
  const [articles, setArticles] = useState<Article[]>([]);
const token = localStorage.getItem("token") || "";
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/resource/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Type assertion for response.data
      const articleList = (response.data as Article[]).filter(resource => resource.type === 'article');
      setArticles(articleList);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F8F8] p-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-[#1E3A3A] mb-2">📚 Articles</h1>
        <p className="text-[#287371] mb-8">Explore our collection of mental health articles and resources</p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div 
              key={article._id}
              className="bg-white w-[400px] h-[300px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-[#DDECE9]"
            >
              <h2 className="text-xl font-semibold text-[#1E3A3A] mb-3">{article.title}</h2>
              <p className="text-[#287371] line-clamp-4 mb-4">{article.articleContent}</p>
              <Link
                to={`/article/${article._id}`}
                className="inline-flex items-center text-[#287371] hover:text-[#1E3A3A] font-medium"
              >
                Read more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
