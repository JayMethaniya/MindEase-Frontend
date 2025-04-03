import React, { useState, useEffect } from "react";
import quotes from "./data";
import axios from "axios";

interface BaseProfile {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
  profilePhoto?: string;
  role: string;
}

interface DoctorProfile extends BaseProfile {
  specialization: string;
}

type ProfileType = DoctorProfile | BaseProfile;

export default function Index() {
  const [greeting, setGreeting] = useState("");
  const [quote, setQuote] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("🌅 Good Morning!");
    else if (hours < 18) setGreeting("☀️ Good Afternoon!");
    else setGreeting("🌙 Good Evening! ");

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found");
          return;
        }
        const response = await axios.get<ProfileType>(
          `http://localhost:3001/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setFullName(response.data.fullName);
        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const isDoctor = role === "doctor";

  return (
    <div className="mt-6">
      <div className="text-center text-2xl font-semibold">
        {greeting}{" "}
        <span className="text-[#1e4747] font-bold">
          {isDoctor ? "Dr. " : ""}
        </span>
        <span className="text-[#1e4747] uppercase font-bold">{fullName}</span>
      </div>
      <div className="text-center text-2xl font-bold text-[#1e3245] mt-2">
        "{quote}"
      </div>
    </div>
  );
}
