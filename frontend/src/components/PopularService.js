import React from 'react';
import Title from './Title';
// import {} from 'react-bootstrap'
import Swiper from 'react-id-swiper';
import 'swiper/swiper.min.css';
import { Container } from 'react-bootstrap';

import img1 from '../images/category/cat1.jpg';
import img2 from '../images/category/cat2.jpg';
import img3 from '../images/category/cat3.jpg';
import img4 from '../images/category/cat4.jpg';
import img5 from '../images/category/cat5.jpg';
import img6 from '../images/category/cat6.jpg';
import { Link } from 'react-router-dom';

export default function TrendingService() {
  var cradValue = [
    {
      id: 1,
      img: img1,
      name: 'Plumbers',
    },
    {
      id: 2,
      img: img2,
      name: 'Carpenters',
    },
    {
      id: 3,
      img: img5,
      name: 'General Labours',
    },
    {
      id: 4,
      img: img6,
      name: 'House Cleaning',
    },
    {
      id: 5,
      img: img4,
      name: 'Painters',
    },
    {
      id: 6,
      img: img3,
      name: 'Electricians',
    },
  ];
  var swiper = {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };
  return (
    <Container fluid className='p-0' style={{ background: '#fff', overflow: 'hidden' }}>
      <section className='swiper-container text-center'>
        <Title title='Our Popular Service' underline='10em' />
        <div className='contain'>
          <Swiper {...swiper}>
            {cradValue.map((item) => (
              <div className='swiper-slide' key={item.id} style={{ backgroundImage: `url(${item.img})` }}>
                <p>{item.name}</p>
                <div className='shade'></div>
              </div>
            ))}
          </Swiper>
        </div>
        <Link to='/service'>
          <p className='btn-primaryStyle1'> More Services </p>
        </Link>
      </section>
    </Container>
  );
}
