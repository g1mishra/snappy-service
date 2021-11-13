import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import config from '../../../config/config';
import { logout } from '../../../redux-src/actions';
import { getProfile } from '../../../redux-src/actions';

import { objectToFormData } from 'object-to-formdata';
import Container from 'react-bootstrap/Container';

export default function WorkerProfile(props) {
  const { profileData, currentUser, editProfile, setEditProfile, ImageLoaded, setImageLoaded, alert, dispatch, is_Logged } = props.stateFromProfile;
  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    const uploadData = {
      phone: data.phone,
      email: data.email,
      'Worker_Profile.name': data.name,
      'Worker_Profile.state': data.state,
      'Worker_Profile.city': data.city,
      'Worker_Profile.address': data.address,
      'Worker_Profile.prof': data.prof,
      'Worker_Profile.is_available': data.is_available,
      'Worker_Profile.hourly_rate': data.hourly_rate,
      'Worker_Profile.daily_rate': data.daily_rate,
      'Worker_Profile.dob': data.dob,
    };
    const { user_type, phone, token } = currentUser;
    if (phone === uploadData['phone']) {
      delete uploadData['phone'];
    }
    if (data.Image[0]) {
      Object.assign(uploadData, { 'Worker_Profile.photo': data.Image[0] });
      // const imagePreview = URL.creatObjectURL(data.Image[0])
      // setImageLoaded(imagePreview);
    }
    const formData = objectToFormData(uploadData);

    fetch(`${config.serverURL}/${user_type}/${phone}/`, {
      body: formData,
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          dispatch(logout());
        } else {
          console.log(data);
          if (data.phone && data.phone[0].search('phone already') > -1) {
            console.log('error occur');
          } else if (data.Worker_Profile.photo && data.Worker_Profile.photo[0].search('Upload a valid image.') > -1) {
            alert.show('Please, Choose an Image to upload...', {
              timeout: 10000, // custom timeout just for this one alert
              type: 'error',

              onClose: () => {
                setImageLoaded();
              }, // callback that will be executed after this alert is removed
            });
          } else {
            dispatch(getProfile(data));
            setEditProfile(false);
            alert.show('Succesfull, Your Profile Updated.', {
              timeout: 10000, // custom timeout just for this one alert
              type: 'success',
            });
          }
        }
      });
  };

  useEffect(() => {
    if (is_Logged) {
      const { user_type, phone, token } = currentUser;
      fetch(`${config.serverURL}/${user_type}/${phone}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Token ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => dispatch(getProfile(data)));
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Container className='profile'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <div className='profile-head'>
          <div className='profile-head-info'>
            <div id='caption'>
              <span className='text'>
                <h1>Change Image</h1>
              </span>
              <img
                className='profile-img'
                onClick={() => document.getElementById('my_file').click()}
                src={ImageLoaded || profileData.Worker_Profile.photo}
                alt=''
              />
            </div>

            <h2>{profileData.Worker_Profile.name}</h2>
            <h6>{profileData.Worker_Profile.prof}</h6>
            <div className='profile-logout'>
              <input type='button' onClick={() => dispatch(logout())} className='btn btn-dark' value='Logout' />
              <input
                type='button'
                onClick={() => setEditProfile(true)}
                style={{ display: editProfile ? 'none' : '' }}
                className='btn btn-dark'
                value='Edit profile'
              />
              <input type='submit' style={{ display: !editProfile ? 'none' : '' }} className='btn btn-dark' value='Update' />
            </div>
          </div>
        </div>
        <div className='profile-body'>
          <div>
            <label>Name</label>
            <h5>:</h5>
            <input
              type='text'
              placeholder='Full name'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.Worker_Profile.name}
              name='name'
              ref={register({ required: true, minLength: 3, maxLength: 180 })}
            />
            {errors.name && <p className='error'>Fullname can't be blank</p>}
          </div>

          <div>
            <label>Phone</label>
            <h5>:</h5>
            <input
              type='tel'
              placeholder='Mobile number'
              name='phone'
              defaultValue={profileData.phone}
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              ref={register({
                required: 'Mobile Should be there',
                maxLength: { value: 10, message: 'Mobile number should be valid' },
                pattern: { value: /^[6789][0-9]{9}$/, message: 'Mobile number should be valid' },
              })}
            />
            {errors.phone && <p className='error'>{errors.phone.message}</p>}
          </div>

          <div>
            <label>Email</label>
            <h5>:</h5>
            <input
              type='text'
              placeholder='null'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.email}
              name='email'
              ref={register({ required: false })}
            />
            {errors.email && <p className='error'>Email can't be blank</p>}
          </div>
          {/* Image loader */}
          <input
            type='file'
            id='my_file'
            style={{ display: 'none' }}
            disabled={!editProfile ? true : false}
            name='Image'
            ref={register({ required: false })}
          />

          <div>
            <label>D.O.B</label>
            <h5>:</h5>
            <input
              type='date'
              placeholder='dob'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.Worker_Profile.dob}
              name='dob'
              ref={register({ required: true })}
            />
          </div>
          <div>
            <label>Profession</label>
            <h5>:</h5>
            <select
              name='prof'
              ref={register({ required: true })}
              defaultValue={profileData.Worker_Profile.prof}
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
            >
              <option value='Electrician'>Electrician</option>
              <option value='Plumber'>Plumber</option>
              <option value='Labour'>Labour</option>
            </select>
          </div>
          <div>
            <label>State</label>
            <h5>:</h5>
            <select
              name='state'
              ref={register({ required: true })}
              defaultValue={profileData.Worker_Profile.state}
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
            >
              <option value='Punjab'>Punjab</option>
            </select>
          </div>

          <div>
            <label>City</label>
            <h5>:</h5>
            <select
              name='city'
              ref={register({ required: true })}
              defaultValue={profileData.Worker_Profile.city}
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
            >
              <option value='Jalandhar'>Jalandhar</option>
            </select>
          </div>

          <div>
            <label>Address</label>
            <h5>:</h5>
            <input
              type='text'
              placeholder='null'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.Worker_Profile.address}
              name='address'
              ref={register({ required: false })}
            />
          </div>

          <div>
            <label>Hourly Rate</label>
            <h5>:</h5>
            <input
              type='int'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.Worker_Profile.hourly_rate}
              name='hourly_rate'
              ref={register({ required: true })}
            />
            {errors.hourly_rate && <p className='error'>hourly rate can't be null</p>}
          </div>
          <div>
            <label>Daily Rate</label>
            <h5>:</h5>
            <input
              type='int'
              className={!editProfile ? 'disable' : ''}
              disabled={!editProfile ? true : false}
              defaultValue={profileData.Worker_Profile.daily_rate}
              name='daily_rate'
              ref={register({ required: true })}
            />
            {errors.daily_rate && <p className='error'>daily rate can't be blank</p>}
          </div>

          <div>
            <label>Availability</label>
            <h5>:</h5>
            <input
              type='checkbox'
              className={!editProfile ? 'disable' : ''}
              style={{ display: editProfile ? '' : 'none' }}
              disabled={!editProfile ? true : false}
              defaultChecked={profileData.Worker_Profile.is_available}
              name='is_available'
              ref={register({ required: false })}
            />
            <p style={{ display: !editProfile ? '' : 'none', marginLeft: '40px' }}>{profileData.Worker_Profile.is_available ? 'Yes' : 'No'}</p>
          </div>

          <div>
            <label>Rating</label>
            <h5>:</h5>
            <p className='input-type'>{`${
              profileData.Worker_Profile.get_rating.average_rating / profileData.Worker_Profile.get_rating.no_of_rating || 0
            }/5`}</p>
          </div>
        </div>
      </form>
    </Container>
  );
}
