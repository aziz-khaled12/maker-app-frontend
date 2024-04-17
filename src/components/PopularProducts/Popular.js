import React from 'react'
import CardGrid from '../CardGrid/CardGrid'
import './Popular.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Popular = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://maker-app-backend.vercel.app/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="popular-wrapper">
        <div className='popular-container'>
          <div className='top'>
            <h2>Popular products:</h2>
          </div>
          <CardGrid products={products} />
        </div>

        <Link className='see-more-btn'>See more</Link>
      </div>
    </>
  )
}

export default Popular