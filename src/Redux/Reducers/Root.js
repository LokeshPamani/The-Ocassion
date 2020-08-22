import { combineReducers } from 'redux';
import errors from './errors/errors';
import session from './session/session';
//import BookingCalenderReducer from '../../BookingCalRedux/BookingCalender/BookingCalenderReducer'
import bookingsReducer from '../Reducers/BookingReducer'
export default combineReducers({
    session,
    errors,
   bookingsReducer
  });