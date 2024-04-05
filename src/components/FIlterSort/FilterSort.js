import React from 'react'
import FilterComponent from '../Filter/Filter'
import { FaFilter } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { useState, useEffect, useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
function FilterSort({sendData, products, toSort}) {
    const [searchResults, setSearchResults] = useState(toSort);
    const [clicked, setClicked] = useState(false);
    const [filter, setFilter] = useState(false);
    const [current, setCurrent] = useState('Relevancy');
    const sortRef = useRef(null);


    const handleClick = () => {
        setClicked(!clicked);
      };
    
      const handleFilterData = (data) => {
        sendData(data); 
        setSearchResults(data);
      };

      const handleFilterClick = () => {
        setFilter(!filter);
        if (filter === true) {
          document.body.style.overflow = 'auto';
        }
        else {
          document.body.style.overflow = 'hidden';
        }
      }

      const handleSorting = () => {
        if (current === 'Relevancy') {
          sendData([...searchResults]);
        }
        else if (current === 'Lowest Price') {
          const Lowest = [...searchResults];
          Lowest.sort((a, b) => a.price - b.price);
          sendData([...Lowest]);
        }
        else if (current === 'Highest Price') {
          const Highest = [...searchResults];
          Highest.sort((a, b) => b.price - a.price);
          sendData([...Highest]);
        }
      };
    
      useEffect(() => {
        handleSorting();
      }, [current]);


  return (
    <>
    <div className={`filter-slide ${filter ? 'visible' : ''}`}> 
          <button className="close-filter" onClick={handleFilterClick}>
            <IoMdClose />
          </button> 
          <FilterComponent sendData={handleFilterData} products={products} /> 
        </div>

    <div className="filter-area">
          <button className='filter-button' onClick={handleFilterClick}>
            <FaFilter /> All Filters
          </button>
          <ul className={`sort-button ${clicked ? 'active' : ''}`} ref={sortRef} onClick={handleClick}>
            <li>
              <div className='diff'> sort by : {current}<IoIosArrowDown /></div>
            </li>
            <ul className={`sort-options ${clicked ? 'visible' : ''}`}>
              <li onClick={() => { setCurrent('Relevancy'); }}>
                <div>Relevancy</div>
              </li>
              <li onClick={() => { setCurrent('Lowest Price'); }}>
                <div>Lowest Price</div>
              </li>
              <li onClick={() => { setCurrent('Highest Price'); }}>
                <div>Highest Price</div>
              </li>
            </ul>
          </ul>
        </div>
    
    </>
  )
}

export default FilterSort