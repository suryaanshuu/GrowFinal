import React from 'react'
import animationGif from '../../public/Animation.gif'
import plantInHands from '../../public/Plant2.png'

const MarketingBox = () => {
  return (
    <div>
        <div className='antialiased font-sans flex justify-between'>

        <div>
          <div className='font-bold text-5xl ml-9 mt-9 mr-11'>
            Delivering {<span style={{color: '#659e38'}}>Plants,</span>} <br></br>
            Delivering {<span style={{ color: '#659e38' }}>Happiness!</span>}<br></br>
          </div>
          
          <div className='mt-4 ml-9 font-medium'>
            Know about your favourite plants and their favourable factor, Veggies, <br></br>
            Citrus, Fruits, Herbs and more...
          </div>

          <img src={animationGif} alt='Animation'></img>
        </div>
        
        <img src={plantInHands} alt='Plant Image with Hand'></img>

      </div> 
      <br></br>
      
      
    </div>
  )
}

export default MarketingBox