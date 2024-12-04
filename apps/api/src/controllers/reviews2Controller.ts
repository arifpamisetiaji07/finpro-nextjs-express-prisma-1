import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getEventReviews = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const reviews = await prisma.event_reviews_ratings.findMany({
      where: { event_id: parseInt(eventId) },
      include: {
        events: true, // Dapatkan detail event (opsional)
      },
      // orderBy: {
      //   createdAt: 'desc', // Ulasan terbaru di atas
      // },
    });

    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this event' });
    }

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch reviews', error: "Gagal Transaksi" });
  }
};
