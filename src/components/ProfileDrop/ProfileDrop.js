import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDrop.css';
import { CgProfile } from "react-icons/cg";
import { RiShoppingBagFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";


function ProfileDrop() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
  const userRole = decodedToken ? decodedToken.role : null;

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <>
      <div className="profile-dropdown" onClick={handleClick} ref={dropdownRef}>
        <div className="lil-profile"> </div>
        {isOpen && (
          <ul className="profile-list">
            <div className="cube"></div>
            {decodedToken && (
              <>
                <li>{decodedToken.name}</li> {/* Assuming 'name' is present in your decoded token */}
                <Link to={`/Profile/${decodedToken.userId}`}><li> Profile<CgProfile /></li></Link>
                {userRole === 'seller' &&
                  <>
                    <Link to={'/profile/:userId/OrderList'}><li> Orders<RiShoppingBagFill /></li></Link>
                    <Link to={'/profile/:userId/Dashboard'}><li> Dashboard<RiShoppingBagFill /></li></Link>
                    <Link to={'/AddProduct'}><li> Add product<RiShoppingBagFill /></li></Link>
                  </>
                }
              </>
            )}
            <Link to={'/login'}><li onClick={handleLogout}>  Logout<RiLogoutBoxRLine /></li></Link>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileDrop;
