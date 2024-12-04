"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../lib/axios";
import useDebounce from "../../lib/debounts";
import axios from "axios";
import Link from "next/link";

const BrowsePage: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    saleType: "",
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const debouncedSearch = useDebounce(filters.search, 500);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:8082/api/event/all", {
        params: {
          page,
          search: debouncedSearch,
          category: filters.category,
          date: filters.date,
          saleType: filters.saleType,
        },
      });
      setEvents(data.events);
      setTotalPages(Math.ceil(data.total / 10)); // Assuming 10 per page
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [filters, debouncedSearch, page]);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-4 bg-gray-100 border-r">
        <h2 className="text-lg font-semibold">Filters</h2>
        <div>
          <label className="block">Search</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div>
          <label className="block">Category</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">All</option>
            <option value="Business">Business</option>
            <option value="Music">Music</option>
            <option value="Health">Health</option>
            <option value="Health">Art</option>
            <option value="Health">Techology</option>

          </select>
        </div>
        <div>
          <label className="block">Date</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          >
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="this_weekend">This Weekend</option>
          </select>
        </div>
        <div>
          <label className="block">Type</label>
          <select
            className="w-full p-2 border rounded"
            value={filters.saleType}
            onChange={(e) => setFilters({ ...filters, saleType: e.target.value })}
          >
            <option value="">All</option>
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event: any) => (
              <div key={event.id} className="border rounded p-4">
                <h3 className="font-semibold text-lg">
                  {event.name}
                </h3>
                <p>{event.eventCategory.name}</p>
                <p>
                  {new Date(event.start_date).toLocaleDateString()} -{" "}
                  {new Date(event.end_date).toLocaleDateString()}
                </p>
                <Link href={`/Events/${event.slug}`} className="text-blue-500 underline">
                View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;
