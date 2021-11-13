import './page_css/Hire.scss';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

import FilterComp from './component/FilterComp';
import load1 from '../images/gif/loading-gear.gif';

import config from '../config/config';

export default function Hire(props) {
  const [Workers, setWorkers] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [filterRule, setFilterRule] = useState();
  const { is_Auth } = useSelector((state) => state);
  const { is_Logged } = is_Auth;
  let promiseArray = [];
  let FilteredWorkers = [];

  useEffect(() => {
    let isCancelled = false;
    const fetchData = () => {
      fetch(`${config.serverURL}/worker/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      })
        .then((response) => response.json())
        .then((data) => {
          data.map(({ id, phone, Worker_Profile }) =>
            Worker_Profile
              ? promiseArray.push({
                  id: id,
                  photo: Worker_Profile.photo,
                  phone: phone,
                  name: Worker_Profile.name,
                  is_available: Worker_Profile.is_available,
                  average_rating: Worker_Profile.get_rating.average_rating,
                  no_of_rating: Worker_Profile.get_rating.no_of_rating,
                  prof: Worker_Profile.prof,
                  state: Worker_Profile.state,
                  city: Worker_Profile.city,
                  hourly_rate: Worker_Profile.hourly_rate,
                  daily_rate: Worker_Profile.daily_rate,
                })
              : ''
          );
          if (!isCancelled) {
            setWorkers(promiseArray);
            setIsLoading(false);
          }
        })
        .catch((error) => console.log(error));
    };
    fetchData();
    //clean up function
    return () => {
      isCancelled = true;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const star = (val) => {
    let x = [];
    for (let i = 0; i < 5; i++) {
      if (i < val) {
        x.push(<p key={i} className='fas fa-star' />);
      } else {
        x.push(<p key={i} className='far fa-star' />);
      }
    }
    return x;
  };
  if (filterRule) {
    const { Proffesion, State, City, Rating } = filterRule;
    FilteredWorkers = Workers.filter((value) => {
      const { average_rating, prof, state, city } = value;
      return average_rating >= Rating && prof === Proffesion && state === State && City === city ? true : false;
    });
  } else {
    FilteredWorkers = Workers;
  }

  return !is_Logged ? (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location },
      }}
    />
  ) : (
    <div className='p-0 Hire-Container'>
      {IsLoading ? (
        <div className='spinner'>
          <img src={load1} height='100px' width='100px' alt='loading' />
          <div className='mt-3'>
            <Spinner animation='grow' variant='primary' />
            <Spinner animation='grow' variant='secondary' />
            <Spinner animation='grow' variant='success' />
          </div>
        </div>
      ) : (
        <Container className='p-0 pt-3 pb-3'>
          <FilterComp setFilterRule={setFilterRule} ProffesionValue={props.location.state ? props.location.state['Profession'] : ''} />
          <div className='Hire-Wrapper'>
            {FilteredWorkers.length > 0 ? (
              FilteredWorkers.map(
                ({ id, photo, phone, name, is_available, average_rating, no_of_rating, prof, state, city, hourly_rate, daily_rate }) => (
                  <div key={id} className='wrapper' style={{ opacity: is_available ? '1' : '0.9' }}>
                    <div className='profile'>
                      <img src={photo ? photo : require('../images/dafult.png')} className='thumbnail' alt='Profile' />
                      <div className='check'>
                        <i id='i' className={is_available ? 'fas fa-check' : 'fas fa-times'}></i>
                      </div>
                      <h3 className='name'>{name}</h3>
                      <p className='title'>{prof}</p>
                      <h3 className='phone'>{phone}</h3>
                      <p className='description'>
                        {city} , {state}
                      </p>
                      <div className='d-flex'>
                        <button type='button' className='btn'>
                          Hire Me
                        </button>
                      </div>
                    </div>
                    <div className='social-icons'>
                      <div className='icon'>
                        <i id='i' className='fas fa-rupee-sign'></i>
                        <h4> {daily_rate} </h4>
                        <p>Daily rate</p>
                      </div>
                      <div className='icon'>
                        <i id='i' className='fas fa-star'></i>
                        <h4>{star(average_rating)}</h4>
                        <p>
                          By {no_of_rating} <i className='fas fa-user-friends' />
                        </p>
                      </div>
                      <div className='icon'>
                        <i id='i' className='fas fa-rupee-sign'></i>
                        <h4> {hourly_rate} </h4>
                        <p>Hourly rate</p>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className='data-not-found'>
                <h1>Data is not found</h1>
                <p>Find something else</p>
              </div>
            )}
          </div>
        </Container>
      )}
    </div>
  );
}
