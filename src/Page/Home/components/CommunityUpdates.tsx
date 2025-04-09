import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  authorId: string;
  title: string;
  content: string;
  author: string;
  date: string;
  blogImage?: string;
}

interface SupportGroup {
  title: string;
  members: number;
  lastActivity: string;
}

const CommunityUpdates: React.FC = () => {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Fetch recent blog posts
        const blogResponse = await fetch("http://localhost:3001/blog/recent");
        const blogData = await blogResponse.json();
        setRecentBlogs(blogData);

        // Fetch active support groups
        const groupsResponse = await fetch(
          "http://localhost:3001/support-groups/active"
        );
        const groupsData = await groupsResponse.json();
        setSupportGroups(groupsData);
      } catch (error) {
        console.error("Error fetching community data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {/* Community Updates Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#287371]">
              Community Updates
            </h2>
            <Link
              to="/social/group"
              className="text-sm text-[#287371] hover:text-[#1E3A3A]"
            >
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="h-32 flex items-center justify-center">
              <p className="text-gray-500">Loading community updates...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Recent Blog Posts */}
              <div>
                <h3 className="text-sm font-medium text-[#287371] mb-2">
                  Recent Blog Posts
                </h3>
                <div className="space-y-2">
                  {recentBlogs.slice(0, 2).map((blog) => (
                    <div key={blog.authorId} className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        {blog.blogImage && (
                          <img
                            src={blog.blogImage}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {blog.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          By {blog.author}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Support Groups */}
              <div>
                <h3 className="text-sm font-medium text-[#287371] mb-2">
                  Active Support Groups
                </h3>
                <div className="space-y-2">
                  {supportGroups.slice(0, 2).map((group, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <p className="text-sm text-gray-800">{group.title}</p>
                      <span className="text-xs text-gray-500">
                        {group.members} members
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Wellness Events Card */}
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-[#287371]">
              Upcoming Wellness Events
            </h2>
            <Link
              to="/resources/initiatives"
              className="text-sm text-[#287371] hover:text-[#1E3A3A]"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            <div className="bg-[#F8F9FA] p-4 rounded-lg">
              <h3 className="text-sm font-medium text-[#287371]">
                Mindfulness Workshop
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Join us for a guided meditation session
              </p>
              <p className="text-xs text-gray-500 mt-2">Tomorrow, 10:00 AM</p>
            </div>

            <div className="bg-[#F8F9FA] p-4 rounded-lg">
              <h3 className="text-sm font-medium text-[#287371]">
                Support Group Meeting
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Weekly discussion on stress management
              </p>
              <p className="text-xs text-gray-500 mt-2">Friday, 3:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityUpdates;
