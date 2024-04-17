import React, { useState, useEffect } from 'react';
import Vendor from '../vendor/vendor';
import './VendorGrid.css';
import axios from 'axios';

const VendorGrid = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://maker-app-backend.vercel.app/sellers');
        setSellers(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid-container-2">
      {/* Check if sellers array is not empty before mapping */}
      {sellers.length > 0 && sellers.slice(0, 7).map(seller => (
        <Vendor key={seller._id} seller={seller} />
      ))}
    </div>
  );
};

export default VendorGrid;
