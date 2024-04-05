import React from 'react'
import CategoryGrid from '../CategoryGrid/CategoryGrid'
import ButtonLink from '../Button/button'
import './CategoriesPage.css'
import CategorieList from '../CategotyLIst/CategorieList'
import { useParams } from 'react-router-dom'
import Collections from '../Collections/Collections'

const CategoriesPage = () => {
    const { category } = useParams(); 
    return (
        <>
        <CategorieList></CategorieList>   
        <div className="huge-container">
            
                <div className='product-category-wrapper'>
                    <header> <h1>{category}</h1> </header>
                    <div className='top'>
                        <h2>Popular products:</h2>
                        <ButtonLink className='hover-underline-animation'>Explore more</ButtonLink>
                    </div>
                    <CategoryGrid />
                </div>
        </div>
        </>
    )
}

export default CategoriesPage