import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { useParams } from "react-router-dom";
import ProductRating from "../StarRating/ProductRating.js";
import "./ProductPage.css";
import axios from "axios";
import Box from "@mui/material/Box";
import { FaRegCircleCheck } from "react-icons/fa6";
import Modal from "@mui/material/Modal";
import '../Modal/Modal.css'
// import Modal from "../Modal/Modal.js";
import MyCard2 from "../MyCard2/Card.js";
import { Link } from "react-router-dom";
import useAlgeriaData from "../AlgeriaData/UseAlgeriaData";

const ProductPage = () => {



  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ImageUrl, setImageUrl] = useState();
  const [imageArray, setimageArray] = useState([""]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const [averageRating, setAverageRating] = useState(null);
  const [ratingNumber, setRatingNumber] = useState(0);
  const userId = localStorage.getItem("userId");
  const [isLoadinga, setIsLoading] = useState(true);
  const [next, setNext] = useState(false);
  const [currentWilaya, setCurrentWilaya] = useState("");
  const [open, setOpen] = useState(true);
  const { algeriaData, isLoading, error } = useAlgeriaData();
  const [sortedAlgeriaData, setSortedAlgeriaData] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    size: "",
    color: "",
    material: "",
    quantity: 1,
    userId: userId,
    wilaya: "", // Add wilaya to selectedOptions
    commune: "", // Add town to selectedOptions
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 0,
  };

  const filterDairas = (wilayaName) => {
    if (!wilayaName) return []; // Handle empty wilaya selection

    const selectedWilaya = sortedAlgeriaData.find(
      (wilaya) => wilaya.name === wilayaName
    );
    return selectedWilaya ? selectedWilaya.dairas : [];
  };

  useEffect(() => {
    if (algeriaData.length > 0) {
      // Execute only if data is available
      setSortedAlgeriaData(algeriaData);
      setSelectedOptions({ ...selectedOptions, commune: "" }); // Reset commune on wilaya change
    }
  }, [algeriaData, currentWilaya]);

  const handleSizeChange = (e) => {
    setSelectedOptions({ ...selectedOptions, size: e.target.value });
  };

  const handleColorChange = (e) => {
    setSelectedOptions({ ...selectedOptions, color: e.target.value });
  };

  const handlematerialChange = (e) => {
    setSelectedOptions({ ...selectedOptions, material: e.target.value });
  };

  const handleQuantityChange = (e) => {
    setSelectedOptions({
      ...selectedOptions,
      quantity: parseInt(e.target.value),
    });
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleWilayaChange = (e) => {
    setCurrentWilaya(e.target.value);
    setSelectedOptions({ ...selectedOptions, wilaya: e.target.value });
  };

  const handleCityChange = (e) => {
    setSelectedOptions({ ...selectedOptions, commune: e.target.value });
  };

  const handleInBuyNowClick = () => {
    handleBuyNow(selectedOptions);
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://maker-app-backend.vercel.app/products/${productId}`
        );
        const ratingResponse = await axios.get(
          `https://maker-app-backend.vercel.app/${productId}/ratings`
        );
        setAverageRating(ratingResponse.data.averageRating);
        setRatingNumber(ratingResponse.data.numberOfRatings);
        setProductDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productDetails.categories && productDetails.categories.length > 0) {
          const response = await axios.get(
            `https://maker-app-backend.vercel.app/products/categories/${productDetails.categories[0]}`
          );
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [productDetails.categories]);

  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const handleModalClose = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  // Component where buy now functionality is handled
  const handleBuyNow = async (selectedOptions) => {
    try {
      const { size, color, material, quantity } = selectedOptions;
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
      const response = await axios.post(
        "https://maker-app-backend.vercel.app/api/orders",
        orderData,
        {
          headers: {
            "Content-Type": "application/json", // Change content type to JSON
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 201) {
        // Check status instead of response.ok
        const order = response.data; // Access response data directly
        await axios.put(
          `https://maker-app-backend.vercel.app/sellers/${productDetails.sellerId}/orders`,
          {
            orderId: order._id,
          }
        );
        console.log("Order placed successfully:", order);
      } else {
        // Handle error
        console.error("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    if (productDetails.photos && productDetails.photos.length > 0) {
      setimageArray(productDetails.photos);
      setImageUrl(`${productDetails.photos[0]}`);
    }
  }, [productDetails]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetails._id]);
  const currentIndex = products.findIndex(
    (product) => product._id === productId
  );

  const onRate = async (newRating) => {
    try {
      const updatedRating = await axios.get(
        `https://maker-app-backend.vercel.app/${productId}/ratings`
      );
      setAverageRating(updatedRating.data.averageRating);
    } catch (error) {
      console.error("Error fetching updated rating:", error);
    }
  };

  return (
    <>
      {isLoadinga ? (
        <></>
      ) : (
        <div className="huge-page-container">
          <header>
            <h1>Product</h1>
          </header>
          <main>
            <div className="details">
              <div className="image-container">
                <div className="main-image">
                  <img src={ImageUrl} alt="hoodie" />
                </div>
                <div className="images-display">
                  {imageArray.map((photo, index) => {
                    return (
                      <img
                        key={index}
                        src={`${photo}`}
                        alt=""
                        onClick={() => setImageUrl(`${photo}`)}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="info-container">
                <h1>{productDetails.name}</h1>
                <div className="actions">
                  <div className="stars">
                    {averageRating != null && (
                      <ProductRating
                        productId={productId}
                        initialRating={averageRating} // Pass initial rating from state
                        onRate={onRate}
                      />
                    )}{" "}
                    ({ratingNumber}){" "}
                  </div>

                  <div className="share-more">
                    <div className="btn">
                      <PiPaperPlaneTiltBold />
                    </div>
                    <button
                      className={liked ? "like1 liked1" : "like1"}
                      onClick={handleLikeClick}
                    >
                      <div className="inside">
                        <FaHeart color={liked ? "red" : "white"} />
                      </div>
                    </button>
                    <div className="btn">
                      <MdOutlineMoreHoriz />
                    </div>
                  </div>
                </div>
                <div className="description">
                  <p>{productDetails.description}</p>
                </div>
                <div className="price">
                  <div className="inside">
                    <span>Price:</span>
                    <span>{productDetails.price} DZD</span>
                  </div>
                </div>
                <button className="buy-btn" onClick={handleOpen}>
                  <div className="inside">
                    <FaBagShopping />
                    Buy now
                  </div>
                </button>

                {/* <Modal
                  productDetails={productDetails}
                  onClose={handleModalClose}
                  onBuyNow={handleBuyNow}
                /> */}

                
              </div>
            </div>
            <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} className="modal-box">
                    <button className="close-btn" onClick={handleClose}>
                      &times;
                    </button>
                    <div className="modal-content">
                      <form className={!next ? "form-show" : "form-hide"}>
                        <h2>Enter Your Informations</h2>
                        {isLoading ? (
                          <p>...</p>
                        ) : error ? (
                          <p>Error loading Algeria data: {error}</p>
                        ) : (
                          <>
                            <div className="container-modal">
                              <label
                                htmlFor="wilaya"
                                className="wilaya-label-modal"
                              >
                                wilaya:
                              </label>
                              <select
                                id="wilaya"
                                value={currentWilaya}
                                onChange={handleWilayaChange}
                              >
                                <option value="">Select Wilaya</option>
                                {sortedAlgeriaData.map((wilaya) => (
                                  <option key={wilaya.name} value={wilaya.name}>
                                    {wilaya.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="container-modal">
                              <label
                                htmlFor="city"
                                className="city-label-modal"
                              >
                                city:
                              </label>
                              <select
                                id="city"
                                value={selectedOptions.commune}
                                onChange={handleCityChange}
                                disabled={!currentWilaya}
                              >
                                <option value="">Select Town</option>
                                {filterDairas(currentWilaya).map((daira) => (
                                  <option key={daira.name} value={daira.name}>
                                    {daira.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="container-modal">
                              <label
                                htmlFor="address"
                                className="address-label-modal"
                              >
                                address:
                              </label>
                              <input type="text" />
                            </div>
                            <div className="container-modal">
                              <label
                                htmlFor="phone"
                                className="phone-label-modal"
                              >
                                phone number:
                              </label>
                              <input type="text" />
                            </div>
                            <button
                              className="buy-now-btn"
                              type="button"
                              onClick={() => setNext(!next)}
                            >
                              Next
                            </button>
                          </>
                        )}
                      </form>
                      <form className={next ? "form-show" : "form-hide"}>
                        <h2>Select Options</h2>
                        <div className="container-modal">
                          <label htmlFor="size" className="size-label-modal">
                            Size:
                          </label>
                          <select
                            id="size"
                            value={selectedOptions.size}
                            onChange={handleSizeChange}
                          >
                            <option value="">Select Size</option>
                            {productDetails.sizes.map((size, index) => (
                              <option key={index} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="container-modal">
                          <label htmlFor="color" className="color-label-modal">
                            Color:
                          </label>
                          <select
                            id="color"
                            value={selectedOptions.color}
                            onChange={handleColorChange}
                          >
                            <option value="">Select Color</option>
                            {productDetails.colors.map((color, index) => (
                              <option key={index} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="container-modal">
                          <label
                            htmlFor="material"
                            className="material-label-modal"
                          >
                            material:
                          </label>
                          <select
                            id="material"
                            value={selectedOptions.material}
                            onChange={handlematerialChange}
                          >
                            <option value="">Select material</option>
                            {productDetails.materials.map((material, index) => (
                              <option key={index} value={material}>
                                {material}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="container-modal">
                          <label
                            htmlFor="quantity"
                            className="quantity-label-modal"
                          >
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id="quantity"
                            value={selectedOptions.quantity}
                            min="1"
                            onChange={handleQuantityChange}
                          />
                        </div>
                        <div className="buttons-actions">
                          <button
                            className="buy-now-btn"
                            onClick={handleOpen}
                          >
                            Buy Now
                          </button>
                          <button
                            className="buy-now-btn"
                            type="button"
                            onClick={() => setNext(!next)}
                          >
                            Back
                          </button>
                        </div>
                      </form>
                    </div>
                  </Box>
                </Modal>

            <div className="suggestions">
              <div className="top">
                <h2>Related products:</h2>
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
      )}
    </>
  );
};

export default ProductPage;
