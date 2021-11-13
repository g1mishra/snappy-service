import {login,getProfile} from "../../../redux-src/actions"
import config from '../../../config/config';

export const getUser = (data,dispatch,reset,setLoginError) =>{
    fetch(`${config.serverURL}/user/login/`,
    {
        method: 'POST',
        headers:{"Content-Type":"application/json; charset=UTF-8"},
        body: JSON.stringify({
            "username": data.username,
            "password": data.password
            })
      })
    .then(response => response.json())
    .then(data => data["token"] ?
                dispatch(login(data)) &&
                getProfileOfCurrentUser(data,dispatch) &&
                reset() : setLoginError(true)
    )
    .catch( errors => console.log(errors))
}

const getProfileOfCurrentUser = (currentUser,dispatch) =>{
    const {user_type,phone,token} = currentUser
    fetch(`${config.serverURL}/${user_type}/${phone}/`,
        {
            method: 'GET',
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
                'Authorization': `Token ${token}`
            },
        })
    .then(response => response.json())
    .then(data => dispatch(getProfile(data)))
    
}