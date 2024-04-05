import React, { useEffect, useState } from 'react';
import MyCard2 from '../MyCard2/Card';
import './CardGrid.css';

const CardGrid = ({products}) => {

  return (
    <div className="grid-container-1">
      {products.map((product) => (
        <MyCard2 key={product._id} product={product} />
      ))}
    </div>
  );
};

export default CardGrid;
