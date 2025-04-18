import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

interface Initiative {
  _id: string;
  title: string;
  description: string;
  type: string;
}

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const token = localStorage.getItem("token") || "";

  const fetchInitiatives = async () => {
    try {
      const response = await axios.get("http://localhost:3001/resource/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const initiativeList = (response.data as Initiative[]).filter(resource => resource.type === 'initiative');
      setInitiatives(initiativeList);
    } catch (error) {
      console.error("Error fetching initiatives:", error);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F8F8] p-8">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-[#1E3A3A] mb-2">🌟 Initiatives</h1>
        <p className="text-[#287371] mb-8">Discover mental health initiatives and programs</p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative) => (
            <div 
              key={initiative._id}
              className="bg-white w-[400px] h-[300px] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-[#DDECE9]"
            >
              <h2 className="text-xl font-semibold text-[#1E3A3A] mb-3">{initiative.title}</h2>
              <p className="text-[#287371] line-clamp-4 mb-4">{initiative.description}</p>
              <Link
                to={`/initiative/${initiative._id}`}
                className="inline-flex items-center text-[#287371] hover:text-[#1E3A3A] font-medium"
              >
                Learn more
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

export default Initiatives;
