import Hero from "../Hero/Hero"
import Banner from "../Hero/Banner"
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import Carousel from "react-bootstrap/Carousel"
export default function Slider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval="3000" pauseOnHover={false}>
      <Carousel.Item>
            <Hero hero="labourHero">
                <Banner title="Snappy A Serivce Provider" subtitle="Need a labour or pro? Just do snappy.">
                    <Link to="/pro/labour" className="btn-primaryStyle">Learn more</Link>
                </Banner>
            </Hero>
      </Carousel.Item>
      <Carousel.Item>
            <Hero hero="painterHero">
                <Banner title="We got you Hooked" subtitle="Need a Painter,Plumber or Any Other Guy?">
                    <Link to="/pro/labour" className="btn-primaryStyle">Check It Out</Link>
                </Banner>
            </Hero>
      </Carousel.Item>
      <Carousel.Item>
           <Hero>
                <Banner title="Your worker is here" subtitle="Just search for your Home Service.">
                    <Link to="/" className="btn-primaryStyle">search</Link>
                </Banner>
            </Hero>
      </Carousel.Item>
      <Carousel.Item>
            <Hero hero="servicesHero">
                <Banner title="Want to earn money?" subtitle="Join Us As Our Pro,Labour or Any Guy.">
                    <Link to="/pro/labour" className="btn-primaryStyle">Register</Link>
                </Banner>
            </Hero>
      </Carousel.Item>
      <Carousel.Item>
            <Hero hero="customerHero">
                <Banner title="Get A job to do" subtitle="Don't Worry We'll Do It For You.">
                    <Link to="/customer" className="btn-primaryStyle">Sign Up</Link>
                </Banner>
            </Hero>
      </Carousel.Item>
    </Carousel>
  );
}