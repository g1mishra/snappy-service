import React from 'react';
import './css/RegisterForm.css';
import { Link } from 'react-router-dom';
import img from '../../../images/logo_white.png';

import { useSelector, useDispatch } from 'react-redux';
import { workerSignup, customerSignup } from '../../../redux-src/actions';

import { Button, ButtonGroup } from 'semantic-ui-react';
import { SignupCustomer, SignupWorker } from './Signup';

export default function RegisterForm() {
  const { is_workerSignup } = useSelector((state) => state);

  const dispatch = useDispatch();
  return (
    <div className='register-form'>
      <div className='register-left-right'>
        <div className='register-left'>
          <img src={img} alt='' />
          <h3>Welcome</h3>
          <p>You are 30 seconds away from earning your own money!</p>
          <Link to='/login'>
            <button style={{ color: 'blue' }}> Login </button>
          </Link>
        </div>
        <div className='register-right'>
          <div className='toggle-bar'>
            <h3 className='register-heading'>{is_workerSignup ? 'Join as worker' : 'Join as customer'}</h3>
            <ButtonGroup className='toggle-register'>
              <Button className={is_workerSignup ? 'active' : ''} onClick={() => dispatch(workerSignup())}>
                Worker
              </Button>
              <Button className={is_workerSignup ? '' : 'active'} onClick={() => dispatch(customerSignup())}>
                Customer
              </Button>
            </ButtonGroup>
          </div>
          {is_workerSignup ? <SignupWorker /> : <SignupCustomer />}
        </div>
      </div>
    </div>
  );
}
