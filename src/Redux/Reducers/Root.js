import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
//import BookingCalenderReducer from '../../BookingCalRedux/BookingCalender/BookingCalenderReducer'
import bookingsReducer from '../Reducers/BookingReducer'
import usersReducer from '../Reducers/UsersReducer'
export default combineReducers({
    session,
    errors,
   bookingsReducer,
   usersReducer
  });