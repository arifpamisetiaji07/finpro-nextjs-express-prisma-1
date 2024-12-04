import React from 'react';

const events = [
  { id: 1, name: 'Live Music Concert', location: 'Jakarta', date: 'Dec 1, 2024', price: 'Free' },
  { id: 2, name: 'Startup Expo', location: 'Bandung', date: 'Nov 25, 2024', price: 'Rp 150,000' },
];

const BrowseEvent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="border border-gray-300 p-4 rounded-lg transition-shadow duration-200 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold">{event.name}</h3>
          <p className="text-sm text-gray-600">{event.location}</p>
          <p className="text-sm text-gray-600">{event.date}</p>
          <p className="text-sm font-medium">{event.price}</p>
        </div>
      ))}
    </div>
  );
};

export default BrowseEvent;
