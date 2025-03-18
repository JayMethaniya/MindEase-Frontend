import React from "react";
import "tailwindcss/tailwind.css";

const resources = [
  {
    title: "Managing Anxiety",
    description: "Learn effective techniques to manage anxiety and stress.",
    link: "https://www.verywellmind.com/anxiety-management-techniques-5188502",
  },
  {
    title: "Meditation for Beginners",
    description: "A beginner's guide to meditation for mental clarity and relaxation.",
    link: "https://www.headspace.com/meditation/meditation-for-beginners",
  },
  {
    title: "Coping with Depression",
    description: "Tips and strategies for overcoming depression.",
    link: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/depression/about-depression/",
  },
  {
    title: "Sleep Hygiene Tips",
    description: "Improve your sleep quality with these simple tips.",
    link: "https://www.sleepfoundation.org/sleep-hygiene",
  },
  {
    title: "Guided Meditation Video",
    description: "Relax and unwind with this guided meditation session.",
    link: "https://www.youtube.com/watch?v=inpok4MKVLM",
  },
];

const Resources: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-blue-100 to-blue-300 rounded-xl shadow-2xl border border-blue-500">
      <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Mental Health Resources</h1>
      <p className="text-center text-gray-700 mb-8 text-lg">
        Here are some helpful resources to support your mental well-being.
      </p>

      <ul className="space-y-6">
        {resources.map((resource, index) => (
          <li key={index} className="p-6 border rounded-lg bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-600">{resource.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mt-3 inline-block transition-all"
            >
              Visit Resource →
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;