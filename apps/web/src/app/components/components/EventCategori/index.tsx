import React from 'react';
import { FaMusic, FaMoon, FaUtensils, FaGamepad, FaSuitcase } from 'react-icons/fa';

const categories = [
  { id: 1, name: 'Music', icon: <FaMusic /> },
  { id: 2, name: 'Nightlife', icon: <FaMoon /> },
  { id: 3, name: 'Food & Drink', icon: <FaUtensils /> },
  { id: 4, name: 'Gaming', icon: <FaGamepad /> },
  { id: 5, name: 'Business', icon: <FaSuitcase /> },
];

const EventCategory: React.FC = () => {
  return (
    <div className="flex gap-4 overflow-x-auto p-4 whitespace-nowrap">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center cursor-pointer p-4 rounded-lg transition-transform duration-200 transform hover:scale-105"
        >
          {category.icon}
          <p className="mt-2 text-sm">{category.name}</p>
        </div>
      ))}
    </div>
  );
};

export default EventCategory;
