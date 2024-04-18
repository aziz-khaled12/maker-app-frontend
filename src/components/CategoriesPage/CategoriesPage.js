import React from 'react'
import CategoryGrid from '../CategoryGrid/CategoryGrid'
import './CategoriesPage.css'
import { useParams } from 'react-router-dom'

const CategoriesPage = () => {
    const { category } = useParams(); 
    return (
        <>
        <div className="huge-container">
            
                <div className='product-category-wrapper'>
                    <header> <h1>{category}</h1> </header>
                    <div className='top'>
                        <h2>Popular products:</h2>
                    </div>
                    <CategoryGrid />
                </div>
        </div>
        </>
    )
}

export default CategoriesPage