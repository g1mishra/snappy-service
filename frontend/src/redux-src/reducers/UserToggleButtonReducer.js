const UserToggleButtonReducer = (state = false, action) => {
  switch (action.type) {
    case 'WORKER_SIGNUP':
      state = true;
      return state;
    case 'CUSTOMER_SIGNUP':
      state = false;
      return state;
    default:
      return state;
  }
};
export default UserToggleButtonReducer;
