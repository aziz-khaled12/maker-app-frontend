import React from 'react'
import { FaHeart } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import './Collections.css'
const Collections = () => {
    return (
        <>
            <div className='collections-wrapper'>
                <h2>Collections:</h2>
                <div className='collections-container'>
                    <div className='top-container'>
                        <div className='vendor-top'>
                            <div className='vendor-container'>
                                <div className='vendor-image-container'>
                                    <div className='vendor-image'></div>
                                    <div className='check-circle'><FaCheck /></div>
                                </div>
                                <div className='text-vendor'>                                   
                                <h3>Collection Title</h3>
                                <h4>Vendor name</h4>
                                </div>
                            </div>
                        </div>
                        <div className='cont-like'>
                            <FaHeart />
                        </div>
                    </div>


                    <div className='collections-grid-container'>
                        <div className='product-1'></div>
                        <div className='product-2'></div>
                        <div className='product-3'></div>
                        <div className='product-4'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Collections