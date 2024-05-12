import './DropList.css'

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const DropList = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Link to={`/products/categories/${title}`}><div className="title"> {title} </div></Link>
       
          {isOpen && (
          <ul className="list" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {items.map((item, index) => (
              <Link to={`/products/categories/${item}`} key={index}><li >  {item}  </li></Link>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropList;
