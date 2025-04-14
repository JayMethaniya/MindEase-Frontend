import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MentalHealthInitiative from "./MentalHealthInitiative";

interface Initiative {
  _id: string;
  title: string;
  image: string;
  link: string;
}

const backgroundColors = [
  "bg-[#e8dff5]",
  "bg-[#fce1e4]",
  "bg-[#daeaf6]",
  "bg-[#fcf4dd]",
  "bg-[#ddedea]",
];

const Initiatives = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
const token = localStorage.getItem("token") || "";
  const fetchInitiatives = async () => {
    try {
      const response = await axios.get("http://localhost:3001/resource/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Type assertion for response.data
      const initiativeList: Initiative[] = (response.data as { type: string; title: string; image: string; link: string; _id: string; }[]).filter(resource => resource.type === 'initiative');
      setInitiatives(initiativeList);
    } catch (error) {
      console.error("Error fetching initiatives:", error);
    }
  };

  useEffect(() => {
    fetchInitiatives();
  }, []);

  return (
    <div className="p-8 w-full ">
      {/* Heading Section */}
      <h1 className="text-center text-3xl font-bold text-[#1e3245] mb-8">
        🌿 Mental Health Initiatives
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
        Explore initiatives dedicated to improving mental health awareness and care worldwide.
      </p>

      {/* Initiatives Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {initiatives.map((resource, index) => (
          <MentalHealthInitiative
            key={resource._id}
            text={resource.title}
            image={resource.image}
            alt={`Initiative ${index}`}
            link={resource.link}
            backgroundColor={backgroundColors[index % backgroundColors.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
