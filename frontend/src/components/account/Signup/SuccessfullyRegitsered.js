import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import './css/SuccessfullyRegistered.css';

export default function SuccessfullyRegitsered(props) {
  const name = props.location.state.RegisteredUser.name.split(' ')[0];
  return props.location.state ? (
    <div className='success-register-bg'>
      <div className='success-register-container'>
        <div className='success-register'>
          <h1>Welcome {name} </h1>
          <p>You have been successfully registered.</p>
          <Link to='/login'>
            <button className='btn btn-outline-secondary'>Login</button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to='/' />
  );
}
