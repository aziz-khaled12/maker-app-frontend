import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import 'react-slideshow-image/dist/styles.css'
import './ProductSlider.css'
const spanStyle = {
  padding: '20px',
  background: '#efefef',
  color: '#000000'
}

const array = [1, 2, 3, 4]

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '400px',
  width: '100%',
}


const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide>
         {array.map((slideImage, index)=> (
            <div key={index}>
              <div style={divStyle}>
                <span style={spanStyle}>{index}</span>
              </div>
            </div>
          ))} 
        </Slide>
      </div>
    )
}

export default  Slideshow;