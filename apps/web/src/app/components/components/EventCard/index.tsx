import React from 'react';

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: string;
  
  
}

const EventCard: React.FC<EventCardProps> = ({ title, date, location, price }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200 max-w-xs mx-2 my-4">
      {/* <img src={imageUrl} alt={title} className="w-full h-40 object-cover" /> */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm font-medium">{price}</p>
        {/* <p className="text-sm text-gray-500">{followers} followers</p> */}
      </div>
    </div>
  );
};

export default EventCard;
