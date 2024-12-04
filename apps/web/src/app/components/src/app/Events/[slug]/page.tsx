"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../components/TransactionModal"; // Update path sesuai kebutuhan
import { useParams } from "next/navigation";

interface IEvent {
  id: number;
  name: string;
  description: string;
  price: number;
  availableSeats: number;
}

const EventDetailPage = () => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (params.slug) {
      axios
        .get(`http://localhost:8082/api/event/${params.slug}`) // Sesuaikan endpoint
        .then((response) => setEvent(response.data))
        .catch((error) => console.error("Error fetching event details:", error));
    }
  }, [params.slug]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Event Header */}
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p>{event.description}</p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        Buy Tickets
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventId={event.id}
          ticketPrice={event.price}
          availableSeats={event.availableSeats}
        />
      )}
    </div>
  );
};

export default EventDetailPage;