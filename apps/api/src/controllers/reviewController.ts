import { Request, Response } from 'express';
import prisma from '../utils/prisma';

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  const { event_id, rating, comments } = req.body;
  const user_id = req.user?.id; // Assume `req.user` is populated by auth middleware.


  if (!user_id) {
     res.status(401).json({ message: 'User ID is required' });
     return
  }

  if (!event_id || !rating) {
     res.status(400).json({ message: 'Event ID and rating are required' });
     return
  }

  try {
    const newReview = await prisma.event_reviews_ratings.create({
      data: {
        event_id,
        user_id,
        rating,
        comments,
      },
    });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create review', error: "Gagal Membuat Error message"});
  }
};

// Get all reviews for an event
export const getEventReviews = async (req: Request, res: Response) => {
  const { eventId } = req.params;

  try {
    const reviews = await prisma.event_reviews_ratings.findMany({
      where: { event_id: Number(eventId) },
      include: { events: true }, // Include related event info if needed
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error: "Gagal Membuat Error message" });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const user_id = req.user?.id;

  try {
    // Ensure user owns the review
    const review = await prisma.event_reviews_ratings.findUnique({
      where: { id: Number(reviewId) },
    });

    if (!review || review.user_id !== user_id) {
       res.status(403).json({ message: 'Unauthorized to delete this review' });
       return
    }

    await prisma.event_reviews_ratings.delete({
      where: { id: Number(reviewId) },
    });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete review', error: "Gagal Membuat Error message" });
  }
};
