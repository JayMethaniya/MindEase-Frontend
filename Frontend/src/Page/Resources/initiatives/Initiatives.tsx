import React from "react";
import MentalHealthInitiative from "./MentalHealthInitiative";

const initiatives = [
  {
    text: "National Mental Health Programme (NMHP) - Launched by the Government of India to improve mental health care accessibility.",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529903_640.png",
    link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359",
  },
  {
    text: "MINDS Foundation - Works towards destigmatizing mental health and providing affordable care.",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/woman-7529904_640.png",
    link: "https://www.mindsfoundation.org/",
  },
  {
    text: "Sangath - Focuses on mental health development, youth programs, and child wellness.",
    image: "https://cdn.pixabay.com/photo/2022/08/17/20/00/psychotherapy-7393379_640.png",
    link: "https://sangath.in/",
  },
  {
    text: "The Banyan - Provides housing, mental health care, and support for the homeless.",
    image: "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529905_1280.png",
    link: "https://thebanyan.org/",
  },
  {
    text: "Time to Change - UK-based initiative aiming to end mental health discrimination.",
    image: "https://cdn.pixabay.com/photo/2022/08/19/17/51/brain-7397412_1280.png",
    link: "https://www.time-to-change.org.uk/",
  },
  {
    text: "The Black Dog Institute - Designs programs for healthier workplace environments.",
    image: "https://cdn.pixabay.com/photo/2018/04/25/22/49/cranium-3350798_640.png",
    link: "https://www.blackdoginstitute.org.au/education-services/workplaces/",
  },
];

const backgroundColors = [
  "bg-[#e8dff5]",
  "bg-[#fce1e4]",
  "bg-[#daeaf6]",
  "bg-[#fcf4dd]",
  "bg-[#ddedea]",
];

const Initiatives = () => {
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
        {initiatives.map((initiative, index) => (
          <MentalHealthInitiative
            key={index}
            text={initiative.text}
            image={initiative.image}
            alt={`Initiative ${index}`}
            link={initiative.link}
            backgroundColor={backgroundColors[index % backgroundColors.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default Initiatives;
