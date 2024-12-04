"use client";

import React, { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import SearchBar from "../../components/SearchBar";
import axiosInstance from "../../lib/axios";
import axios from "axios";

interface Event {
  id: number;
  name: string;
  start_date: string;
  location: string;
  price: string | null;
  image?: string; // Optional jika ada gambar event
}

const LandingPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEvents = async (query: string = "") => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8082/api/event/all", {
        params: { search: query },
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchQuery);
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center bg-white p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Browsing events in</h1>
      <p className="text-blue-500 text-lg font-semibold mb-4">Jakarta Pusat</p>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mb-6">
        <SearchBar onSearch={(query) => setSearchQuery(query)} />
      </div>

      {/* Event Categories */}
      <div className="flex items-center gap-4 overflow-x-auto mb-8">
        {["All", "For You", "Online", "This weekend", "Free", "Music", "Food & Drink", "Charity & Causes"].map(
          (category, index) => (
            <button
              key={index}
              className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* Event List */}
      <div className="w-full max-w-7xl">
        <h2 className="text-xl font-bold mb-4">Top trending in Jakarta Pusat</h2>
        {loading ? (
          <p>Loading...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.name}
                date={new Date(event.start_date).toLocaleDateString()}
                location={event.location || "Unknown"}
                price={event.price ? `Rp ${event.price}` : "Free"}
                // image={event.image}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
