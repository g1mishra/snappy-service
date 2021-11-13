import { combineReducers } from 'redux';
import AuthReducer from './Auth';
import UserToggleButtonReducer from './UserToggleButtonReducer';

const allReducers = combineReducers({
  is_Auth: AuthReducer,
  is_workerSignup: UserToggleButtonReducer,
});
export default allReducers;
