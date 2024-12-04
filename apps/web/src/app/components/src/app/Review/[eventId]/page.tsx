import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

type Review = {
  id: number;
  event_id: number;
  user_id: number;
  rating: number;
  comments: string;
};

const ReviewsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    rating: '',
    comments: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (eventId) {
      fetchReviews();
    }
  }, [eventId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/${eventId}`);
      setReviews(data);
    } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  const handleCreateReview = async () => {
    try {
      const { data } = await axios.post('/api/reviews', {
        event_id: eventId,
        rating: newReview.rating,
        comments: newReview.comments,
      });
      setReviews([...reviews, data]);
      setNewReview({ rating: '', comments: '' });
    } catch (err) {
      setError('Failed to create review');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Event Reviews</h1>
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1"
            min="1"
            max="5"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Comments</label>
          <textarea
            value={newReview.comments}
            onChange={(e) => setNewReview({ ...newReview, comments: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1"
            rows={3}
          />
        </div>
        <button
          onClick={handleCreateReview}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="bg-gray-100 p-4 rounded mb-2 shadow">
            <div className="flex justify-between">
              <p>
                <strong>Rating:</strong> {review.rating}/5
              </p>
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
            <p>{review.comments}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
