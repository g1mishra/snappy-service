const initialState = {
  profileData: null,
  currentUser: null,
  is_Logged: false,
};
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, currentUser: action.value };
    case 'SIGN_OUT':
      return { ...state, currentUser: null, is_Logged: false, profileData: null };
    case 'GET_PROFILE':
      return { ...state, profileData: action.value, is_Logged: true };
    default:
      return state;
  }
};
export default AuthReducer;
