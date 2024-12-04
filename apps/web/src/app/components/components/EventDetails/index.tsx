"use client";

import React from "react";

const EventDetailPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <p className="text-sm text-gray-500 mb-2">Monday, February 3</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Feels December - Rihard Hermawan
          </h1>
          <p className="text-gray-500">Feels December concert in Jakarta</p>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-gray-800">$12.51</p>
            <button className="mt-4 px-6 py-2 bg-orange-600 text-white font-medium rounded-md hover:bg-orange-700">
              Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Organizer Section */}
      <div className="mt-8 flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Organizer"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900">By Rihard Official</p>
          <p className="text-sm text-gray-500">161 followers • 2 years on Eventbrite</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Follow
        </button>
      </div>

      {/* Date and Time Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select date and time</h2>
        <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Monday</p>
            <p className="text-2xl font-bold text-gray-900">Feb 3</p>
          </div>
          <div className="flex-1">
            <p className="text-gray-800">6:30 - 8:30pm WIB</p>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
        <p className="text-gray-800">South Jakarta</p>
        <p className="text-sm text-gray-500">
          Jakarta International Velodrome East Jakarta, Jakarta 92810
        </p>
        <a href="#" className="text-blue-600 hover:underline mt-2 inline-block">
          Show map
        </a>
      </div>

      {/* Refund Policy Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Refund Policy</h2>
        <p className="text-gray-800">Refunds up to 30 days before event</p>
        <p className="text-sm text-gray-500">Eventbrite's fee is nonrefundable.</p>
      </div>

      {/* About Event Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">About this event</h2>
        <p className="text-gray-800">
          This is a live music concert by Rihard Hermawan performing his top hits. Don't
          miss the chance to witness his remarkable live performance!
        </p>
      </div>

      {/* Tags Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {["Indonesian Events", "DKI Jakarta Events", "Things to do in Rawamangun"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Organizer Information */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg flex items-center">
        <img
          src="https://via.placeholder.com/50"
          alt="Organizer"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4">
          <p className="font-semibold text-gray-900">Rihard Official</p>
          <p className="text-sm text-gray-500">161 followers • 2 years on Eventbrite</p>
        </div>
        <button className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
          Follow
        </button>
      </div>

      {/* Report Event */}
      <div className="mt-8 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Report this event
        </a>
      </div>
    </div>
  );
};

export default EventDetailPage;
