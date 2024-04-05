import React from 'react'
import VendorGrid from '../VendorGrid/VendorGrid'
import './TopVendors.css'
import { Link } from 'react-router-dom'
const TopVendors = () => {
    return (
        <>
            <div className='seller-wrapper'>
                <div className='seller-container'>
                    <div className='top'>
                        <h2>Top Vendors:</h2>
                    </div>
                    <VendorGrid numberOfVendors={7} />
                </div>
            </div>
        </>
    )
}

export default TopVendors