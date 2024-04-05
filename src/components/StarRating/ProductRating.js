import React, { useState } from 'react';
import StarRatings from 'react-star-ratings'; // Or your custom star component
import axios from 'axios';

const ProductRating = ({ productId, initialRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(initialRating);
  const userId = localStorage.getItem('userId');
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

  const handleRate = async (newRating) => {
    setIsSubmitting(true); // Indicate submission in progress
    try {
      const response = await axios.post(`https://maker-app-backend.vercel.app/${productId}/rates`, {
        rating: newRating,
        productId: productId,
        userId: userId,
      });
      console.log('Rating submitted successfully:', response.data);
      onRate(newRating); // Update parent state only on success
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false); // Reset submission state regardless of success or failure
    }
  };

  return (
    <div>
      <StarRatings
        rating={isSubmitting ? hoverRating : initialRating} // Prevent UI update on error
        starRatedColor="gold"
        changeRating={handleRate}
        starDimension="20px"
        starSpacing="1px"
        numberOfStars={5}
        name="rating"
      />
    </div>
  );
};

export default ProductRating;
