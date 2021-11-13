import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap/';
import Alert from 'react-bootstrap/Alert';
import './Login.css';
import { getUser } from './LoginHelper';
export default function Login(props) {
  const dispatch = useDispatch();
  const { is_Auth } = useSelector((state) => state);
  const [isLoginError, setLoginError] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => getUser(data, dispatch, reset, setLoginError);
  return is_Auth['is_Logged'] === true ? (
    <Redirect to={props.location.state ? props.location.state.from.pathname : '/'} />
  ) : (
    <Container fluid className='p-0 login-container'>
      <div className='login-form-wrapper'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          {isLoginError ? (
            <Alert variant='danger' onClose={() => setLoginError(false)} dismissible>
              <Alert.Heading>Invalid username or password.</Alert.Heading>
            </Alert>
          ) : null}
          <input
            disabled={isLoginError}
            type='tel'
            placeholder='mobile number'
            name='username'
            ref={register({ required: 'Please provide mobile number' })}
          />
          {errors.username && <p>{errors.username.message}</p>}

          <input
            disabled={isLoginError}
            type='password'
            placeholder='password'
            name='password'
            ref={register({ required: 'Please Provide Password' })}
          />
          {errors.password && <p>{errors.password.message}</p>}

          <input type='submit' value='Login' />
          <h5 className='last-item'>Don't have an account</h5>
          <a className='last-item-signup' href='/join-as'>
            Signup Now
          </a>
        </form>
      </div>
    </Container>
  );
}
