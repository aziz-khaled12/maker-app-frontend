import React from 'react'
import './VendorPage.css'
import myImage from '../../assets/BlackBlack-Hoodie.jpg'
import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import CardGrid from '../CardGrid/CardGrid'
import { FaHeart } from 'react-icons/fa6'
import StarRate from '../StarRating/StarRate.js'
import FilterSort from '../FIlterSort/FilterSort.js'

const VendorPage = () => {
  const [sellerInfo, setSellerInfo] = useState([]);
  const [display, setDisplay] = useState([]);
  const [originalResults, setOriginalResults] = useState([]);
  const { sellerId } = useParams();
  const [averageRating, setAverageRating] = useState(null);
  const [ratingNumber, setRatingNumber] = useState(0);
  const userId =  localStorage.getItem('userId');
  console.log(userId)

  const handleFilterData = (data) => {
    setDisplay(data);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/sellers/${sellerId}/sellerProducts`);
        setOriginalResults(response.data);
        setDisplay(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [sellerId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerResponse = await axios.get(`http://localhost:3001/users/${sellerId}`);
        setSellerInfo(sellerResponse.data);

        const ratingResponse = await axios.get(`http://localhost:3001/${sellerId}/rating`); // Assuming your ratings endpoint
        const initialRating = ratingResponse.data.averageRating; // Extract the average rating
        setRatingNumber(ratingResponse.data.numberOfRatings);
        setAverageRating(initialRating); // Add a state variable to store the initial rating
      } catch (error) {
        console.error('Error fetching seller Info or rating:', error);
      }
    };
    fetchData();
  }, [sellerId, averageRating]);

  // Inside the parent component:

  const onRate = async (newRating) => {
    try {
      const updatedRating = await axios.get(`http://localhost:3001/${sellerId}/rating`);
      setAverageRating(updatedRating.data.averageRating); 
    } catch (error) {
      console.error('Error fetching updated rating:', error);
    }
  };


  console.log(originalResults);

  return (
    <>
      <div className="huge-vendor-container">
        <div className="top-container-1">
          <div className="cover-photo"></div>
          <div className="ven-info">
            <div className="photo-info">
              <img src={myImage} alt="hh" />
              <div>
              </div>
              <div className="info">
                <div className="name">{sellerInfo.username}</div>
                <div className="bio">Lorem ipsum dolor sit amet consectetur adipisicing.</div>
                <div className="completed">completed orders: 1024 | 
                {averageRating != null &&<StarRate
                  sellerId={sellerId}
                  initialRating={averageRating} // Pass initial rating from state
                  onRate={onRate}
                /> } ({ratingNumber}) </div>
                <buttton className="follow-btn"><FaHeart />Follow Shop</buttton>
              </div>
            </div>
          </div>

        </div>
        <div className="top-bot"><h1>Seller Products:</h1></div>

        <div className="bottom-container">
          {originalResults.length > 0 && (
            <FilterSort sendData={handleFilterData} products={originalResults} toSort={display} />
          )}
          <div className="seller-products">
            <CardGrid products={display} />
          </div>

        </div>
      </div>

    </>
  )
}

export default VendorPage