import React from 'react';
import { FaCheck } from "react-icons/fa6";
import './vendor.css';
import { Link } from 'react-router-dom';

const Vendor = ({ seller }) => {
    return (
        <div className='vendor-container'>
            <Link to={`/sellers/${seller._id}`}>
                <div className='vendor-image-container'>
                    <div className='vendor-image'></div>
                    <div className='check-circle'><FaCheck /></div>
                </div>
            </Link>
            <h3>{seller.username}</h3>
        </div>
    );
};

export default React.memo(Vendor);
