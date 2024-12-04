import { Router } from 'express';
import { VerifyToken2 } from '../middlewares/loginMiddlewares';
import { createReview, getEventReviews, deleteReview } from '../controllers/reviewController';

const router = Router();

// Create a review
router.post('/', VerifyToken2, createReview);

// Get all reviews for an event
router.get('/:eventId', getEventReviews);

// Delete a review
router.delete('/:reviewId', VerifyToken2, deleteReview);

export default router;
