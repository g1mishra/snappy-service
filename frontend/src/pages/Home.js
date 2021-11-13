import React, { } from 'react'
import HeroSlider from "../components/Slider/HeroSlider"
import HowToUse from '../components/HowToUse'
import PopularService from '../components/PopularService'
import AboutSnappy from '../components/AboutSnappy'

export default function Home() {
  return (
    <div className="Home">
      <HeroSlider />
      <HowToUse/>
      <PopularService/>
      <AboutSnappy/>
    </div>  
  )
}
