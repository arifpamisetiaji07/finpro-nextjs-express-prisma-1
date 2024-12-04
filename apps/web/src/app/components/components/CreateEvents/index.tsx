"use client";

import React, { useState } from "react";

const CreateEventPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit form
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {/* Header Section */}
      <div className="mb-8">
        <div className="relative w-full h-48 bg-gray-200 rounded-lg flex justify-center items-center">
          <input
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <span className="text-gray-500">Upload photos and video</span>
        </div>
      </div>

      {/* Event Title Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Title</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      {/* Date and Location Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Date and Location</h3>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <iframe
          className="w-full h-64 border rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.163933000929!2d-122.44674768469278!3d37.773972679758826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8f2a5af3%3A0xe1b0aaba04148638!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sid!4v1690843185736!5m2!1sen!2sid"
          loading="lazy"
        ></iframe>
      </div>

      {/* Overview Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Overview</h3>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>

      {/* Sale Type Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Type</h3>
        <div className="flex items-center space-x-4">
          <div>
            <input
              type="radio"
              id="free"
              name="saleType"
              className="mr-2"
              value="free"
              defaultChecked
            />
            <label htmlFor="free" className="text-gray-700">
              Free
            </label>
          </div>
          <div>
            <input
              type="radio"
              id="paid"
              name="saleType"
              className="mr-2"
              value="paid"
            />
            <label htmlFor="paid" className="text-gray-700">
              Paid
            </label>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Event
      </button>
    </div>
  );
};

export default CreateEventPage;
