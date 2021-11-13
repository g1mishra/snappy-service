import React, { useState, } from 'react'
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
//alert
import { useAlert } from 'react-alert'
//
import "./Profile.scss"
import WorkerProfile from './WorkerProfile';
import CustomerProfile from './CustomerProfile';

export default function Profile(props) {
    const dispatch = useDispatch();
    const { is_Auth } = useSelector(state => state)
    const {profileData,is_Logged,currentUser} = is_Auth
    const [editProfile,setEditProfile] = useState()
    const [ImageLoaded,setImageLoaded] = useState()

    const alert = useAlert()

    return (
        !is_Logged ? <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}
      /> :
      <div className="profile-background">
            {
                currentUser.user_type === "worker" ?
                <WorkerProfile stateFromProfile={{profileData,currentUser,editProfile,
                            setEditProfile,ImageLoaded,setImageLoaded,alert,
                            dispatch,is_Logged}} /> :
                <CustomerProfile  stateFromProfile={{profileData,currentUser,editProfile,
                    setEditProfile,ImageLoaded,setImageLoaded,alert,
                    dispatch,is_Logged}} />                            
            }
    </div>
    )
}
