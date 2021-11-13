export const login = (userData) => {
    return {
        type : "SIGN_IN",
        value : userData
    }
}
export const getProfile = (profileData) => {
    return {
        type : "GET_PROFILE",        
        value : profileData
    }
}

export const logout = () => {
    return {
        type : "SIGN_OUT"
    }
}

export const workerSignup = () =>{
    return {
        type : "WORKER_SIGNUP"
    }
}
export const customerSignup = () =>{
    return {
        type : "CUSTOMER_SIGNUP"
    }
}
