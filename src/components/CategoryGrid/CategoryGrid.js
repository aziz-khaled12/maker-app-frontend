import React, { useEffect, useState } from 'react';
import MyCard2 from '../MyCard2/Card';
import './CategoryGrid.css';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

const CategoryGrid = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://maker-app-backend.vercel.app/products/categories/${category}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="grid-container-1">
      {products.map((product) => (
        <MyCard2 key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CategoryGrid;
