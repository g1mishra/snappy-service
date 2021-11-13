import React, { useState, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import config from '../../../config/config';
import './css/Signup.css';

export function SignupCustomer() {
  const [isRegisteredUser, setRregisteredUser] = useState();
  const { register, handleSubmit, reset, errors, watch, setError } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    fetch(`${config.serverURL}/register/customer/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        phone: data.Mobilenumber,
        password: data.Password,
        Customer_Profile: {
          name: data.Fullname,
          state: data.State,
          city: data.City,
        },
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData) {
          if (responseData.error) {
            setError('Mobilenumber', 'Mobilenumber', 'Phone number already used');
          } else {
            setRregisteredUser(responseData);
            reset();
          }
        }
      })
      .catch((errors) => console.log(errors));
  };
  return (
    <Fragment>
      {isRegisteredUser ? (
        <Redirect
          to={{
            pathname: 'registered/',
            state: { RegisteredUser: isRegisteredUser },
          }}
        />
      ) : (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <input type='text' placeholder='Full name' name='Fullname' ref={register({ required: true, minLength: 3, maxLength: 180 })} />
          {errors.Fullname && <p>name can't be blank or lass than 3 char</p>}

          <input
            type='tel'
            placeholder='Mobile number'
            name='Mobilenumber'
            ref={register({
              required: 'Mobile Should be there',
              maxLength: { value: 10, message: 'Mobile number should be valid' },
              pattern: { value: /^[6789][0-9]{9}$/, message: 'Mobile number should be valid' },
            })}
          />
          {errors.Mobilenumber && <p>{errors.Mobilenumber.message}</p>}

          <input
            type='password'
            placeholder='Password'
            name='Password'
            ref={register({ required: 'Password is must', minLength: { value: 8, message: 'Too Short at least 8 char' } })}
          />
          {errors.Password && <p>{errors.Password.message}</p>}

          <input
            type='text'
            placeholder='Re_enter password'
            name='Re_enterpassword'
            ref={register({ required: 'Password is must', validate: (value) => value === watch('Password') || "Passwords don't match." })}
          />
          {errors.Re_enterpassword && <p>{errors.Re_enterpassword.message}</p>}

          <label>
            State{' '}
            <select name='State' placeholder='State' ref={register({ required: true })}>
              <option value='Punjab'>Punjab</option>
            </select>
          </label>
          {errors.State && <p>State is required</p>}
          <label>
            {' '}
            City
            <select name='City' placeholder='City' ref={register({ required: true })}>
              <option value='Jalandhar'>Jalandhar</option>
            </select>
          </label>
          <input type='submit' id='form-submit' value='Signup' />
        </form>
      )}
    </Fragment>
  );
}

// Worker signup

export function SignupWorker() {
  const [isRegisteredUser, setRregisteredUser] = useState();
  const { register, handleSubmit, reset, errors, setError, watch } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) =>
    fetch(`${config.serverURL}/register/worker/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        phone: data.Mobilenumber,
        password: data.Password,
        Worker_Profile: {
          name: data.Fullname,
          state: data.State,
          city: data.City,
          prof: data.Proffesion,
          is_available: true,
          hourly_rate: data.hourlyCharge,
          daily_rate: data.dailyCharge,
        },
      }),
    })
      .then((response) => response.json())

      .then((responseData) => {
        if (responseData.error) {
          setError('Mobilenumber', 'Mobilenumber', 'Phone number already used');
        } else {
          if (responseData) {
            setRregisteredUser(responseData);
            reset();
          }
        }
      })
      .catch((errors) => console.log(errors));

  return (
    <Fragment>
      {isRegisteredUser ? (
        <Redirect
          to={{
            pathname: 'registered/',
            state: { RegisteredUser: isRegisteredUser },
          }}
        />
      ) : (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <input type='text' placeholder='Full name' name='Fullname' ref={register({ required: true, minLength: 3, maxLength: 180 })} />
          {errors.Fullname && <p>Fullname can't be blank</p>}

          <input
            type='tel'
            placeholder='Mobile number'
            name='Mobilenumber'
            ref={register({
              required: 'Mobile Should be there',
              maxLength: { value: 10, message: 'Mobile number should be valid' },
              pattern: { value: /^[6789][0-9]{9}$/, message: 'Mobile number should be valid' },
            })}
          />
          {errors.Mobilenumber && <p>{errors.Mobilenumber.message}</p>}

          <input
            type='password'
            placeholder='Password'
            name='Password'
            ref={register({ required: 'Password is must', minLength: { value: 8, message: 'Too Short at least 8 char' } })}
          />
          {errors.Password && <p>{errors.Password.message}</p>}
          <input
            type='text'
            placeholder='Re_enter password'
            name='Re_enterpassword'
            ref={register({ required: 'Password is must', validate: (value) => value === watch('Password') || "Passwords don't match." })}
          />
          {errors.Re_enterpassword && <p>{errors.Re_enterpassword.message}</p>}
          <label>
            Proffesion{' '}
            <select name='Proffesion' ref={register({ required: true })}>
              <option></option>
              <option value='Electrician'>Electrician</option>
              <option value='Plumber'>Plumber</option>
              <option value='Labour'>Labour</option>
            </select>
          </label>

          <label>
            State{' '}
            <select name='State' placeholder='State' ref={register({ required: true })}>
              <option></option>

              <option value='Punjab'>Punjab</option>
            </select>
          </label>
          {errors.State && <p>State is required</p>}
          <label>
            {' '}
            City
            <select name='City' placeholder='City' ref={register({ required: true })}>
              <option></option>

              <option value='Jalandhar'>Jalandhar</option>
            </select>
          </label>
          <label>
            D.O.B
            <input type='date' placeholder='D.O.B' name='DOB' ref={register({ required: false })} />
          </label>
          <div className='d-flex justify-content-between'>
            <input style={{ width: '49%' }} type='number' placeholder='Hourly Charge' name='hourlyCharge' ref={register({ required: true })} />
            <input style={{ width: '49%' }} type='number' placeholder='Daily Charge' name='dailyCharge' ref={register({ required: true })} />
          </div>
          <input type='submit' id='form-submit' value='Signup' />
        </form>
      )}
    </Fragment>
  );
}
