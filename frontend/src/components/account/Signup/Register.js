import React from 'react';
import { Button } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import Title from '../../Title';
import './css/Register.css';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { workerSignup, customerSignup } from '../../../redux-src/actions';

export default function Register() {
  const { isLogged } = useSelector((state) => state);
  const dispatch = useDispatch();

  return isLogged ? (
    <Redirect to='/' />
  ) : (
    <div className='all-register'>
      <Title title='Join Now For Free' underline='10rem' />
      <Container className='register_container text-center p-0'>
        <div className='container_1'>
          <h1 className='register_title'>Join as Pro</h1>
          <p>
            Are you a skilled, spiritfull, passionate guy looking for an oppurtunity to show your masterpiece ? You're at the right place. Choose your
            schedule time, Get money according to your skill.
          </p>
          <Button as={Link} to='/signup' onClick={() => dispatch(workerSignup())}>
            Join Now{' '}
          </Button>
        </div>
        <div className='or'>
          <p>Or</p>
        </div>
        <div className='container_2'>
          <h1 className='register_title'>Join as Customer</h1>
          <p>
            Snappy provides you with on-demand access to the very best home service professionals in your area. With Snappy, say goodbye to unreliable
            technicians. No more headaches to get your job done.
          </p>
          <Button as={Link} to='/signup' onClick={() => dispatch(customerSignup())}>
            Join Now{' '}
          </Button>
        </div>
      </Container>
    </div>
  );
}
