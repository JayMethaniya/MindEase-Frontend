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
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((resource) => (
          <li key={resource._id}>
            {resource.title} - {resource.articleContent}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
