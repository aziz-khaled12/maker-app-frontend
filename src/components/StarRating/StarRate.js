import React, { useState } from 'react';
import StarRatings from 'react-star-ratings'; // Or your custom star component
import axios from 'axios';

const StarRate = ({ sellerId, initialRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(initialRating);
  const userId = localStorage.getItem('userId');
  const handleRate = async (newRating) => {
    setHoverRating(newRating);
  
    try {
      const response = await axios.post(`https://maker-app-backend.vercel.app/${sellerId}/rate`, {
        rating: newRating,
        sellerId: sellerId, 
        userId: userId,
      });
      console.log('Rating submitted successfully:', response.data);
      onRate(newRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  console.log(userId);

  return (
    <div>
      <StarRatings
        rating={hoverRating}
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

export default StarRate;