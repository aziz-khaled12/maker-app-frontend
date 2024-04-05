import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SearchResults.css';
import CardGrid from '../CardGrid/CardGrid';
import FilterComponent from '../Filter/Filter';
import { FaFilter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { useRef } from 'react';
import { IoMdClose } from "react-icons/io";

const SearchResults = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [originalResults, setOriginalResults] = useState([])
  const [clicked, setClicked] = useState(false);
  const [filter, setFilter] = useState(false);
  const [display, setDisplay] = useState([]);
  const [current, setCurrent] = useState('Relevancy');
  const sortRef = useRef(null);


  const handleClick = () => {
    setClicked(!clicked);
  };

  const handleFilterData = (data) => {
    setDisplay(data); 
    setSearchResults(data);
  };

  const handleOutsideClick = (event) => {
    if (sortRef.current && !sortRef.current.contains(event.target)) {
      setClicked(false);
    }
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
      setDisplay([...searchResults]);
    }
    else if (current === 'Lowest Price') {
      const Lowest = [...searchResults];
      Lowest.sort((a, b) => a.price - b.price);
      setDisplay([...Lowest]);
    }
    else if (current === 'Highest Price') {
      const Highest = [...searchResults];
      Highest.sort((a, b) => b.price - a.price);
      setDisplay([...Highest]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/search/searched?keyword=${query}`);
        setSearchResults(response.data);
        setDisplay(response.data);
        setOriginalResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };
    fetchData();
  }, [query]);

  useEffect(() => {
    handleSorting();
  }, [query, current]);

  return (
    <>
      <div className="search-results">
        <div className={`filter-slide ${filter ? 'visible' : ''}`}> 
          <button className="close-filter" onClick={handleFilterClick}>
            <IoMdClose />
          </button> 
          <FilterComponent sendData={handleFilterData} products={originalResults} /> 
        </div>
        <h2>Search Results for "{query}"</h2>
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
        <div className="search-results-container">
          <CardGrid products={display} />
        </div>
      </div>
    </>
  );
};

export default SearchResults;
