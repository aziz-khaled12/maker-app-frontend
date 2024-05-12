// Modal.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Modal.css";
import useAlgeriaData from "../AlgeriaData/UseAlgeriaData";

const Modal = ({ productDetails, onClose, onBuyNow }) => {
  const userId = useParams();
  const [next, setNext] = useState(false);
  const [currentWilaya, setCurrentWilaya] = useState("");
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
  const handleWilayaChange = (e) => {
    setCurrentWilaya(e.target.value);
    setSelectedOptions({ ...selectedOptions, wilaya: e.target.value });
  };

  const handleCityChange = (e) => {
    setSelectedOptions({ ...selectedOptions, commune: e.target.value });
  };

  const handleBuyNowClick = () => {
    onBuyNow(selectedOptions);
    onClose();
  };

  return (
    <dialog open className="modal">
      <button className="close-btn" onClick={onClose}>
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
                <label htmlFor="wilaya" className="wilaya-label-modal">
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
                <label htmlFor="city" className="city-label-modal">
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
                <label htmlFor="address" className="address-label-modal">
                  address:
                </label>
                <input type="text" />
              </div>
              <div className="container-modal">
                <label htmlFor="phone" className="phone-label-modal">
                  phone number:
                </label>
                <input type="text" />
              </div>
              <button className="buy-now-btn" type="button" onClick={() => setNext(!next)}>
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
            <label htmlFor="material" className="material-label-modal">
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
            <label htmlFor="quantity" className="quantity-label-modal">
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
            <button className="buy-now-btn" onClick={handleInBuyNowClick}>
              Buy Now
            </button>
            <button className="buy-now-btn" type="button" onClick={() => setNext(!next)}>
              Back
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
