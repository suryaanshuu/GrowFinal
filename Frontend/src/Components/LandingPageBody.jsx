import React from 'react'
import MarketingBox from './MarketingBox'
import InfoBox from './InfoBox'
import PlantInfo from './PlantInfo'
import plantData from './PlantInfo'

const LandingPageBody = () => {

  // const plantData = PlantInfo();

  return (
    <div>
      <MarketingBox />      
      
      <InfoBox data = {PlantInfo} />
    </div>
  )
}

export default LandingPageBody