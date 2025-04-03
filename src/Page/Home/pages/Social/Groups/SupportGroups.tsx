import React from "react";
import { group } from "./props";

const SupportGroups = () => {
  const group1: group[] = [
    {
      type: "article",
      link: "https://themindclan.com/reach-out/?P=a08254630019062b4b9f3103cf18fd49&utm_source=platform",
      url: "https://themindclan.com/images/smaller/sharing_spaces/care-givers-mental-health-support-group-offline-bandra-west-mumbai.webp",
      title: "Caregivers Mental Health Support",
    },
    {
      type: "article",
      link: "https://themindclan.com/sharing_spaces/queerstion-26062023/",
      url: "https://themindclan.com/images/smaller/sharing_spaces/queerstion-support-group-mumbai-image.webp",
      title: "Queerstion Support Group",
    },
    {
      type: "article",
      link: "https://themindclan.com/sharing_spaces/bpd-space-bpd-support-group-18072023/",
      url: "https://themindclan.com/images/smaller/sharing_spaces/bpd-space-support-group-peer-led-for-bpd-india-online.webp",
      title: "BPD Support Group",
    },
    {
      type: "article",
      link: "https://themindclan.com/sharing_spaces/group-therapy-01082023/",
      url: "https://themindclan.com/images/smaller/sharing_spaces/group-therapy-by-ayesha-dialogue-mental-health.webp",
      title: "Group Therapy by Ayesha",
    },
    {
      type: "article",
      link: "https://themindclan.com/sharing_spaces/through-thick-and-thin-04072022/",
      url: "https://themindclan.com/images/smaller/sharing_spaces/ttnt.webp",
      title: "Through Thick and Thin",
    },
  ];

  return (
    <div className="py-10 ">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center text-[#1e3245] mb-6">
        💬 Support Groups
      </h2>
      <p className="text-center text-gray-600  mx-3 mb-8">
        Find a community that understands. Join these support groups to connect with like-minded individuals and professionals.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5">
        {group1.map((group) => (
          <a 
            key={group.link} 
            href={group.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden transform hover:scale-105"
          >
            {/* Image */}
            <img 
              src={group.url} 
              alt={group.title} 
              className="w-full h-48 object-cover"
            />
            
            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-[#1e3245]">
                {group.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Click to explore this support group.
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SupportGroups;
