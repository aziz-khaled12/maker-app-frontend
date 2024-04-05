import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import ProductRating from '../StarRating/ProductRating.js'
import './ProductPage.css';
import axios from 'axios';
import Modal from '../Modal/Modal.js';
import MyCard2 from '../MyCard2/Card.js';
import { Link } from 'react-router-dom';
const ProductPage = () => {

  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ImageUrl, setImageUrl] = useState();
  const [imageArray, setimageArray] = useState([""])
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
  const [averageRating, setAverageRating] = useState(null);
  const [ratingNumber, setRatingNumber] = useState(0);
  const userId =  localStorage.getItem('userId');
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${productId}`);
        const ratingResponse = await axios.get(`http://localhost:3001/${productId}/ratings`);
        setAverageRating(ratingResponse.data.averageRating);
        setRatingNumber(ratingResponse.data.numberOfRatings);
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [productId]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productDetails.categories && productDetails.categories.length > 0) {
          const response = await axios.get(`http://localhost:3001/products/categories/${productDetails.categories[0]}`);
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [productDetails.categories]);
  console.log(ratingNumber)

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleBuyNowClick = () => {
    setShowModal(true);
    console.log(showModal)
    document.body.style.overflow = 'hidden';
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  // Component where buy now functionality is handled
  const handleBuyNow = async (selectedOptions) => {
    try {
      const { size, color,material, quantity } = selectedOptions;
      const total = quantity * productDetails.price;
      const orderData = {
        userId: userId, // Assuming userId is available in your component
        productId: productDetails._id, // Assuming productDetails contains the ID of the product
        size,
        color,
        material,
        total: total,
        quantity,
      };
      const response = await axios.post('http://localhost:3001/api/orders', orderData, {
        headers: {
          'Content-Type': 'application/json', // Change content type to JSON
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        },
      });



      if (response.status === 201) { // Check status instead of response.ok
        const order = response.data; // Access response data directly
        await axios.put(`http://localhost:3001/sellers/${productDetails.sellerId}/orders`, {
          orderId: order._id
        });
        console.log('Order placed successfully:', order);
      } else {
        // Handle error
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };


  useEffect(() => {
    if (productDetails.photos && productDetails.photos.length > 0) {
      setimageArray(productDetails.photos);
      setImageUrl(`http://localhost:3001/photos/${productDetails.photos[0]}`)
    }
  }, [productDetails]);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails._id]);
  const currentIndex = products.findIndex(product => product._id === productId);

  const onRate = async (newRating) => {
    try {
      const updatedRating = await axios.get(`http://localhost:3001/${productId}/ratings`);
      setAverageRating(updatedRating.data.averageRating); 
    } catch (error) {
      console.error('Error fetching updated rating:', error);
    }
  };


  return (
    <>
      <div className='huge-page-container'>
        <header>
          <h1>Product</h1>
        </header>
        <main>
          <div className='details'>
            <div className='image-container'>
              <div className="main-image">
                <img src={ImageUrl} alt='hoodie' />
              </div>
              <div className="images-display">
                {imageArray.map((photo, index) => {
                  return (
                    <img
                      key={index}
                      src={`http://localhost:3001/photos/${photo}`}
                      alt=""
                      onClick={() => setImageUrl(`http://localhost:3001/photos/${photo}`)}
                    />
                  );
                })}
              </div>

            </div>
            <div className='info-container'>
              <h1>{productDetails.name}</h1>
              <div className='actions'>
                <div className='stars'>
                {averageRating != null &&<ProductRating
                  productId={productId}
                  initialRating={averageRating} // Pass initial rating from state
                  onRate={onRate}
                /> } ({ratingNumber}) </div>
                
                <div className='share-more'>

                  <div className='btn'>
                    <PiPaperPlaneTiltBold />
                  </div>
                  <button className={liked ? 'like1 liked1' : 'like1'} onClick={handleLikeClick}>
                    <div className='inside'>
                      <FaHeart color={liked ? 'red' : 'white'} />
                    </div>
                  </button>
                  <div className='btn'>
                    <MdOutlineMoreHoriz />
                  </div>
                </div>
              </div>
              <div className='description'>
                <p>{productDetails.description}</p>
              </div>
              <div className='price'>
                <div className='inside'>
                  <span>Price:</span>
                  <span>{productDetails.price} DZD</span>
                </div>
              </div>
              <button className='buy-btn' onClick={handleBuyNowClick}>
                <div className='inside'>
                  <FaBagShopping />
                  Buy now
                </div>
              </button>
              {showModal && <div className="backdrop"></div>}
              {showModal && (
                <Modal
                  productDetails={productDetails}
                  onClose={handleModalClose}
                  onBuyNow={handleBuyNow}
                />
              )}
            </div>
          </div>

          <div className='suggestions'>
            <div className='top'>
              <h2>Related products:</h2>
              <Link to className=''>Explore more</Link>

            </div>

            <div className="grid-container-1">
              {products
                .filter((product, index) => index !== currentIndex) // Exclude the current product
                .slice(0, 4) // Slice the filtered array to get the first 4 products
                .map((product) => (
                  <MyCard2 key={product._id} product={product} />
                ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ProductPage;